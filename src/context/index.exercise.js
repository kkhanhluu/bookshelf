import {AuthProvider} from 'context/auth-context'
import * as React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import {BrowserRouter} from 'react-router-dom'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {useErrorBoundary: true},
    queries: {useErrorBoundary: true, refetchOnWindowFocus: false},
  },
})

function AppProviders({children}) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export {AppProviders}
