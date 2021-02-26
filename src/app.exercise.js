/** @jsx jsx */
import {jsx} from '@emotion/core'
import * as React from 'react'

import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {client} from 'utils/api-client'
import {useAsync} from 'utils/hooks'
import * as colors from 'styles/colors'
import {FullPageSpinner} from 'components/lib'

async function getUser() {
  let user = null
  const token = await auth.getToken()
  if (token) {
    user = await client('me', {token})
  }
  return user.user
}

function App() {
  const {
    data: user,
    error,
    isIdle,
    isLoading,
    isSuccess,
    isError,
    run,
    setData: setUser,
  } = useAsync()

  React.useEffect(() => {
    run(getUser())
  }, [run])

  const login = form => auth.login(form).then(u => setUser(u))
  const register = form => auth.register(form).then(u => setUser(u))
  const logout = () => auth.logout().then(() => setUser(null))

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return (
      <div>
        <p>Uh oh... There's a problem. Try refereshing the app</p>
        <pre>{error.message}</pre>
      </div>
    )
  }

  if (isSuccess) {
    return user ? (
      <AuthenticatedApp user={user} logout={logout} />
    ) : (
      <UnauthenticatedApp register={register} login={login} />
    )
  }
}

export {App}
