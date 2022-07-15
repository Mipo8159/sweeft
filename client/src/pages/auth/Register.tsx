import {FC, FormEvent, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {Helmet} from 'react-helmet-async'
import classNames from 'classnames'
import {RouteNames} from 'router'
import AuthInput from 'components/auth/AuthInput'
import {register} from 'store/auth/auth.action'
import {useAppDispatch, useAppSelector} from 'hooks/redux'
import {resetAvailable, setErrors} from 'store/auth/auth.reducer'

const Register: FC = () => {
  const {isSubmitting, error, redirect} = useAppSelector(
    (state) => state.auth
  )
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [cf_password, setCf_password] = useState<string>('')
  const [matchError, setMatchError] = useState<string>()

  // SUBMIT
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMatchError('')
    setUsername('')
    setPassword('')
    setCf_password('')

    if (cf_password !== password) {
      return setMatchError('Passwords do not match')
    }
    const authDto = {
      username,
      password,
    }

    dispatch(register({authDto}))

    dispatch(resetAvailable())
  }

  // REDIRECTS TO LOGIN
  useEffect(() => {
    if (redirect) {
      navigate('/login')
    }
  }, [redirect]) // eslint-disable-line

  return (
    <main className="m-5 sm:m-10 flex flex-col justify-center items-center h-[90vh]">
      <Helmet>
        <title>Register</title>
      </Helmet>

      {/* ERRORS */}
      {matchError && (
        <div className="z-10 flex justify-center py-2 my-4 mt-3 text-white bg-red-500 2xl:ml-4 w-81">
          {matchError}
        </div>
      )}

      {error?.message && (
        <div className="z-10 flex justify-center py-2 my-4 mt-3 text-white bg-red-500 2xl:ml-4 w-81">
          {error.message}
        </div>
      )}

      {/* FORM */}
      <div className="z-10 bg-white font-comfortaa text-sm py-5 px-4 shadow-md mx-auto rounded-xl w-[300px] sm:w-[375px]">
        <h1 className="font-bold text-center uppercase text-md font-comfortaa mb-4">
          Registration form
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
            keyup={setMatchError}
            error={error?.username}
            auth={true}
          />

          <AuthInput
            classname="relative mb-3 w-full"
            name="password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Password"
            keyup={setMatchError}
            error={error?.password}
            auth={false}
          />

          <AuthInput
            classname="relative mb-3 w-full"
            name="cf_password"
            type="password"
            value={cf_password}
            onChange={setCf_password}
            placeholder="Confirm Password"
            keyup={setMatchError}
            error={matchError}
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
          Already a Sweefter?
          <span
            onClick={() => {
              navigate(RouteNames.LOGIN)
              dispatch(setErrors())
            }}
            className="ml-1 font-bold cursor-pointer text-red hover:text-red-600"
          >
            Log in
          </span>
        </small>
      </div>
    </main>
  )
}

export default Register
