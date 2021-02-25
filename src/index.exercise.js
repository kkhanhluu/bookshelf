import React from 'react'
import ReactDOM from 'react-dom'
import Dialog from '@reach/dialog'
import '@reach/dialog/styles.css'

import {Logo} from './components/logo'
import LoginForm from './components/LoginForm'

function App() {
  const [openModal, setOpenModal] = React.useState('none')

  function handleClick(mode) {
    setOpenModal(mode)
  }

  function handleClose() {
    setOpenModal('none')
  }

  return (
    <div>
      <Logo />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => handleClick('login')}>login</button>
      </div>
      <div>
        <button onClick={() => handleClick('register')}>register</button>
      </div>
      <Dialog aria-label="Login form" isOpen={openModal === 'login'}>
        <button onClick={handleClose} className="close-button">
          <span arial-hidden>close</span>
        </button>
        <LoginForm title="login" />
      </Dialog>
      <Dialog aria-label="Login form" isOpen={openModal === 'register'}>
        <button onClick={handleClose} className="close-button">
          <span arial-hidden>close</span>
        </button>
        <LoginForm title="register" />
      </Dialog>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
