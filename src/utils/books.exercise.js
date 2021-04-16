import { useQuery } from 'react-query';
import bookPlaceholderSvg from '../assets/book-placeholder.svg';
import { client } from './api-client.exercise';

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
};

const loadingBooks = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}));

function useBookSearch(query, user) {
  const result = useQuery({
    queryKey: ['bookSearch', { query }],
    queryFn: () =>
      client(`books?query=${encodeURIComponent(query)}`, {
        token: user.token,
      }).then(data => data.books),
  });

  return { ...result, books: result.data ?? loadingBooks };
}

function useBook(bookId, user) {
  const { data } = useQuery({
    queryKey: ['book', { bookId }],
    queryFn: () =>
      client(`books/${bookId}`, { token: user.token }).then(data => data.book),
  });

  return data ?? loadingBook;
}

export { useBookSearch, useBook };
