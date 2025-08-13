import React from 'react';
import { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => (
  <div className="bg-white rounded shadow hover:shadow-lg transition cursor-pointer" onClick={onClick}>
    <img src={book.images[0]} alt={book.title} className="w-full h-48 object-cover rounded-t" />
    <div className="p-4">
      <h3 className="font-semibold text-lg">{book.title}</h3>
      <p className="text-sm text-gray-600">{book.author}</p>
      <div className="flex items-center mt-2">
        {book.saleOffPrice ? (
          <>
            <span className="text-red-500 font-bold mr-2">{book.saleOffPrice}₫</span>
            <span className="line-through text-gray-400">{book.price}₫</span>
          </>
        ) : (
          <span className="text-blue-600 font-bold">{book.price}₫</span>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-2">{book.description.slice(0, 60)}...</p>
      {book.rating && (
        <div className="mt-2 text-yellow-500">⭐ {book.rating}</div>
      )}
      {book.sold && (
        <div className="mt-1 text-xs text-gray-400">Đã bán: {book.sold}</div>
      )}
    </div>
  </div>
);

export default BookCard;