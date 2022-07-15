import classNames from 'classnames'
import {useAppDispatch, useAppSelector} from 'hooks/redux'
import {FC} from 'react'
import {createCall, removeCall} from 'store/call/call.action'
import {removeContact} from 'store/contact/contact.reducer'
import {closeToast} from 'store/popup/popup.reducer'

interface ToastProps {
  text: string
  name: string
  phone: number
  call: number
}
const Toast: FC<ToastProps> = ({text, phone, name, call}) => {
  const {toast} = useAppSelector((state) => state.popup)
  const {user} = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={classNames(
        'absolute bg-white z-20 border w-[400px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] scale-0 duration-300',
        {'scale-100': toast === phone}
      )}
    >
      {user && (
        <div className="relative p-8">
          {text} {name}: {phone} ?
          <div className="flex mt-5">
            <button
              onClick={() => {
                call === 0
                  ? dispatch(
                      createCall({
                        callDto: {
                          name,
                          phone: String(phone),
                          _id: user!._id,
                        },
                      })
                    )
                  : call === 1
                  ? dispatch(removeContact(Number(phone)))
                  : call === 2
                  ? dispatch(removeCall(String(phone)))
                  : dispatch(() => {})

                dispatch(closeToast())
              }}
              className="bg-green-800 rounded-sm text-white flex-1 hover:bg-green-900 mr-1"
            >
              {text}
            </button>
            <button
              onClick={() => dispatch(closeToast())}
              className="bg-red-800 rounded-sm text-white flex-1 hover:bg-red-900 ml-1 p-1"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default Toast
