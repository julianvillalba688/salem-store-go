import { useState, useEffect, useMemo } from 'react';

export const useCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/products.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch catalog:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Curated helpers — intentional selection, not random slicing
  const helpers = useMemo(() => {
    const withImage = products.filter(p => p.image);
    const categories = [...new Set(products.map(p => p.category))].filter(Boolean);

    return {
      /** Products marked as offer */
      getOffers: () => withImage.filter(p => p.isOffer),
      /** Products marked as new */
      getNew: () => withImage.filter(p => p.isNew),
      /** Top N highest-priced products (aspirational hero/lookbook) */
      getHighValue: (n = 4) => [...withImage].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)).slice(0, n),
      /** Products by category */
      getByCategory: (cat) => withImage.filter(p => p.category === cat),
      /** First product with image from each category (for category cards) */
      getCategoryCovers: () => categories.map(cat => {
        const first = withImage.find(p => p.category === cat);
        return first ? { category: cat, product: first, count: withImage.filter(p => p.category === cat).length } : null;
      }).filter(Boolean),
      /** All unique categories */
      categories,
      /** All products with valid images */
      withImage,
    };
  }, [products]);

  return { products, loading, error, ...helpers };
};
