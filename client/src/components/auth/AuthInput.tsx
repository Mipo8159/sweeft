import classNames from 'classnames'
import {useAppDispatch, useAppSelector} from 'hooks/redux'
import {isAvailable} from 'store/auth/auth.action'
import {setErrors} from 'store/auth/auth.reducer'

interface ParticleInputProps {
  classname: string
  type: string
  placeholder: string
  value: string
  name: string
  error: any
  onChange: Function
  keyup?: Function
  auth: boolean
}

const AuthInput: React.FC<ParticleInputProps> = ({
  classname,
  type,
  placeholder,
  value,
  name,
  error,
  onChange,
  keyup,
  auth,
}) => {
  const {available} = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  return (
    <div className={classname}>
      {!error && value === '' && (
        <span
          className="absolute z-10 text-red top-0.5 left-2"
          style={{fontSize: '16px'}}
        >
          *
        </span>
      )}

      <small className="font-medium text-red-500">{error}</small>

      {auth && available === false && (
        <small className="font-medium text-red-500">username taken</small>
      )}

      <input
        name={name}
        value={value}
        onChange={(e) => {
          auth && dispatch(isAvailable(e.target.value))
          onChange(e.target.value)
          keyup && keyup('')
          dispatch(setErrors())
        }}
        type={type}
        placeholder={placeholder}
        className={classNames(
          'w-full p-3 pl-4 py-2.5 transition duration-200 bg-gray-100 border border-gray-200 rounded focus:bg-white hover:bg-white focus:outline-none',
          {'border-red-500': error},
          {'border-red-500': auth && available === false},
          {'border-green-500': auth && available === true}
        )}
      />
    </div>
  )
}

export default AuthInput
