import React from 'react'
import { Route } from 'react-router-dom'

function ProtectedRoute({ component: Component, hasAccess, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (hasAccess) {
          return <Component {...rest} {...props} />
        } else {
          return <p>You are not authorized view this page.</p>
        }
      }}
    />
  )
}

export default ProtectedRoute
