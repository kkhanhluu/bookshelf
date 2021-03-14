import bookPlaceholderSvg from 'assets/book-placeholder.svg'
import {useAuth} from 'context/auth-context'
import React from 'react'
import {useQuery, useQueryClient} from 'react-query'
import {client} from './api-client'

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

const bookQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
}

function useBookSearch(query) {
  const {user} = useAuth()
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['bookSearch', {query}],
    queryFn: () =>
      client(`books?query=${encodeURIComponent(query)}`, {
        token: user.token,
      }).then(data => data.books),
    config: {
      onSuccess(books) {
        for (const book of books) {
          queryClient.setQueryData(
            ['book', {bookId: book.id}],
            book,
            bookQueryConfig,
          )
        }
      },
    },
  })
  return {...result, books: result.data ?? loadingBooks}
}

function useBook(bookId) {
  const {user} = useAuth()
  const {data} = useQuery({
    queryKey: ['book', {bookId}],
    queryFn: () =>
      client(`books/${bookId}`, {token: user.token}).then(data => data.book),
  })
  return data ?? loadingBook
}

function useRefetchBookSearchQuery() {
  const queryClient = useQueryClient()
  const {user} = useAuth()
  return React.useCallback(
    async function refetchBookSearchQuery() {
      queryClient.removeQueries('bookSearch')
      await queryClient.prefetchQuery({
        queryKey: [''],
        queryFn: () =>
          client(`books?query=`, {
            token: user.token,
          }).then(data => data.books),
        config: {
          onSuccess(books) {
            for (const book of books) {
              queryClient.setQueryData(
                ['book', {bookId: book.id}],
                book,
                bookQueryConfig,
              )
            }
          },
        },
      })
    },
    [queryClient, user],
  )
}

export {useBook, useBookSearch, useRefetchBookSearchQuery}
