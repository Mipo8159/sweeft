import classNames from 'classnames'
import {useAppSelector} from 'hooks/redux'
import React from 'react'
import {useLocation} from 'react-router-dom'
import {RouteNames} from 'router'
import Navbar from './Navbar'

const MainLayout: React.FC<{
  children: React.ReactNode
}> = ({children}) => {
  const location = useLocation()
  const {layer} = useAppSelector((state) => state.popup)

  const authRoutes: string[] = [RouteNames.LOGIN, RouteNames.REGISTER]
  const authRoute = authRoutes.includes(location.pathname)

  return (
    <div className="container">
      <div
        className={classNames(
          'bg-gray-900 opacity-40 absolute top-0 left-0 right-0 bottom-0 duration-200',
          {hidden: !layer}
        )}
      />

      {!authRoute && <Navbar />}

      {authRoute ? (
        <div>{children}</div>
      ) : (
        <div className="flex">
          <div
            className={`mt-10 flex flex-col justify-between shadow-md border border-gray-100 mx-auto w-full rounded-md`}
          >
            <div className="p-10">{children}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MainLayout
