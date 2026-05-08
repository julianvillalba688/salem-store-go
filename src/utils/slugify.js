// utils/slugify.js
export const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .normalize('NFD') // divide caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // elimina los acentos
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // reemplaza espacios por guiones
    .replace(/[^\w-]+/g, '') // remueve caracteres no alfanuméricos
    .replace(/--+/g, '-'); // reemplaza multiples guiones
};
