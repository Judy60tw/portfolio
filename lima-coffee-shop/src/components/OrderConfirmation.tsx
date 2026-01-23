interface OrderConfirmationProps {
  onBackToShop: () => void;
}

export function OrderConfirmation({ onBackToShop }: OrderConfirmationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-950 to-coffee-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-coffee-800/50 rounded-lg shadow-xl border border-coffee-700/50 p-8 text-center">
          {/* 成功圖示 */}
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-coffee-600 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-coffee-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* 標題 */}
          <h1 className="text-3xl font-bold text-coffee-50 mb-4">訂單已收到！</h1>
          <p className="text-coffee-300 mb-2">
            感謝您的訂購，我們已收到您的訂單
          </p>
          <p className="text-coffee-400 text-sm mb-8">
            我們將盡快為您處理，並透過電話與您確認訂單詳情
          </p>

          {/* 訂單資訊 */}
          <div className="bg-coffee-900/50 rounded-lg p-4 mb-6 text-left">
            <p className="text-coffee-300 text-sm mb-1">訂單編號</p>
            <p className="text-coffee-50 font-mono font-semibold">
              #{Date.now().toString().slice(-8)}
            </p>
          </div>

          {/* 返回按鈕 */}
          <button
            onClick={onBackToShop}
            className="w-full bg-coffee-600 hover:bg-coffee-500 text-coffee-50 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            繼續購物
          </button>
        </div>
      </div>
    </div>
  );
}
