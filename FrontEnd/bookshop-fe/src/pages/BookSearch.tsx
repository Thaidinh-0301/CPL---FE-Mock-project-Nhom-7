import React, { useState, useMemo } from 'react';
import BookList from '../components/BookList';
import { Book } from '../types/book';

// Giả lập dữ liệu sách (sau này thay bằng API)
const booksData: Book[] = [
  {
    id: '1',
    title: 'React for Beginners',
    author: 'John Doe',
    images: ['https://picsum.photos/200/300?random=1'],
    price: 120000,
    saleOffPrice: 99000,
    description: 'Learn React from scratch.',
    category: 'Programming',
    rating: 4.5,
    sold: 120,
  },
  // ... thêm nhiều sách khác
];

const categories = ['All', 'Programming', 'Novel', 'Children', 'Business'];

const BookSearch: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('sold');

  // Lọc và sắp xếp
  const filteredBooks = useMemo(() => {
    let filtered = booksData.filter(
      (b) =>
        (category === 'All' || b.category === category) &&
        (b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.description.toLowerCase().includes(search.toLowerCase()))
    );
    if (sort === 'sold') {
      filtered = filtered.sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0));
    } else if (sort === 'rating') {
      filtered = filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }
    return filtered;
  }, [search, category, sort]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Tìm kiếm & Lọc Sách</h2>
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, mô tả..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="sold">Bán chạy nhất</option>
          <option value="rating">Rate cao nhất</option>
        </select>
      </div>
      <BookList books={filteredBooks} />
    </div>
  );
};

export default BookSearch;