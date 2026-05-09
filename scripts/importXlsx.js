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

    const category = row.categoria || 'General';
    const name = row.nombre || '';
    
    // Generar descripción limpia basada en categoría si la original tiene basura o es corta
    const getCleanDescription = (desc, name, cat) => {
      const lowerName = name.toLowerCase();
      const lowerCat = cat.toLowerCase();
      
      const templates = {
        'Aretes': 'Aretes delicados para iluminar el rostro y complementar looks diarios o especiales.',
        'Anillos': 'Anillo femenino y versátil, ideal para combinar con otras piezas o llevar como detalle protagonista.',
        'Collares': 'Collar delicado para elevar el escote y acompañar looks casuales o elegantes.',
        'Pulseras': 'Pulsera sutil y versátil para combinar en capas o usar como detalle diario.',
        'Tobilleras': 'Tobillera delicada para dar un toque femenino y fresco a tus looks.',
        'Dijes': 'Dije especial para personalizar cadenas y llevar un detalle con significado.',
        'Sets': 'Set coordinado de accesorios, ideal para regalar o lucir una combinación lista para usar.',
        'Ear Cuff': 'Accesorio moderno para darle un toque diferente y luminoso a tu look sin esfuerzo.',
        'General': 'Pieza delicada diseñada para resaltar tu estilo en cualquier ocasión.'
      };

      let type = 'General';
      if (lowerCat.includes('arete') || lowerName.includes('arete') || lowerName.includes('topo') || lowerName.includes('argolla') || lowerName.includes('candonga')) type = 'Aretes';
      else if (lowerCat.includes('anillo') || lowerName.includes('anillo')) type = 'Anillos';
      else if (lowerCat.includes('collar') || lowerCat.includes('cadena') || lowerCat.includes('gargantilla') || lowerName.includes('collar') || lowerName.includes('cadena')) type = 'Collares';
      else if (lowerCat.includes('pulsera') || lowerName.includes('pulsera')) type = 'Pulseras';
      else if (lowerCat.includes('tobillera') || lowerName.includes('tobillera')) type = 'Tobilleras';
      else if (lowerCat.includes('dije') || lowerName.includes('dije')) type = 'Dijes';
      else if (lowerCat.includes('juego') || lowerCat.includes('set') || lowerName.includes('juego') || lowerName.includes('set')) type = 'Sets';
      else if (lowerName.includes('cuff')) type = 'Ear Cuff';

      // Si la descripción original tiene "Precio", "$", "COP", "http" o es muy corta, usamos el template
      if (!desc || desc.length < 10 || desc.includes('Precio') || desc.includes('$') || desc.includes('COP') || desc.includes('http')) {
        return templates[type] || templates['General'];
      }
      return desc;
    };

    const product = {
      id: row.sku ? row.sku.toString() : `id-${index}`,
      sku: row.sku ? row.sku.toString() : '',
      name: name,
      slug: slugify(name),
      description: getCleanDescription(row.descripcion, name, category),
      price: parseFloat(row.precio) || 0,
      salePrice: row.precio_oferta ? parseFloat(row.precio_oferta) : null,
      category: category,
      subcategory: row.subcategoria || '',
      brand: row.marca || 'Salem Store',
      stock: row.stock !== undefined ? parseInt(row.stock) : 10,
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
