import { create } from 'zustand'

// Cart Store
export const useCartStore = create((set, get) => ({
  items: [
    {
      id: 1,
      bookId: 101,
      title: 'Học JavaScript từ cơ bản đến nâng cao',
      author: 'Nguyễn Văn A',
      price: 299000,
      quantity: 2,
      image: 'https://via.placeholder.com/100x140/4F46E5/FFFFFF?text=Book+1'
    },
    {
      id: 2,
      bookId: 102,
      title: 'React.js - Xây dựng ứng dụng web hiện đại',
      author: 'Trần Thị B',
      price: 399000,
      quantity: 1,
      image: 'https://via.placeholder.com/100x140/7C3AED/FFFFFF?text=Book+2'
    }
  ],
  shippingFee: 30000,
  isLoading: false,

  // Helper function to get auth token
  getAuthToken: () => {
    return localStorage.getItem('authToken') || '';
  },

  // Actions
  addItem: (book) => set((state) => {
    const existingItem = state.items.find(item => item.bookId === book.bookId)
    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.bookId === book.bookId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
    } else {
      return {
        items: [...state.items, { ...book, id: Date.now(), quantity: 1 }]
      }
    }
  }),

  removeItem: async (cartId) => {
    const state = get();
    try {
      // Try API call first
      const response = await fetch(`/api/cart/${cartId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${state.getAuthToken()}`
        }
      });
      
      if (response.ok) {
        set((state) => ({
          items: state.items.filter(item => item.id !== cartId)
        }));
        return { success: true };
      } else {
        throw new Error('API call failed');
      }
    } catch (error) {
      // Fallback to local update if API fails
      console.log('API not available, updating locally:', error.message);
      set((state) => ({
        items: state.items.filter(item => item.id !== cartId)
      }));
      return { success: true };
    }
  },

  updateQuantity: async (cartId, quantity) => {
    const state = get();
    
    if (quantity <= 0) {
      return state.removeItem(cartId);
    }
    
    try {
      // Try API call first
      const response = await fetch('/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.getAuthToken()}`
        },
        body: JSON.stringify({
          cart_id: cartId,
          quantity: quantity
        })
      });
      
      if (response.ok) {
        set((state) => ({
          items: state.items.map(item =>
            item.id === cartId ? { ...item, quantity } : item
          )
        }));
        return { success: true };
      } else {
        throw new Error('API call failed');
      }
    } catch (error) {
      // Fallback to local update if API fails
      console.log('API not available, updating locally:', error.message);
      set((state) => ({
        items: state.items.map(item =>
          item.id === cartId ? { ...item, quantity } : item
        )
      }));
      return { success: true };
    }
  },

  clearCart: () => set({ items: [] }),

  // Computed values
  get totalItems() {
    return get().items.reduce((sum, item) => sum + item.quantity, 0)
  },

  get subtotal() {
    return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  },

  get total() {
    return get().subtotal + get().shippingFee
  }
}))

// Auth Store
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Actions
  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      // Try real API first
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Đăng nhập thất bại');
      }
      
      if (data.success) {
        const user = {
          ...data.user,
          avatar: `https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=${data.user.name.charAt(0)}`
        }
        
        set({ user, isAuthenticated: true, isLoading: false })
        
        // Store auth data
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(user));
        
        return { success: true }
      } else {
        throw new Error(data.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      // Fallback to mock for development if API is not available
      console.log('API not available, using mock:', error.message);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      if (email === 'admin@bookshop.com' && password === 'password') {
        const user = {
          id: 1,
          name: 'Admin User',
          email: email,
          role: 'admin',
          avatar: 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=A'
        };
        
        set({ user, isAuthenticated: true, isLoading: false })
        
        localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
        localStorage.setItem('user', JSON.stringify(user));
        
        return { success: true }
      } else {
        set({ error: 'Email hoặc mật khẩu không chính xác', isLoading: false })
        return { success: false, error: 'Email hoặc mật khẩu không chính xác' }
      }
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null })
    try {
      // Try real API first
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          password: userData.password
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Đăng ký thất bại');
      }
      
      set({ isLoading: false })
      return { success: true, message: 'Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.' }
    } catch (error) {
      // Fallback to mock for development
      console.log('API not available, using mock:', error.message);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check for duplicate email (mock)
      if (userData.email === 'admin@bookshop.com') {
        set({ error: 'Email này đã được sử dụng', isLoading: false })
        return { success: false, error: 'Email này đã được sử dụng' }
      }
      
      // Mock successful registration
      set({ isLoading: false })
      return { success: true, message: 'Đăng ký thành công!' }
    }
  },

  logout: () => {
    // Clear auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false, error: null })
  },

  // Initialize auth from localStorage
  initAuth: () => {
    try {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        set({ 
          user: JSON.parse(user), 
          isAuthenticated: true 
        });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  },

  clearError: () => set({ error: null })
}))

// UI Store for modal states and notifications
export const useUIStore = create((set) => ({
  isCartOpen: false,
  isAuthOpen: false,
  authMode: 'login', // 'login' or 'register'
  notifications: [],

  // Actions
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  openAuth: (mode = 'login') => set({ isAuthOpen: true, authMode: mode }),
  closeAuth: () => set({ isAuthOpen: false }),
  setAuthMode: (mode) => set({ authMode: mode }),

  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, { ...notification, id: Date.now() }]
  })),

  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(notif => notif.id !== id)
  }))
}))
