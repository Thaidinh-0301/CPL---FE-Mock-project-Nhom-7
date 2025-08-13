import React, { useState, useEffect } from 'react'
import { useAuthStore, useUIStore } from '../store'

const XIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
  </svg>
)

const UserIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
  </svg>
)

const EyeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
  </svg>
)

const EyeOffIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
  </svg>
)

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
)

// Tiki-style Input Field Component
const TikiInputField = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  error, 
  placeholder,
  required = false 
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const inputType = type === 'password' && showPassword ? 'text' : type

  return (
    <div className="mb-4">
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
            error 
              ? 'border-red-500 focus:border-red-500' 
              : isFocused || value
                ? 'border-blue-500 focus:border-blue-500'
                : 'border-gray-200 focus:border-blue-500'
          }`}
          required={required}
        />
        
        {/* Floating Label */}
        <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isFocused || value
            ? 'top-2 text-xs text-blue-600 font-medium'
            : 'top-1/2 transform -translate-y-1/2 text-gray-500'
        }`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

// Tiki-style Login Form Component
const TikiLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  
  const { login, isLoading, error } = useAuthStore()
  const { closeAuth, addNotification, setAuthMode } = useUIStore()

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không đúng định dạng'
    }
    
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      addNotification({
        type: 'success',
        message: 'Đăng nhập thành công!'
      })
      closeAuth()
      setFormData({ email: '', password: '' })
      setErrors({})
    }
  }

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}

      <TikiInputField
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
        error={errors.email}
        placeholder="Nhập email"
        required
      />

      <TikiInputField
        label="Mật khẩu"
        type="password"
        value={formData.password}
        onChange={handleChange('password')}
        error={errors.password}
        placeholder="Nhập mật khẩu"
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            <span className="ml-2">Đang đăng nhập...</span>
          </>
        ) : (
          'Đăng nhập'
        )}
      </button>

      <div className="text-center pt-4">
        <p className="text-gray-600 text-sm">
          Chưa có tài khoản BookShop?{' '}
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Tạo tài khoản
          </button>
        </p>
      </div>

      {/* Demo credentials */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800 mb-2 font-medium flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Tài khoản demo:
        </p>
        <p className="text-sm text-blue-700">Email: test@example.com</p>
        <p className="text-sm text-blue-700">Password: password</p>
      </div>
    </form>
  )
}

// Tiki-style Register Form Component
const TikiRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  
  const { register, isLoading } = useAuthStore()
  const { closeAuth, addNotification, setAuthMode } = useUIStore()

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name) {
      newErrors.name = 'Vui lòng nhập họ tên'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Họ tên phải có ít nhất 2 ký tự'
    }
    
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không đúng định dạng'
    }
    
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: '' // Optional field, can be added later
    })
    
    if (result.success) {
      addNotification({
        type: 'success',
        message: result.message || 'Đăng ký thành công!'
      })
      
      // Switch to login mode after successful registration
      setTimeout(() => {
        setAuthMode('login')
      }, 2000)
      
      setFormData({ name: '', email: '', password: '', confirmPassword: '' })
      setErrors({})
    } else if (result.error) {
      addNotification({
        type: 'error',
        message: result.error
      })
    }
  }
  }

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TikiInputField
        label="Họ và tên"
        value={formData.name}
        onChange={handleChange('name')}
        error={errors.name}
        placeholder="Nhập họ và tên"
        required
      />

      <TikiInputField
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
        error={errors.email}
        placeholder="Nhập địa chỉ email"
        required
      />

      <TikiInputField
        label="Mật khẩu"
        type="password"
        value={formData.password}
        onChange={handleChange('password')}
        error={errors.password}
        placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
        required
      />

      <TikiInputField
        label="Xác nhận mật khẩu"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange('confirmPassword')}
        error={errors.confirmPassword}
        placeholder="Nhập lại mật khẩu"
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            <span className="ml-2">Đang tạo tài khoản...</span>
          </>
        ) : (
          'Tạo tài khoản'
        )}
      </button>

      <div className="text-center pt-4">
        <p className="text-gray-600 text-sm">
          Đã có tài khoản BookShop?{' '}
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Đăng nhập
          </button>
        </p>
      </div>

      {/* Terms */}
      <div className="pt-4 text-xs text-gray-500 text-center">
        Bằng việc đăng ký, bạn đã đồng ý với{' '}
        <a href="#" className="text-blue-600 hover:underline">Điều khoản sử dụng</a>
        {' '}và{' '}
        <a href="#" className="text-blue-600 hover:underline">Chính sách bảo mật</a>
        {' '}của BookShop
      </div>
    </form>
  )
}

