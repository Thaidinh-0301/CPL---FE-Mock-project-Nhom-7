export interface AdminUser {
  id: string;
  role: 'admin' | 'user';
  username: string;
}