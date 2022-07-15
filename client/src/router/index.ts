import Login from 'pages/auth/Login'
import Register from 'pages/auth/Register'
import Call from 'pages/Call'
import Main from 'pages/Main'
import Contact from 'pages/Contact'

export interface RouteInterface {
  path: string
  element: React.ComponentType
}

export enum RouteNames {
  LOGIN = '/login',
  REGISTER = '/register',

  NAVIGATE = '*',
  MAIN = '/',
  USER = '/contact/:phone',
  CALL = '/calls',
}

export const privateRoutes: RouteInterface[] = [
  {path: RouteNames.MAIN, element: Main},
  {path: RouteNames.CALL, element: Call},
  {path: RouteNames.USER, element: Contact},
]

export const publicRoutes: RouteInterface[] = [
  {path: RouteNames.LOGIN, element: Login},
  {path: RouteNames.REGISTER, element: Register},
]
