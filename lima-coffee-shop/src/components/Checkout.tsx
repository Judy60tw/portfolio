import { useCart } from '../hooks/useCart';

interface CheckoutProps {
  onBack: () => void;
  onOrderSubmit: () => void;
}

export function Checkout({ onBack, onOrderSubmit }: CheckoutProps) {
  const { items, getTotalPrice, clearCart } = useCart();

  const handleSubmit = () => {
    // 模擬送出訂單
    clearCart();
    onOrderSubmit();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-950 to-coffee-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-coffee-800/50 rounded-lg shadow-xl border border-coffee-700/50 p-8">
          <h1 className="text-3xl font-bold text-coffee-50 mb-8 text-center">結帳確認</h1>

          {/* 訂單摘要 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-coffee-200 mb-4">訂單摘要</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center bg-coffee-900/50 rounded p-3"
                >
                  <div className="flex-1">
                    <p className="text-coffee-50 font-medium">{item.product.name}</p>
                    <p className="text-coffee-400 text-sm">
                      NT$ {item.product.price} × {item.quantity}
                    </p>
                  </div>
                  <p className="text-coffee-200 font-semibold">
                    NT$ {(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-coffee-700 flex justify-between items-center">
              <span className="text-xl font-semibold text-coffee-200">總計</span>
              <span className="text-2xl font-bold text-coffee-50">
                NT$ {getTotalPrice().toLocaleString()}
              </span>
            </div>
          </div>

          {/* 表單區域 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-coffee-200 mb-4">訂購資訊</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-coffee-300 text-sm mb-2">姓名</label>
                <input
                  type="text"
                  className="w-full bg-coffee-900/50 border border-coffee-700 text-coffee-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-coffee-500"
                  placeholder="請輸入您的姓名"
                />
              </div>
              <div>
                <label className="block text-coffee-300 text-sm mb-2">聯絡電話</label>
                <input
                  type="tel"
                  className="w-full bg-coffee-900/50 border border-coffee-700 text-coffee-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-coffee-500"
                  placeholder="請輸入您的電話"
                />
              </div>
              <div>
                <label className="block text-coffee-300 text-sm mb-2">配送地址</label>
                <textarea
                  className="w-full bg-coffee-900/50 border border-coffee-700 text-coffee-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-coffee-500"
                  rows={3}
                  placeholder="請輸入您的配送地址"
                />
              </div>
            </div>
          </div>

          {/* 按鈕 */}
          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex-1 bg-coffee-700 hover:bg-coffee-600 text-coffee-50 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              返回購物車
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-coffee-600 hover:bg-coffee-500 text-coffee-50 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              確認送出
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
