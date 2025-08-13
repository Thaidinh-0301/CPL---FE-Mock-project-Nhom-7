// Authentication functionality
class Auth {
  constructor() {
    this.currentTab = 'login';
    this.isLoading = false;
    this.init();
  }

  init() {
    this.bindEvents();
    this.initValidation();
  }

  bindEvents() {
    // Tab switching
    document.getElementById('login-tab').addEventListener('click', () => this.switchTab('login'));
    document.getElementById('register-tab').addEventListener('click', () => this.switchTab('register'));
    document.getElementById('switch-to-register').addEventListener('click', () => this.switchTab('register'));
    document.getElementById('switch-to-login').addEventListener('click', () => this.switchTab('login'));

    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
    document.getElementById('registerForm').addEventListener('submit', (e) => this.handleRegister(e));

    // Password toggle
    document.querySelectorAll('.toggle-password').forEach(button => {
      button.addEventListener('click', (e) => this.togglePassword(e));
    });

    // Real-time validation
    this.setupRealTimeValidation();
  }

  switchTab(tab) {
    this.currentTab = tab;
    
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (tab === 'login') {
      loginTab.classList.add('bg-blue-600', 'text-white');
      loginTab.classList.remove('text-gray-600');
      registerTab.classList.remove('bg-blue-600', 'text-white');
      registerTab.classList.add('text-gray-600');
      
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
    } else {
      registerTab.classList.add('bg-blue-600', 'text-white');
      registerTab.classList.remove('text-gray-600');
      loginTab.classList.remove('bg-blue-600', 'text-white');
      loginTab.classList.add('text-gray-600');
      
      registerForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
    }

    // Clear previous errors
    this.clearErrors();
  }

