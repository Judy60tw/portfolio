import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { CoffeeProduct } from '../types';

export function useProducts() {
  const [products, setProducts] = useState<CoffeeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/coffee_products.csv');
        if (!response.ok) {
          throw new Error('無法載入商品資料');
        }
        
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedProducts = results.data.map((row: any) => ({
              id: row.id,
              name: row.name,
              description: row.description,
              price: parseInt(row.price, 10),
              category: row.category,
              origin: row.origin,
              roast_level: row.roast_level,
              image_url: row.image_url,
            })) as CoffeeProduct[];
            
            setProducts(parsedProducts);
            setLoading(false);
          },
          error: (error) => {
            setError(error.message);
            setLoading(false);
          },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : '載入失敗');
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, loading, error };
}