// Login Form Component
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  
  const { login, isLoading, error } = useAuthStore()
  const { closeAuth, addNotification, setAuthMode } = useUIStore()

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }
    
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      addNotification({
        type: 'success',
        message: 'Đăng nhập thành công!'
      })
      closeAuth()
      setFormData({ email: '', password: '' })
      setErrors({})
    }
  }

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Đăng nhập</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <InputField
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
        error={errors.email}
        placeholder="Nhập email của bạn"
        required
      />

      <InputField
        label="Mật khẩu"
        type="password"
        value={formData.password}
        onChange={handleChange('password')}
        error={errors.password}
        placeholder="Nhập mật khẩu"
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
      >
        {isLoading ? <LoadingSpinner /> : 'Đăng nhập'}
      </button>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Chưa có tài khoản?{' '}
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Đăng ký ngay
          </button>
        </p>
      </div>

      {/* Demo credentials */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-2 font-medium">Demo credentials:</p>
        <p className="text-sm text-gray-500">Email: test@example.com</p>
        <p className="text-sm text-gray-500">Password: password</p>
      </div>
    </form>
  )
}

// Register Form Component
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  
  const { register, isLoading } = useAuthStore()
  const { closeAuth, addNotification, setAuthMode } = useUIStore()

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name) {
      newErrors.name = 'Họ tên là bắt buộc'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Họ tên phải có ít nhất 2 ký tự'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }
    
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const result = await register(formData.name, formData.email, formData.password)
    
    if (result.success) {
      addNotification({
        type: 'success',
        message: 'Đăng ký thành công! Chào mừng bạn đến với BookShop!'
      })
      closeAuth()
      setFormData({ name: '', email: '', password: '', confirmPassword: '' })
      setErrors({})
    }
  }

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Đăng ký</h2>

      <InputField
        label="Họ và tên"
        value={formData.name}
        onChange={handleChange('name')}
        error={errors.name}
        placeholder="Nhập họ và tên"
        required
      />

      <InputField
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
        error={errors.email}
        placeholder="Nhập email của bạn"
        required
      />

      <InputField
        label="Mật khẩu"
        type="password"
        value={formData.password}
        onChange={handleChange('password')}
        error={errors.password}
        placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
        required
      />

      <InputField
        label="Xác nhận mật khẩu"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange('confirmPassword')}
        error={errors.confirmPassword}
        placeholder="Nhập lại mật khẩu"
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
      >
        {isLoading ? <LoadingSpinner /> : 'Đăng ký'}
      </button>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Đã có tài khoản?{' '}
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </form>
  )
}

// Input Field Component  
const InputField = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  error, 
  placeholder,
  required = false 
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const inputType = type === 'password' && showPassword ? 'text' : type

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
          }`}
          required={required}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

// Auth Button Component
export const AuthButton = () => {
  const { user, isAuthenticated, logout } = useAuthStore()
  const { openAuth } = useUIStore()

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-gray-700">{user.name}</span>
        </div>
        <button
          onClick={logout}
          className="text-sm text-red-600 hover:text-red-800 transition-colors"
        >
          Đăng xuất
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => openAuth('login')}
      className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
    >
      Đăng nhập
    </button>
  )
}

// Main Auth Modal Component - Tiki Style
export const AuthModal = () => {
  const { isAuthOpen, authMode, closeAuth } = useUIStore()
  const { clearError } = useAuthStore()

  useEffect(() => {
    if (isAuthOpen) {
      clearError()
    }
  }, [isAuthOpen, clearError])

  if (!isAuthOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeAuth}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
          {/* Close Button */}
          <button
            onClick={closeAuth}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <XIcon />
          </button>

          {/* Header */}
          <div className="text-center pt-8 pb-4 px-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">B</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {authMode === 'login' ? 'Xin chào,' : 'Đăng ký tài khoản'}
            </h2>
            <p className="text-gray-600 text-sm">
              {authMode === 'login' 
                ? 'Đăng nhập hoặc tạo tài khoản'
                : 'Tạo tài khoản BookShop để nhận nhiều ưu đãi'
              }
            </p>
          </div>

          {/* Tab Switcher - Tiki Style */}
          <div className="flex border-b border-gray-200 mx-8">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-3 px-4 text-center border-b-2 font-medium text-sm transition-colors ${
                authMode === 'login'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-3 px-4 text-center border-b-2 font-medium text-sm transition-colors ${
                authMode === 'register'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Đăng ký
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-8 pt-6">
            {authMode === 'login' ? <TikiLoginForm /> : <TikiRegisterForm />}
          </div>
        </div>
      </div>
    </div>
  )
}

// Auth Page Component (for standalone auth page)
export const AuthPage = () => {
  const { authMode, setAuthMode } = useUIStore()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <UserIcon className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="mt-6 text-center text-3xl font-bold text-gray-900">
          BookShop
        </h1>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Tab Switcher */}
          <div className="flex mb-6">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 px-4 text-center border-b-2 font-medium text-sm transition-colors ${
                authMode === 'login'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2 px-4 text-center border-b-2 font-medium text-sm transition-colors ${
                authMode === 'register'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Đăng ký
            </button>
          </div>

          {authMode === 'login' ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  )
}
