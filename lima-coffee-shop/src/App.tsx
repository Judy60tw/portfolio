import { useState, useMemo } from 'react';
import { CartProvider } from './contexts/CartContext';
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import { ProductCard } from './components/ProductCard';
import { FilterBar } from './components/FilterBar';
import { ShoppingCart } from './components/ShoppingCart';
import { Checkout } from './components/Checkout';
import { OrderConfirmation } from './components/OrderConfirmation';
import { Category, CoffeeProduct } from './types';

type View = 'shop' | 'checkout' | 'confirmation';

function AppContent() {
  const { products, loading, error } = useProducts();
  const { getTotalItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<Category>('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('shop');

  // 過濾商品
  const filteredProducts = useMemo(() => {
    return products.filter((product: CoffeeProduct) => {
      const matchesCategory =
        selectedCategory === '全部' || product.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  const handleOrderSubmit = () => {
    setCurrentView('confirmation');
  };

  const handleBackToShop = () => {
    setCurrentView('shop');
  };

  if (currentView === 'checkout') {
    return <Checkout onBack={handleBackToShop} onOrderSubmit={handleOrderSubmit} />;
  }

  if (currentView === 'confirmation') {
    return <OrderConfirmation onBackToShop={handleBackToShop} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-950 via-coffee-900 to-coffee-950">
      {/* 頂部導航列 */}
      <header className="bg-coffee-900/80 backdrop-blur-sm border-b border-coffee-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-coffee-600 rounded-full flex items-center justify-center">
              <span className="text-coffee-50 font-bold text-xl">L</span>
            </div>
            <h1 className="text-2xl font-bold text-coffee-50">LIMA 咖啡</h1>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-coffee-800 hover:bg-coffee-700 text-coffee-50 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
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
            <span>購物車</span>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-coffee-600 text-coffee-50 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 過濾列 */}
      <FilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 主要內容 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-coffee-600 border-t-transparent"></div>
            <p className="text-coffee-400 mt-4">載入商品中...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-400 text-lg">載入失敗：{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-6">
              <p className="text-coffee-400">
                找到 <span className="text-coffee-200 font-semibold">{filteredProducts.length}</span> 項商品
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p className="text-coffee-400 text-lg">找不到符合條件的商品</p>
                <p className="text-coffee-500 text-sm mt-2">請嘗試調整搜尋條件</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* 購物車側欄 */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
