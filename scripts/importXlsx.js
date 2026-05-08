import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function para slugify
const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const inputPath = path.join(__dirname, '../public/data/catalogo.xlsx');
const outputPath = path.join(__dirname, '../public/data/products.json');

console.log('Iniciando proceso de importación...');
console.log(`Leyendo archivo: ${inputPath}`);

if (!fs.existsSync(inputPath)) {
  console.error('ERROR: No se encontró el archivo catalogo.xlsx en public/data/');
  process.exit(1);
}

try {
  const fileBuffer = fs.readFileSync(inputPath);
  const wb = XLSX.read(fileBuffer, { type: 'buffer' });
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];
  const data = XLSX.utils.sheet_to_json(ws);

  // Normalizar las llaves a minúsculas y sin espacios
  const normalizedData = data.map(row => {
    const newRow = {};
    for (const key in row) {
      newRow[key.toLowerCase().trim()] = row[key];
    }
    return newRow;
  });

  console.log(`Se encontraron ${normalizedData.length} filas. Procesando...`);

  let processedProducts = [];
  let validationErrors = [];
  let seenSkus = new Set();

  normalizedData.forEach((row, index) => {
    const rowNum = index + 2;

    if (!row.sku) validationErrors.push(`Fila ${rowNum}: SKU es obligatorio.`);
    if (!row.nombre) validationErrors.push(`Fila ${rowNum}: Nombre es obligatorio.`);
    if (row.precio === undefined || isNaN(parseFloat(row.precio))) {
      validationErrors.push(`Fila ${rowNum}: Precio inválido o vacío.`);
    }

    if (row.sku && seenSkus.has(row.sku)) {
      validationErrors.push(`Fila ${rowNum}: SKU '${row.sku}' duplicado.`);
    }
    if (row.sku) seenSkus.add(row.sku);

    const product = {
      id: row.sku ? row.sku.toString() : `id-${index}`,
      sku: row.sku ? row.sku.toString() : '',
      name: row.nombre || '',
      slug: slugify(row.nombre || ''),
      description: row.descripcion || '',
      price: parseFloat(row.precio) || 0,
      salePrice: row.precio_oferta ? parseFloat(row.precio_oferta) : null,
      category: row.categoria || 'General',
      subcategory: row.subcategoria || '',
      brand: row.marca || '',
      stock: row.stock !== undefined ? parseInt(row.stock) : 0,
      status: row.estado ? row.estado.toLowerCase() : 'disponible',
      image: row.imagen || '',
      gallery: row.imagenes_extra ? row.imagenes_extra.split(',').map(url => url.trim()) : [],
      featured: ['sí', 'si', 'true', '1', 1, true].includes(row.destacado),
      isNew: ['sí', 'si', 'true', '1', 1, true].includes(row.nuevo),
      isOffer: ['sí', 'si', 'true', '1', 1, true].includes(row.oferta),
    };

    processedProducts.push(product);
  });

  if (validationErrors.length > 0) {
    console.warn('ADVERTENCIA: Se encontraron los siguientes errores, pero se generó el JSON (algunos productos podrían estar incompletos):');
    validationErrors.forEach(err => console.warn(` - ${err}`));
  }

  // Ensure public/data dir exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(processedProducts, null, 2), 'utf-8');
  console.log(`\n¡ÉXITO! Se generó el archivo ${outputPath} con ${processedProducts.length} productos.`);

} catch (error) {
  console.error('ERROR CRÍTICO durante la importación:', error);
  process.exit(1);
}
