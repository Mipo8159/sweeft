import {useAppSelector} from 'hooks/redux'
import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {
  privateRoutes,
  publicRoutes,
  RouteInterface,
  RouteNames,
} from 'router'
import Loader from './Loader'

const AppRouter: React.FC = () => {
  const {isAuth, isSubmitting} = useAppSelector((state) => state.auth)

  if (isSubmitting) {
    return <Loader />
  }

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route: RouteInterface) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.element />}
        />
      ))}
      <Route
        path={RouteNames.NAVIGATE}
        element={<Navigate replace to={RouteNames.MAIN} />}
      />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route: RouteInterface) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.element />}
        />
      ))}
      <Route
        path={RouteNames.NAVIGATE}
        element={<Navigate replace to={RouteNames.REGISTER} />}
      />
    </Routes>
  )
}

export default AppRouter
