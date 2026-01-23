import { CoffeeProduct } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: CoffeeProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="bg-coffee-800/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-coffee-700/50">
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-coffee-900/80 text-coffee-100 px-3 py-1 rounded-full text-sm font-medium">
          {product.roast_level}
        </div>
      </div>
      <div className="p-5">
        <div className="mb-2">
          <span className="text-coffee-400 text-xs font-medium uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-coffee-50 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-coffee-300 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-coffee-400 text-xs">產地</span>
            <p className="text-coffee-200 font-medium">{product.origin}</p>
          </div>
          <div className="text-right">
            <span className="text-coffee-400 text-xs">價格</span>
            <p className="text-coffee-50 text-2xl font-bold">NT$ {product.price}</p>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-coffee-600 hover:bg-coffee-500 text-coffee-50 font-medium py-3 px-4 rounded-lg transition-colors duration-200 active:scale-95"
        >
          加入購物車
        </button>
      </div>
    </div>
  );
}
