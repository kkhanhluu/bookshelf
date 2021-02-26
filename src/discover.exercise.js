/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'

import './bootstrap'
import Tooltip from '@reach/tooltip'
import {FaSearch, FaTimes} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import {client} from './utils/api-client'
import * as colors from './styles/colors'

function DiscoverBooksScreen() {
  const [status, setStatus] = React.useState('idle')
  const [data, setData] = React.useState()
  const [query, setQuery] = React.useState()
  const [queried, setQueried] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!queried) {
      return
    }
    setStatus('loading')
    client(`books?query=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(res => {
        setStatus('success')
        setData(res)
      })
      .catch(err => {
        setError(err)
        setStatus('error')
      })
  }, [query, queried])

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'
  const isError = status === 'error'

  function handleSearchSubmit(event) {
    event.preventDefault()
    setQuery(event.target.elements.search.value)
    setQueried(true)
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : isError ? (
                <FaTimes aria-label="times" css={{color: `${colors.danger}`}} />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>

      {isError ? (
        <div css={{color: colors.danger}}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}

export {DiscoverBooksScreen}
