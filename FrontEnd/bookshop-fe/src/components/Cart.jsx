import React from 'react'
import { useCartStore, useUIStore } from '../store'

const CartIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H17M9 19.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm8 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"></path>
  </svg>
)

const PlusIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
  </svg>
)

const MinusIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
  </svg>
)

const TrashIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
  </svg>
)

const XIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
  </svg>
)

// Format currency helper
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

// Cart Button Component
export const CartButton = () => {
  const { totalItems } = useCartStore()
  const { toggleCart } = useUIStore()

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      <CartIcon className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  )
}

// Tiki-style Cart Item Component
const TikiCartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore()
  const { addNotification } = useUIStore()

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity)
    if (newQuantity === 0) {
      addNotification({
        type: 'info',
        message: `Đã xóa "${item.title}" khỏi giỏ hàng`
      })
    }
  }

  const handleRemove = () => {
    removeItem(item.id)
    addNotification({
      type: 'success',
      message: `Đã xóa "${item.title}" khỏi giỏ hàng`
    })
  }

  return (
    <div className="bg-white px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-4">
        {/* Checkbox */}
        <input 
          type="checkbox" 
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          defaultChecked
        />
        
        {/* Product Image with TikiFast badge */}
        <div className="relative flex-shrink-0">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-20 h-20 object-cover rounded border border-gray-200"
          />
          <div className="absolute -top-1 -left-1 bg-blue-500 text-white text-xs px-1 py-0.5 rounded text-center">
            <div className="text-[8px] font-bold leading-none">TIKI</div>
            <div className="text-[6px] leading-none">FAST</div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
            {item.title}
          </h3>
          <p className="text-xs text-gray-500 mb-2">- Hàng Chính Hãng</p>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-gray-900">
              {formatCurrency(item.price)}
            </span>
            <span className="text-xs text-gray-400 line-through">
              {formatCurrency(item.price * 1.2)}
            </span>
          </div>
        </div>

        {/* Quantity Controls - Tiki Style */}
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={item.quantity <= 1}
          >
            <MinusIcon className="w-3 h-3" />
          </button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            className="w-12 h-8 text-center text-sm border-none outline-none"
            min="1"
          />
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <PlusIcon className="w-3 h-3" />
          </button>
        </div>

        {/* Total Price */}
        <div className="text-right min-w-[80px]">
          <span className="text-sm font-semibold text-red-600">
            {formatCurrency(item.price * item.quantity)}
          </span>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="text-gray-400 hover:text-red-500 p-1 transition-colors"
          title="Xóa sản phẩm"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// Tiki-style Order Summary Component
const TikiOrderSummary = () => {
  const { subtotal, shippingFee, total, totalItems } = useCartStore()
  const { addNotification, closeCart } = useUIStore()

  const handleCheckout = () => {
    addNotification({
      type: 'success',
      message: 'Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm.'
    })
    closeCart()
  }

  return (
    <div className="h-full flex flex-col">
      {/* Promotion Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 text-blue-600 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">BookShop khuyến mãi</span>
          </div>
          <p className="text-xs text-blue-600 mt-1">
            Miễn phí giao hàng cho đơn từ 149k
          </p>
        </div>
      </div>

      {/* Summary Details */}
      <div className="flex-1 p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tạm tính ({totalItems} sản phẩm):</span>
          <span className="text-gray-900">{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Phí vận chuyển:</span>
          <span className="text-gray-900">{formatCurrency(shippingFee)}</span>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between text-base font-semibold">
            <span className="text-gray-900">Tổng cộng:</span>
            <div className="text-right">
              <div className="text-red-600 text-lg">{formatCurrency(total)}</div>
              <div className="text-xs text-gray-500">(Đã bao gồm VAT nếu có)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleCheckout}
          className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
        >
          Mua Hàng ({totalItems})
        </button>
      </div>
    </div>
  )
}

// Empty Cart Component
const EmptyCart = () => {
  const { closeCart } = useUIStore()

  return (
    <div className="text-center py-12">
      <CartIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">Giỏ hàng trống</h3>
      <p className="mt-1 text-sm text-gray-500">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
      <div className="mt-6">
        <button
          onClick={closeCart}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    </div>
  )
}

// Order Summary Component (keep for CartPage)
const OrderSummary = () => {
  const { subtotal, shippingFee, total } = useCartStore()
  const { addNotification, closeCart } = useUIStore()

  const handleCheckout = () => {
    addNotification({
      type: 'success',
      message: 'Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm.'
    })
    closeCart()
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Tóm tắt đơn hàng</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tạm tính:</span>
          <span className="text-gray-900">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Phí vận chuyển:</span>
          <span className="text-gray-900">{formatCurrency(shippingFee)}</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between text-base font-medium">
            <span className="text-gray-900">Tổng cộng:</span>
            <span className="text-gray-900">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Tiến hành thanh toán
      </button>

      <button
        onClick={() => {}}
        className="w-full mt-3 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
      >
        Tiếp tục mua sắm
      </button>
    </div>
  )
}

// Cart Item Component (keep for CartPage)
const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore()
  const { addNotification } = useUIStore()

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity)
    if (newQuantity === 0) {
      addNotification({
        type: 'info',
        message: `Đã xóa "${item.title}" khỏi giỏ hàng`
      })
    }
  }

  const handleRemove = () => {
    removeItem(item.id)
    addNotification({
      type: 'success',
      message: `Đã xóa "${item.title}" khỏi giỏ hàng`
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center space-x-4">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-20 h-28 object-cover rounded"
        />
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
          <p className="text-sm text-gray-500 mt-1">Tác giả: {item.author}</p>
          <p className="text-lg font-semibold text-blue-600 mt-2">
            {formatCurrency(item.price)}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Quantity Controls */}
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="px-3 py-1 text-gray-500 hover:text-gray-700 transition-colors"
              disabled={item.quantity <= 1}
            >
              <MinusIcon />
            </button>
            <span className="px-4 py-1 text-gray-900 font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="px-3 py-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <PlusIcon />
            </button>
          </div>
          {/* Remove Button */}
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 p-2 transition-colors"
            title="Xóa sản phẩm"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

// Main Cart Modal Component  
export const CartModal = () => {
  const { items, totalItems } = useCartStore()
  const { isCartOpen, closeCart } = useUIStore()

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Modal */}
      <div className="absolute right-0 top-0 h-full w-full max-w-5xl bg-gray-50 shadow-xl transform transition-transform">
        {/* Header - Tiki style */}
        <div className="bg-white px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-gray-900">GIỎ HÀNG</h2>
            </div>
            <button
              onClick={closeCart}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <XIcon />
            </button>
          </div>
          
          {/* Select All + Total Items */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  defaultChecked
                />
                <span className="text-sm text-gray-600">Tất cả ({totalItems} sản phẩm)</span>
              </label>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Đơn giá</span>
              <span>Số lượng</span>
              <span>Thành tiền</span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-full overflow-hidden">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {items.length === 0 ? (
              <EmptyCart />
            ) : (
              <div className="space-y-1">
                {/* Store Header */}
                <div className="bg-white px-6 py-3 border-b">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      defaultChecked
                    />
                    <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">B</span>
                    </div>
                    <span className="font-medium text-gray-900">BookShop Official Store</span>
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                {/* Cart Items */}
                {items.map((item) => (
                  <TikiCartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Order Summary - Only show when there are items */}
          {items.length > 0 && (
            <div className="lg:w-96 bg-white border-l border-gray-200">
              <TikiOrderSummary />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Cart Page Component (for standalone cart page)
export const CartPage = () => {
  const { items } = useCartStore()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Giỏ hàng của bạn</h2>
          
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        {items.length > 0 && (
          <div className="lg:w-96">
            <OrderSummary />
          </div>
        )}
      </div>
    </div>
  )
}
