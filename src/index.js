<<<<<<< HEAD
import {loadDevTools} from './dev-tools/load'
import './bootstrap'
import * as React from 'react'
import ReactDOM from 'react-dom'
import {App} from './app'
import {AppProviders} from './context'

loadDevTools(() => {
  ReactDOM.render(
    <AppProviders>
      <App />
    </AppProviders>,
    document.getElementById('root'),
  )
})
=======
// no final

export * from './index.exercise'

// 💯 create an `AuthProvider` component
// export * from './index.extra-2'

// 💯 colocate global providers
// export * from './index.extra-3'
>>>>>>> main