  togglePassword(e) {
    const targetId = e.target.closest('button').dataset.target;
    const passwordInput = document.getElementById(targetId);
    const icon = e.target.closest('button').querySelector('svg');

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      icon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.732 6.732m4.242 4.242L15.22 15.22m-4.346-4.347a3.012 3.012 0 00-.306 1.127m4.242 4.242a3.012 3.012 0 00-4.243-4.243m4.243 4.243a3.012 3.012 0 00.306-1.127m0 0a3.012 3.012 0 00-1.127-.306"></path>
      `;
    } else {
      passwordInput.type = 'password';
      icon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
      `;
    }
  }

  async handleLogin(e) {
    e.preventDefault();
    
    if (this.isLoading) return;

    const formData = new FormData(e.target);
    const loginData = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    // Validate form
    if (!this.validateLoginForm(loginData)) {
      return;
    }

    this.setLoading(true);

    try {
      const response = await this.loginAPI(loginData);
      
      if (response.success) {
        this.showNotification('Đăng nhập thành công!', 'success');
        
        // Store auth token
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Redirect after short delay
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        throw new Error(response.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      this.showNotification(error.message, 'error');
    } finally {
      this.setLoading(false);
    }
  }

  async handleRegister(e) {
    e.preventDefault();
    
    if (this.isLoading) return;

    const formData = new FormData(e.target);
    const registerData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword')
    };

    // Validate form
    if (!this.validateRegisterForm(registerData)) {
      return;
    }

    this.setLoading(true);

    try {
      const response = await this.registerAPI(registerData);
      
      if (response.success) {
        this.showNotification('Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.', 'success');
        
        // Switch to login tab after successful registration
        setTimeout(() => {
          this.switchTab('login');
          document.getElementById('login-email').value = registerData.email;
        }, 2000);
      } else {
        throw new Error(response.message || 'Đăng ký thất bại');
      }
    } catch (error) {
      this.showNotification(error.message, 'error');
    } finally {
      this.setLoading(false);
    }
  }

  validateLoginForm(data) {
    let isValid = true;

    // Email validation
    if (!data.email) {
      this.showFieldError('login-email', 'Vui lòng nhập email');
      isValid = false;
    } else if (!this.isValidEmail(data.email)) {
      this.showFieldError('login-email', 'Email không hợp lệ');
      isValid = false;
    } else {
      this.hideFieldError('login-email');
    }

    // Password validation
    if (!data.password) {
      this.showFieldError('login-password', 'Vui lòng nhập mật khẩu');
      isValid = false;
    } else {
      this.hideFieldError('login-password');
    }

    return isValid;
  }

  validateRegisterForm(data) {
    let isValid = true;

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
      this.showFieldError('register-name', 'Họ tên phải có ít nhất 2 ký tự');
      isValid = false;
    } else {
      this.hideFieldError('register-name');
    }

    // Email validation
    if (!data.email) {
      this.showFieldError('register-email', 'Vui lòng nhập email');
      isValid = false;
    } else if (!this.isValidEmail(data.email)) {
      this.showFieldError('register-email', 'Email không hợp lệ');
      isValid = false;
    } else {
      this.hideFieldError('register-email');
    }

    // Phone validation
    if (!data.phone) {
      this.showFieldError('register-phone', 'Vui lòng nhập số điện thoại');
      isValid = false;
    } else if (!this.isValidPhone(data.phone)) {
      this.showFieldError('register-phone', 'Số điện thoại không hợp lệ');
      isValid = false;
    } else {
      this.hideFieldError('register-phone');
    }

    // Password validation
    if (!data.password) {
      this.showFieldError('register-password', 'Vui lòng nhập mật khẩu');
      isValid = false;
    } else if (data.password.length < 8) {
      this.showFieldError('register-password', 'Mật khẩu phải có ít nhất 8 ký tự');
      isValid = false;
    } else {
      this.hideFieldError('register-password');
    }

    // Confirm password validation
    if (!data.confirmPassword) {
      this.showFieldError('register-confirm-password', 'Vui lòng xác nhận mật khẩu');
      isValid = false;
    } else if (data.password !== data.confirmPassword) {
      this.showFieldError('register-confirm-password', 'Mật khẩu xác nhận không khớp');
      isValid = false;
    } else {
      this.hideFieldError('register-confirm-password');
    }

    return isValid;
  }

  setupRealTimeValidation() {
    // Email validation
    document.getElementById('login-email').addEventListener('blur', (e) => {
      if (e.target.value && !this.isValidEmail(e.target.value)) {
        this.showFieldError('login-email', 'Email không hợp lệ');
      } else {
        this.hideFieldError('login-email');
      }
    });

    document.getElementById('register-email').addEventListener('blur', (e) => {
      if (e.target.value && !this.isValidEmail(e.target.value)) {
        this.showFieldError('register-email', 'Email không hợp lệ');
      } else {
        this.hideFieldError('register-email');
      }
    });

    // Phone validation
    document.getElementById('register-phone').addEventListener('blur', (e) => {
      if (e.target.value && !this.isValidPhone(e.target.value)) {
        this.showFieldError('register-phone', 'Số điện thoại không hợp lệ');
      } else {
        this.hideFieldError('register-phone');
      }
    });

    // Password confirmation
    document.getElementById('register-confirm-password').addEventListener('input', (e) => {
      const password = document.getElementById('register-password').value;
      if (e.target.value && e.target.value !== password) {
        this.showFieldError('register-confirm-password', 'Mật khẩu xác nhận không khớp');
      } else {
        this.hideFieldError('register-confirm-password');
      }
    });
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  }

  showFieldError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.remove('hidden');
    }
    
    if (inputElement) {
      inputElement.classList.add('border-red-500', 'focus:ring-red-500');
      inputElement.classList.remove('border-gray-300', 'focus:ring-blue-500');
    }
  }

  hideFieldError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement) {
      errorElement.classList.add('hidden');
    }
    
    if (inputElement) {
      inputElement.classList.remove('border-red-500', 'focus:ring-red-500');
      inputElement.classList.add('border-gray-300', 'focus:ring-blue-500');
    }
  }

  clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => {
      error.classList.add('hidden');
    });
    document.querySelectorAll('input').forEach(input => {
      input.classList.remove('border-red-500', 'focus:ring-red-500');
      input.classList.add('border-gray-300', 'focus:ring-blue-500');
    });
  }

  setLoading(loading) {
    this.isLoading = loading;
    const loadingOverlay = document.getElementById('loading-overlay');
    const submitButtons = document.querySelectorAll('#login-submit, #register-submit');
    
    if (loading) {
      loadingOverlay.classList.remove('hidden');
      submitButtons.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('opacity-50', 'cursor-not-allowed');
      });
    } else {
      loadingOverlay.classList.add('hidden');
      submitButtons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
      });
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 max-w-sm`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }

  // API Methods
  async loginAPI(loginData) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Đăng nhập thất bại');
      }
      
      return data;
    } catch (error) {
      // Mock response for development
      console.log('Login attempt:', loginData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      if (loginData.email === 'admin@bookshop.com' && loginData.password === 'password') {
        return {
          success: true,
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: 1,
            name: 'Admin User',
            email: loginData.email,
            role: 'admin'
          }
        };
      }
      
      throw new Error('Email hoặc mật khẩu không chính xác');
    }
  }

  async registerAPI(registerData) {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          phone: registerData.phone,
          password: registerData.password
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Đăng ký thất bại');
      }
      
      return data;
    } catch (error) {
      // Mock response for development
      console.log('Register attempt:', registerData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check for duplicate email (mock)
      if (registerData.email === 'admin@bookshop.com') {
        throw new Error('Email này đã được sử dụng');
      }
      
      // Mock successful registration
      return {
        success: true,
        message: 'Đăng ký thành công',
        user: {
          id: Date.now(),
          name: registerData.name,
          email: registerData.email,
          phone: registerData.phone
        }
      };
    }
  }

  // Utility methods
  initValidation() {
    // Additional validation setup can go here
  }
}

// Initialize auth when page loads
document.addEventListener('DOMContentLoaded', () => {
  window.auth = new Auth();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Auth;
}
