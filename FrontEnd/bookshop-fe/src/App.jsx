import React, { useEffect } from 'react'
import { Header } from './components/Header'
import { CartModal } from './components/Cart'
import { AuthModal } from './components/Auth'
import { NotificationContainer } from './components/Notification'
import { useCartStore, useUIStore, useAuthStore } from './store'

// Demo Book Component
const BookCard = ({ book }) => {
  const { addItem } = useCartStore()
  const { addNotification } = useUIStore()

  const handleAddToCart = () => {
    addItem(book)
    addNotification({
      type: 'success',
      message: `Đã thêm "${book.title}" vào giỏ hàng`
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
      <img 
        src={book.image} 
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 mb-2">Tác giả: {book.author}</p>
        <p className="text-lg font-semibold text-blue-600 mb-3">
          {formatCurrency(book.price)}
        </p>
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  )
}

// Demo Books Data
const demoBooks = [
  {
    bookId: 103,
    title: 'Clean Code - Mã nguồn sạch',
    author: 'Robert C. Martin',
    price: 450000,
    image: 'https://via.placeholder.com/200x280/3B82F6/FFFFFF?text=Clean+Code'
  },
  {
    bookId: 104,
    title: 'Design Patterns',
    author: 'Gang of Four',
    price: 520000,
    image: 'https://via.placeholder.com/200x280/10B981/FFFFFF?text=Design+Patterns'
  },
  {
    bookId: 105,
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    price: 350000,
    image: 'https://via.placeholder.com/200x280/F59E0B/FFFFFF?text=JS+Good+Parts'
  },
  {
    bookId: 106,
    title: 'The Pragmatic Programmer',
    author: 'David Thomas',
    price: 480000,
    image: 'https://via.placeholder.com/200x280/8B5CF6/FFFFFF?text=Pragmatic'
  },
  {
    bookId: 107,
    title: 'You Don\'t Know JS',
    author: 'Kyle Simpson',
    price: 380000,
    image: 'https://via.placeholder.com/200x280/EF4444/FFFFFF?text=You+Dont+Know+JS'
  },
  {
    bookId: 108,
    title: 'Refactoring',
    author: 'Martin Fowler',
    price: 420000,
    image: 'https://via.placeholder.com/200x280/06B6D4/FFFFFF?text=Refactoring'
  }
]

function App() {
  const { openAuth, openCart } = useUIStore()
  const { initAuth } = useAuthStore()

  // Initialize auth state on app start
  useEffect(() => {
    initAuth()
  }, [initAuth])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Chào mừng đến với BookShop
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Khám phá thế giới sách với hàng ngàn đầu sách chất lượng
          </p>
          
          {/* Demo Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-8 max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Demo Components</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Cart Component Demo */}
              <div className="text-center">
                <div className="bg-blue-50 rounded-lg p-6 mb-4">
                  <svg className="w-12 h-12 text-blue-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H17M9 19.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm8 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"></path>
                  </svg>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Component Cart</h4>
                  <p className="text-gray-600 mb-4">Quản lý giỏ hàng với Zustand</p>
                  <button
                    onClick={openCart}
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Mở giỏ hàng
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  <p> Thêm/giảm số lượng sản phẩm</p>
                  <p> Xóa sản phẩm khỏi giỏ hàng</p>
                  <p> Tính tổng tiền tự động</p>
                </div>
              </div>

              {/* Auth Component Demo */}
              <div className="text-center">
                <div className="bg-green-50 rounded-lg p-6 mb-4">
                  <svg className="w-12 h-12 text-green-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Login/Register</h4>
                  <p className="text-gray-600 mb-4">Hệ thống xác thực với Zustand</p>
                  <button
                    onClick={() => openAuth('login')}
                    className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Đăng nhập/Đăng ký
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  <p>Đăng nhập</p>
                  <p>Đăng ký tài khoản mới</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Books Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Sách nổi bật</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoBooks.map((book) => (
              <BookCard key={book.bookId} book={book} />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Đa dạng thể loại</h3>
            <p className="text-gray-600">Hàng ngàn đầu sách từ nhiều thể loại khác nhau</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Giao hàng nhanh</h3>
            <p className="text-gray-600">Giao hàng toàn quốc trong 24-48h</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Chất lượng đảm bảo</h3>
            <p className="text-gray-600">Sách chính hãng, chất lượng cao</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">BookShop</h3>
            <p className="text-gray-400">Sàn thương mại điện tử sách hàng đầu Việt Nam</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>© 2025 BookShop. All rights reserved.</p>
              <p className="mt-2">Demo project - CPL FE Mock Project Nhóm 7</p>
              <p className="mt-2">Built with React + Zustand + Tailwind CSS</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CartModal />
      <AuthModal />
      
      {/* Notifications */}
      <NotificationContainer />
    </div>
  )
}

export default App
