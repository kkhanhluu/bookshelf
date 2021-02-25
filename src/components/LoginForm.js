import React from 'react'

export default function LoginForm({title}) {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleSubmit() {
    console.log({username, password})
  }
  return (
    <div>
      <h4>{title}</h4>
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            type="text"
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></input>
        </div>
        <button onClick={handleSubmit} type="button">
          {title}
        </button>
      </form>
    </div>
  )
}
