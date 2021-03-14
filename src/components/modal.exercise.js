import React from 'react'
import {Dialog} from './lib'
import VisuallyHidden from '@reach/visually-hidden'
import {CircleButton} from './components/lib'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

const ModalContext = React.createContext()

function Modal({children}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const value = {isOpen, setIsOpen}

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

function ModalDismissButton({children}) {
  const {setIsOpen} = React.useContext(ModalContext)
  return React.cloneElement(children, {
    onClick: callAll(() => setIsOpen(false), children.props.onClick),
  })
}

function ModalOpenButton({children}) {
  const {setIsOpen} = React.useContext(ModalContext)
  return React.cloneElement(children, {
    onClick: callAll(() => setIsOpen(true), children.props.onClick),
  })
}

function ModalContentsBase({children, ...props}) {
  const {isOpen, setIsOpen} = React.useContext(ModalContext)
  return (
    <Dialog isOpen={isOpen} onDismiss={setIsOpen} {...props}>
      {children}
    </Dialog>
  )
}

function ModalContents({children, ...props}) {
  const {isOpen, setIsOpen} = React.useContext(ModalContext)
  return (
    <Dialog isOpen={isOpen} onDismiss={setIsOpen} {...props}>
      <ModalDismissButton>
        <CircleButton>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </CircleButton>
      </ModalDismissButton>
      <h3 css={{textAlign: 'center', fontSize: '2em'}}>Login</h3>
      {children}
    </Dialog>
  )
}

export {Modal, ModalContext, ModalDismissButton, ModalOpenButton, ModalContents}
