import React, { useState } from 'react';

interface RegisterProps {
  onRegister?: (email: string, password: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }
    setError('');
    if (onRegister) onRegister(email, password);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg flex w-[500px] overflow-hidden">
        <form className="flex-1 p-8" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-6">Tạo tài khoản mới</h2>
          <div className="mb-4">
            <input
              type="email"
              placeholder="abc@email.com"
              className="w-full border rounded px-4 py-2 focus:outline-blue-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mật khẩu"
              className="w-full border rounded px-4 py-2 focus:outline-blue-400"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="button" className="absolute right-3 top-3 text-xs text-gray-500" onClick={() => setShowPassword(v => !v)}>
              {showPassword ? 'Ẩn' : 'Hiện'}
            </button>
          </div>
          <div className="mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Xác nhận mật khẩu"
              className="w-full border rounded px-4 py-2 focus:outline-blue-400"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <button type="submit" className="w-full bg-red-500 text-white font-bold py-2 rounded mt-2">Tạo tài khoản</button>
          <div className="flex justify-between mt-4 text-sm">
            <a href="#" className="text-blue-500">Đã có tài khoản? Đăng nhập</a>
          </div>
        </form>
        <div className="flex-1 bg-blue-50 flex flex-col items-center justify-center p-8">
          <img src="https://salt.tikicdn.com/ts/upload/94/3b/8a/7c6e3b7e6e3e3e3e3e3e.png" alt="Tiki mascot" className="w-24 mb-4" />
          <div className="text-blue-600 font-semibold text-center">Mua sắm tại Tiki<br />Siêu ưu đãi mỗi ngày</div>
        </div>
      </div>
    </div>
  );
};

export default Register;
