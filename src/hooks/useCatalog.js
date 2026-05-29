import { useState, useEffect } from 'react';

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

  return { products, loading, error };
};
