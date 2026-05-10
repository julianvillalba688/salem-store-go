import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import sharp from 'sharp';

const DATA_PATH = path.join(process.cwd(), 'public', 'data', 'products.json');
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'catalogo-salem-store.pdf');
const CACHE_DIR = path.join(process.cwd(), '.cache', 'images');

// Boutique Colors
const COLORS = {
  bg: '#ffffff',
  text: '#1a1a1a',
  accent: '#d4af37', // Gold
  softPink: '#f8e1e7',
  gray: '#666666',
  sale: '#e63946'
};

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function downloadImage(url, sku) {
  const ext = path.extname(url.split('?')[0]) || '.jpg';
  const localPath = path.join(CACHE_DIR, `${sku}${ext}`);
  
  if (fs.existsSync(localPath)) return localPath;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Download failed');
    const buffer = Buffer.from(await res.arrayBuffer());
    
    // Optimize with sharp
    const optimizedBuffer = await sharp(buffer)
      .resize(400, 400, { fit: 'inside' })
      .jpeg({ quality: 80 })
      .toBuffer();
      
    fs.writeFileSync(localPath, optimizedBuffer);
    return localPath;
  } catch (e) {
    console.error(`Error downloading ${sku}: ${e.message}`);
    return null;
  }
}

async function generateCatalog() {
  console.log('Iniciando generación de catálogo...');
  await ensureDir(CACHE_DIR);

  const rawData = fs.readFileSync(DATA_PATH, 'utf-8');
  const products = JSON.parse(rawData);

  // Group and sort
  const grouped = products.reduce((acc, p) => {
    const cat = p.category || 'Otros';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  const categories = Object.keys(grouped).sort();
  categories.forEach(cat => {
    grouped[cat].sort((a, b) => a.name.localeCompare(b.name));
  });

  const doc = new PDFDocument({
    size: 'A4',
    margin: 40,
    bufferPages: true
  });

  doc.pipe(fs.createWriteStream(OUTPUT_PATH));

  // --- Cover ---
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLORS.softPink);
  doc.fillColor(COLORS.text);
  doc.fontSize(40).text('Salem Store', 0, 250, { align: 'center' });
  doc.fontSize(20).text('Catálogo de Productos', 0, 300, { align: 'center' });
  doc.fontSize(12).text(`Generado el: ${new Date().toLocaleDateString()}`, 0, 500, { align: 'center' });
  doc.addPage();

  // --- Index ---
  doc.fontSize(24).text('Índice', { underline: true });
  doc.moveDown();
  categories.forEach(cat => {
    doc.fontSize(14).text(`${cat} .....................................................................`, { continued: true });
    doc.text(` ${grouped[cat].length} productos`, { align: 'right' });
    doc.moveDown(0.5);
  });
  doc.addPage();

  // --- Products ---
  for (const cat of categories) {
    // Section Header
    doc.rect(0, doc.y, doc.page.width, 40).fill(COLORS.softPink);
    doc.fillColor(COLORS.text).fontSize(20).text(cat, 50, doc.y - 30);
    doc.moveDown(2);

    const prods = grouped[cat];
    let col = 0;
    let row = 0;
    const itemWidth = 240;
    const itemHeight = 350;
    const startX = 50;
    const startY = doc.y;

    for (const p of prods) {
      if (doc.y > 650) {
        doc.addPage();
        doc.rect(0, 0, doc.page.width, 40).fill(COLORS.softPink);
        doc.fillColor(COLORS.text).fontSize(20).text(`${cat} (cont.)`, 50, 10);
        doc.moveDown(4);
      }

      const x = startX + (col * itemWidth);
      const y = doc.y;

      // Image
      let imagePath = null;
      if (p.image) {
        imagePath = await downloadImage(p.image, p.sku);
      }

      try {
        if (imagePath) {
          doc.image(imagePath, x, y, { width: itemWidth - 20, height: 180 });
        } else {
          doc.rect(x, y, itemWidth - 20, 180).stroke();
          doc.fontSize(10).text('Sin Imagen', x + 50, y + 80);
        }
      } catch (err) {
        doc.rect(x, y, itemWidth - 20, 180).stroke();
      }

      // Details
      doc.fillColor(COLORS.text).fontSize(10).text(p.name, x, y + 190, { width: itemWidth - 20, height: 30 });
      doc.fillColor(COLORS.gray).fontSize(8).text(`SKU: ${p.sku}`, x, y + 225);

      if (p.salePrice && p.salePrice > 0) {
        doc.fillColor(COLORS.sale).fontSize(12).text(`$${p.salePrice.toLocaleString()}`, x, y + 240);
        doc.fillColor(COLORS.gray).fontSize(8).text(`Antes: $${p.price.toLocaleString()}`, x, y + 255, { strike: true });
      } else {
        doc.fillColor(COLORS.accent).fontSize(12).text(`$${p.price.toLocaleString()}`, x, y + 240);
      }

      doc.fillColor(COLORS.text).fontSize(8).text(p.description || '', x, y + 270, { width: itemWidth - 20, height: 40, ellipsis: true });
      doc.fillColor(p.status === 'disponible' ? '#2d6a4f' : '#e63946').fontSize(7).text(p.status.toUpperCase(), x, y + 315);

      col++;
      if (col > 1) {
        col = 0;
        doc.moveDown(22);
      }
    }
    doc.addPage();
  }

  // Pagination
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    doc.fillColor(COLORS.gray).fontSize(8).text(`Página ${i + 1} de ${range.count}`, 0, doc.page.height - 30, { align: 'center' });
  }

  doc.end();
  console.log('Catálogo generado en: ' + OUTPUT_PATH);
}

generateCatalog().catch(console.error);
