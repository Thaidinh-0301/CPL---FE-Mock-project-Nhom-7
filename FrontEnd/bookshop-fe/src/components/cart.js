// Cart functionality
class Cart {
  constructor() {
    this.items = [
      { id: 1, bookId: 101, title: "Học JavaScript từ cơ bản đến nâng cao", author: "Nguyễn Văn A", price: 299000, quantity: 2 },
      { id: 2, bookId: 102, title: "React.js - Xây dựng ứng dụng web hiện đại", author: "Trần Thị B", price: 399000, quantity: 1 }
    ];
    this.shippingFee = 30000;
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateDisplay();
  }

  bindEvents() {
    // Quantity increase buttons
    document.querySelectorAll('.quantity-increase').forEach(button => {
      button.addEventListener('click', (e) => {
        const cartId = parseInt(e.target.closest('button').dataset.cartId);
        this.increaseQuantity(cartId);
      });
    });

    // Quantity decrease buttons
    document.querySelectorAll('.quantity-decrease').forEach(button => {
      button.addEventListener('click', (e) => {
        const cartId = parseInt(e.target.closest('button').dataset.cartId);
        this.decreaseQuantity(cartId);
      });
    });

    // Remove item buttons
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', (e) => {
        const cartId = parseInt(e.target.dataset.cartId);
        this.removeItem(cartId);
      });
    });
  }

  findItemById(cartId) {
    return this.items.find(item => item.id === cartId);
  }

  increaseQuantity(cartId) {
    const item = this.findItemById(cartId);
    if (item) {
      item.quantity += 1;
      this.updateItemDisplay(cartId);
      this.updateSummary();
      this.showNotification(`Đã tăng số lượng "${item.title}" thành ${item.quantity}`);
    }
  }

  decreaseQuantity(cartId) {
    const item = this.findItemById(cartId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.updateItemDisplay(cartId);
      this.updateSummary();
      this.showNotification(`Đã giảm số lượng "${item.title}" thành ${item.quantity}`);
    } else if (item && item.quantity === 1) {
      // If quantity is 1, ask for confirmation before removing
      if (confirm(`Bạn có muốn xóa "${item.title}" khỏi giỏ hàng?`)) {
        this.removeItem(cartId);
      }
    }
  }

  removeItem(cartId) {
    const item = this.findItemById(cartId);
    if (item) {
      const itemTitle = item.title;
      this.items = this.items.filter(item => item.id !== cartId);
      
      // Remove from DOM
      const itemElement = document.querySelector(`[data-cart-id="${cartId}"]`);
      if (itemElement) {
        itemElement.remove();
      }
      
      this.updateSummary();
      this.updateCartCount();
      this.checkEmptyCart();
      this.showNotification(`Đã xóa "${itemTitle}" khỏi giỏ hàng`);
    }
  }

  updateItemDisplay(cartId) {
    const item = this.findItemById(cartId);
    if (item) {
      const quantityDisplay = document.querySelector(`.quantity-display[data-cart-id="${cartId}"]`);
      if (quantityDisplay) {
        quantityDisplay.textContent = item.quantity;
      }
    }
  }

  updateSummary() {
    const subtotal = this.calculateSubtotal();
    const total = subtotal + this.shippingFee;

    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    if (subtotalElement) {
      subtotalElement.textContent = this.formatPrice(subtotal);
    }
    if (totalElement) {
      totalElement.textContent = this.formatPrice(total);
    }
  }

  updateCartCount() {
    const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
    }
  }

  calculateSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
  }

  checkEmptyCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart');
    
    if (this.items.length === 0) {
      cartItemsContainer.classList.add('hidden');
      emptyCartMessage.classList.remove('hidden');
    } else {
      cartItemsContainer.classList.remove('hidden');
      emptyCartMessage.classList.add('hidden');
    }
  }

  updateDisplay() {
    this.updateSummary();
    this.updateCartCount();
    this.checkEmptyCart();
  }

  showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // API Methods (for backend integration)
  async updateQuantityAPI(cartId, quantity) {
    try {
      const response = await fetch('/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          cart_id: cartId,
          quantity: quantity
        })
      });
      
      if (!response.ok) {
        throw new Error('Cập nhật thất bại');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating quantity:', error);
      this.showNotification('Có lỗi xảy ra khi cập nhật số lượng', 'error');
    }
  }

  async removeItemAPI(cartId) {
    try {
      const response = await fetch(`/api/cart/${cartId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Xóa thất bại');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error removing item:', error);
      this.showNotification('Có lỗi xảy ra khi xóa sản phẩm', 'error');
    }
  }

  getAuthToken() {
    return localStorage.getItem('authToken') || '';
  }
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', () => {
  window.cart = new Cart();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Cart;
}
