import {useQuery, useMutation, useQueryClient} from 'react-query'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'
import {client} from 'utils/api-client'

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
}

const loadingBooks = Array.from({length: 10}, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}))

export function useBook(bookId, user) {
  const bookQuery = useQuery(['book', bookId], () =>
    client(`books/${bookId}`, {token: user.token, method: 'GET'}).then(
      res => res.book,
    ),
  )
  return bookQuery.data ?? loadingBook
}

export function useBookSearch(query, user) {
  const result = useQuery(['bookSearch', query], () =>
    client(`books?query=${encodeURIComponent(query)}`, {
      token: user.token,
      method: 'GET',
    }).then(data => data.books),
  )

  return {...result, books: result.data ?? loadingBooks}
}
