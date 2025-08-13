# BookShop - E-commerce Platform for Books

Dự án website sàn thương mại điện tử bán sách được phát triển bởi **CPL FE Mock Project Nhóm 7**.

## 🎯 Mục tiêu Project

Xây dựng một website sàn thương mại điện tử chuyên về sách với các chức năng cơ bản:
- Quản lý giỏ hàng (Cart Component)
- Đăng nhập/Đăng ký người dùng (Auth Component)
- Giao diện responsive, thân thiện với người dùng

## 🛠️ Công nghệ sử dụng

- **HTML5** - Cấu trúc trang web
- **CSS3** với **TailwindCSS** - Styling và layout
- **JavaScript ES6+** - Logic xử lý frontend
- **Git** - Quản lý phiên bản

## 📁 Cấu trúc Project

```
bookshop-fe/
├── dist/
│   └── output.css           # CSS được build từ Tailwind
├── src/
│   ├── components/
│   │   ├── Cart.html        # Component giỏ hàng
│   │   ├── cart.js          # Logic xử lý Cart
│   │   ├── Auth.html        # Component đăng nhập/đăng ký
│   │   └── auth.js          # Logic xử lý Auth
│   └── index.css            # Tailwind imports và custom styles
├── index.html               # Trang chủ chính
├── package.json             # Dependencies
├── tailwind.config.js       # Cấu hình Tailwind
└── postcss.config.js        # Cấu hình PostCSS
```

## 🚀 Cách chạy Project

### 1. Cài đặt Dependencies

```bash
npm install
```

### 2. Build CSS với Tailwind

```bash
npm run build:css
```

Hoặc chạy ở chế độ watch để tự động build khi có thay đổi:

```bash
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
```

### 3. Mở trình duyệt

Mở file `index.html` trong trình duyệt để xem demo.

## 📋 Components đã hoàn thành

### 1. Component Cart (Giỏ hàng)

**File:** `src/components/Cart.html` + `src/components/cart.js`

**Chức năng:**
- ✅ Hiển thị danh sách sản phẩm trong giỏ hàng
- ✅ Tăng/giảm số lượng sản phẩm
- ✅ Xóa sản phẩm khỏi giỏ hàng
- ✅ Tính tổng tiền tự động
- ✅ Hiển thị thông báo khi thực hiện thao tác
- ✅ Responsive design

**Cấu trúc Database theo yêu cầu:**
```sql
-- Table Cart
Cart {
  id: integer(10) [PK]
  user_id: integer(10) [FK]
}

-- Table CartItem  
CartItem {
  id: integer(10) [PK]
  cart_id: integer(10) [FK]
  book_id: integer(10) [FK]
  quantity: integer(10)
}
```

**Demo:** Truy cập `src/components/Cart.html`

### 2. Component Login/Register (Phân quyền)

**File:** `src/components/Auth.html` + `src/components/auth.js`

**Chức năng:**
- ✅ Form đăng nhập với validation
- ✅ Form đăng ký tài khoản mới
- ✅ Chuyển đổi giữa Login/Register
- ✅ Validation real-time
- ✅ Hiển thị/ẩn mật khẩu
- ✅ Xử lý lỗi và thông báo
- ✅ Responsive design

**Validation bao gồm:**
- Email format
- Mật khẩu tối thiểu 8 ký tự
- Xác nhận mật khẩu khớp
- Số điện thoại hợp lệ
- Họ tên tối thiểu 2 ký tự

**Demo:** Truy cập `src/components/Auth.html`

## 🎨 Design System

### Colors
- **Primary:** Blue-600 (`#2563EB`)
- **Success:** Green-500 (`#10B981`)
- **Error:** Red-500 (`#EF4444`)
- **Gray:** Gray-50 to Gray-900

### Typography
- **Font:** Inter, system-ui, sans-serif
- **Sizes:** text-sm (14px), text-base (16px), text-lg (18px), text-xl (20px), text-2xl (24px)

### Components
- **Buttons:** Rounded-lg, padding py-2 px-4
- **Cards:** White background, shadow-sm, rounded-lg
- **Inputs:** Border, rounded-md, focus states

## 📱 Responsive Design

Tất cả components đều được thiết kế responsive với:
- **Mobile First:** Tối ưu cho màn hình nhỏ trước
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Layout:** Grid và Flexbox

## 🔧 Tính năng kỹ thuật

### Cart Component
- **State Management:** JavaScript ES6 Classes
- **Local Storage:** Lưu trữ dữ liệu giỏ hàng
- **Event Handling:** Click, input events
- **API Ready:** Sẵn sàng tích hợp với backend

### Auth Component
- **Form Validation:** Real-time validation
- **Security:** Password hiding/showing
- **Error Handling:** User-friendly error messages
- **Token Management:** JWT token storage

## 🔮 Tương lai phát triển

### Phase 2 - Backend Integration
- [ ] Tích hợp API backend
- [ ] Database thực tế
- [ ] Authentication JWT
- [ ] Session management

### Phase 3 - Advanced Features
- [ ] Product catalog
- [ ] Search functionality
- [ ] Order management
- [ ] Payment integration
- [ ] Admin dashboard

### Phase 4 - Performance & SEO
- [ ] Code splitting
- [ ] Lazy loading
- [ ] SEO optimization
- [ ] PWA features

## 👥 Team Members

**CPL FE Mock Project Nhóm 7**
- Thực hiện: Component Cart & Login/Register
- Timeline: 7-11 tháng 8, 2025

## 📞 Support

Nếu có vấn đề gì trong quá trình chạy project, vui lòng:
1. Kiểm tra lại các bước cài đặt
2. Đảm bảo đã chạy `npm run build:css`
3. Kiểm tra console browser để xem lỗi

---

**Happy Coding! 🚀**
