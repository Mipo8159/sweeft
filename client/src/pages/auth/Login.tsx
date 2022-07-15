import {FC, FormEvent, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {Helmet} from 'react-helmet-async'
import classNames from 'classnames'
import {RouteNames} from 'router'
import AuthInput from 'components/auth/AuthInput'
import {resetRedirect, setErrors} from 'store/auth/auth.reducer'
import {login} from 'store/auth/auth.action'
import {useAppDispatch, useAppSelector} from 'hooks/redux'

const Login: FC = () => {
  const navigate = useNavigate()
  const {isSubmitting, error} = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const authDto = {
      username,
      password,
    }
    dispatch(login({authDto}))
  }

  useEffect(() => {
    dispatch(resetRedirect())
  }, []) // eslint-disable-line

  return (
    <main className="m-5 sm:m-10 flex flex-col justify-center items-center h-[90vh]">
      <Helmet>
        <title>Login</title>
      </Helmet>

      {/* ERRORS */}
      {error?.message && (
        <div className="z-10 flex justify-center py-2 my-4 mt-3 text-white bg-red-500 2xl:ml-4 w-81">
          {error.message}
        </div>
      )}

      {/* FORM */}
      <div className="z-10 bg-white font-comfortaa text-sm py-5 px-4 shadow-md mx-auto rounded-xl w-[300px] sm:w-[375px]">
        <h1 className="font-bold text-center uppercase text-md font-comfortaa mb-4">
          Login form
        </h1>

        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <AuthInput
            classname="relative mb-3 w-full"
            name="username"
            type="username"
            value={username}
            onChange={setUsername}
            placeholder="Username"
            error={error?.username}
            auth={false}
          />
          <AuthInput
            classname="relative mb-3 w-full"
            name="password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Password"
            error={error?.password}
            auth={false}
          />

          {/* SUBMIT */}
          <button
            disabled={isSubmitting}
            className={classNames(
              'w-full py-3 mb-2 text-xs font-bold text-white uppercase border rounded focus:outline-none bg-black',
              {'opacity-50': isSubmitting}
            )}
          >
            Submit
          </button>
        </form>

        <small className="z-10 px-2.5 font-bold text-center rounded-md">
          Not a member of Sweeft?
          <span
            onClick={() => {
              navigate(RouteNames.REGISTER)
              dispatch(setErrors())
            }}
            className="ml-1 font-bold cursor-pointer text-red hover:text-red-600"
          >
            Register now
          </span>
        </small>
      </div>
    </main>
  )
}

export default Login
