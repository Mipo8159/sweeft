import {Link, useLocation} from 'react-router-dom'
import {FaBell} from 'react-icons/fa'
import {RouteNames} from 'router'
import {useAppDispatch, useAppSelector} from 'hooks/redux'
import {logout} from 'store/auth/auth.action'
import {useEffect} from 'react'
import {findCalls} from 'store/call/call.action'

const Navbar: React.FC = () => {
  const {calls} = useAppSelector((state) => state.call)
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(findCalls())
  }, []) // eslint-disable-line

  const onLogout = () => {
    dispatch(logout())
  }

  const isActive = (link: string) => {
    if (link === location.pathname) {
      return 'active'
    }
    return ''
  }

  return (
    <nav className="flex items-center justify-between mt-4 h-14 px-6 bg-white border border-gray-50 rounded-md shadow-md">
      {/* Logo */}
      <div className="flex items-center cursor-pointer">
        <span className="text-xl font-semibold">
          <Link to={'/'}>
            <span>SWEEFT</span>
          </Link>
        </span>
      </div>

      {/* Buttons */}
      <div className="flex">
        <div className="flex items-center">
          {/* GO TO CALLS */}
          <Link to={RouteNames.CALL}>
            <div
              className={`py-1 flex justify-center items-center mr-4 leading-5 cursor-pointer w-9 black button morph ${isActive(
                RouteNames.CALL
              )}`}
            >
              <div className="relative">
                <FaBell className="text-lg" />
                <div className="absolute right-[-15px] top-[-15px] text-white rounded-full bg-red h-5 w-5">
                  {calls.length}
                </div>
              </div>
            </div>
          </Link>

          <button
            onClick={onLogout}
            className="w-20 py-1 mr-4 leading-5 cursor-pointer black lg:w-32 button morph-red"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
