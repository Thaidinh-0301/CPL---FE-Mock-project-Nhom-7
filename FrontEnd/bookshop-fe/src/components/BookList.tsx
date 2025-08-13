import React from 'react';
import BookCard from './BookCard';
import { Book } from '../types/book';

interface BookListProps {
  books: Book[];
  onBookClick?: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onBookClick }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {books.map((book) => (
      <BookCard key={book.id} book={book} onClick={() => onBookClick?.(book)} />
    ))}
  </div>
);

export default BookList;