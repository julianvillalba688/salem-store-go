import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { UploadCloud, FileJson, AlertCircle, CheckCircle, Download } from 'lucide-react';
import { slugify } from '../utils/slugify';

const AdminImport = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [jsonOutput, setJsonOutput] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setErrors([]);
    setSuccess(false);
    setJsonOutput(null);

    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
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
          
          processData(normalizedData);
        } catch (error) {
          setErrors(['Error al leer el archivo Excel. Asegúrate de que el formato sea correcto.']);
        }
      };
      reader.readAsBinaryString(uploadedFile);
    }
  };

  const processData = (data) => {
    let validationErrors = [];
    let processedProducts = [];
    let seenSkus = new Set();

    data.forEach((row, index) => {
      const rowNum = index + 2; // +1 for 0-index, +1 for header
      
      // Validaciones básicas
      if (!row.sku) validationErrors.push(`Fila ${rowNum}: SKU es obligatorio.`);
      if (!row.nombre) validationErrors.push(`Fila ${rowNum}: Nombre es obligatorio.`);
      if (row.precio === undefined || isNaN(parseFloat(row.precio))) {
        validationErrors.push(`Fila ${rowNum}: Precio inválido o vacío.`);
      }
      
      if (row.sku && seenSkus.has(row.sku)) {
        validationErrors.push(`Fila ${rowNum}: SKU '${row.sku}' duplicado.`);
      }
      if (row.sku) seenSkus.add(row.sku);

      if (!row.imagen) validationErrors.push(`Fila ${rowNum}: URL de imagen vacía.`);

      // Procesar datos
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

    setErrors(validationErrors);
    setPreviewData(processedProducts);
    
    if (validationErrors.length === 0 && processedProducts.length > 0) {
      setSuccess(true);
      setJsonOutput(processedProducts);
    }
  };

  const handleDownloadJson = () => {
    if (!jsonOutput) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonOutput, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "products.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-dark mb-2">Administración de Catálogo</h1>
      <p className="text-gray-600 mb-8">Sube tu archivo <code className="bg-gray-100 px-2 py-1 rounded text-sm">catalogo.xlsx</code> para actualizar los productos de tu tienda.</p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
          <input 
            type="file" 
            accept=".xlsx, .xls" 
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {file ? file.name : "Haz clic o arrastra tu archivo Excel aquí"}
          </h3>
          <p className="text-gray-500 text-sm">Soporta formatos .xlsx y .xls</p>
        </div>

        {errors.length > 0 && (
          <div className="mt-8 p-6 bg-red-50 rounded-xl border border-red-100">
            <h4 className="flex items-center gap-2 text-red-800 font-semibold mb-4">
              <AlertCircle size={20} />
              Se encontraron {errors.length} errores de validación:
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-red-700 text-sm">
              {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        )}

        {success && (
          <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-100 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h4 className="text-green-800 font-semibold text-lg mb-2">¡Validación exitosa!</h4>
            <p className="text-green-700 mb-6">Se procesaron {previewData.length} productos correctamente.</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={handleDownloadJson}
                className="btn-primary w-full sm:w-auto"
              >
                <Download size={20} />
                Descargar products.json
              </button>
              <div className="text-left text-sm text-gray-600 bg-white p-4 rounded-lg border border-green-200">
                <p className="font-semibold mb-1">Siguiente paso:</p>
                <p>Reemplaza el archivo <code className="bg-gray-100 px-1 rounded">public/data/products.json</code> en tu repositorio con el archivo descargado.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {previewData.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 overflow-hidden">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FileJson size={24} className="text-primary-600" />
            Vista previa de datos ({previewData.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">SKU</th>
                  <th className="px-4 py-3">Imagen</th>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Precio</th>
                  <th className="px-4 py-3">Categoría</th>
                  <th className="px-4 py-3 rounded-tr-lg">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {previewData.slice(0, 10).map((p) => (
                  <tr key={p.sku} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{p.sku}</td>
                    <td className="px-4 py-3">
                      {p.image ? (
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-10 h-10 object-cover rounded bg-gray-100" 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      
                      <div 
                        className="w-10 h-10 bg-red-100 text-red-500 rounded items-center justify-center text-xs text-center p-1 leading-tight"
                        style={{ display: p.image ? 'none' : 'flex' }}
                      >
                        Roto
                      </div>
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate" title={p.name}>{p.name}</td>
                    <td className="px-4 py-3">${p.price}</td>
                    <td className="px-4 py-3">{p.category}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.status === 'disponible' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {previewData.length > 10 && (
              <div className="text-center py-4 text-sm text-gray-500 bg-gray-50 rounded-b-lg">
                Y {previewData.length - 10} productos más...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminImport;
