import { useCart } from '../hooks/useCart';
import { useState } from 'react';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function ShoppingCart({ isOpen, onClose, onCheckout }: ShoppingCartProps) {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      onClose();
    }, 200);
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* 購物車側欄 */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-96 bg-coffee-900 shadow-2xl z-50 transform transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* 標題列 */}
          <div className="flex items-center justify-between p-6 border-b border-coffee-800">
            <h2 className="text-2xl font-bold text-coffee-50">購物車</h2>
            <button
              onClick={handleClose}
              className="text-coffee-400 hover:text-coffee-50 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* 購物車內容 */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 mx-auto text-coffee-700 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="text-coffee-400 text-lg">購物車是空的</p>
                <p className="text-coffee-500 text-sm mt-2">快來選購您喜愛的咖啡吧！</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-coffee-800/50 rounded-lg p-4 border border-coffee-700/50"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="text-coffee-50 font-medium mb-1 line-clamp-2">
                          {item.product.name}
                        </h3>
                        <p className="text-coffee-400 text-sm mb-2">
                          NT$ {item.product.price}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 rounded bg-coffee-700 hover:bg-coffee-600 text-coffee-50 flex items-center justify-center transition-colors"
                            >
                              −
                            </button>
                            <span className="text-coffee-50 font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 rounded bg-coffee-700 hover:bg-coffee-600 text-coffee-50 flex items-center justify-center transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-coffee-500 hover:text-coffee-400 text-sm transition-colors"
                          >
                            刪除
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 底部結帳區 */}
          {items.length > 0 && (
            <div className="border-t border-coffee-800 p-6 bg-coffee-950/50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-coffee-400">總計</span>
                <span className="text-2xl font-bold text-coffee-50">
                  NT$ {getTotalPrice().toLocaleString()}
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-coffee-600 hover:bg-coffee-500 text-coffee-50 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                前往結帳
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
