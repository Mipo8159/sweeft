import {useAppDispatch, useAppSelector} from 'hooks/redux'
import {FC, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {findContact} from 'store/contact/contact.reducer'
import {FaPhone, FaArrowLeft} from 'react-icons/fa'
import Toast from 'components/popup/Toast'
import {openToast} from 'store/popup/popup.reducer'
import Loader from 'components/misc/Loader'

const Contact: FC = () => {
  const params = useParams()
  const navigate = useNavigate()

  const {contact} = useAppSelector((state) => state.contact)
  const {isLoading, error, message} = useAppSelector((state) => state.call)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(findContact(Number(params.phone)))
  }, []) // eslint-disable-line

  if (isLoading) {
    return <Loader />
  }
  return (
    <div>
      {contact && (
        <>
          <Toast
            text="Proceed to call"
            phone={contact.phone}
            name={contact.name}
            call={0}
          />

          <div className="relative flex flex-col items-center justify-center">
            <div
              onClick={() => navigate('/')}
              className="absolute left-0 top-0 flex items-center justify-center border bg-yellow-400 p-2 px-3 hover:bg-yellow-500 font-bold uppercase cursor-pointer"
            >
              <FaArrowLeft className="mr-2" /> Back to list
            </div>

            <h1 className="text-lg font-bold uppercase mr-5 mb-5">
              SELECTED CONTACT
            </h1>

            <div className="flex items-center mb-5">
              <div className="flex mr-5">
                <span className="font-bold italic mr-2">
                  contact name:
                </span>

                <h3>{contact?.name}</h3>
              </div>

              <div className="flex">
                <span className="font-bold italic mr-2">
                  phone number:
                </span>

                <h3>{contact?.phone}</h3>
              </div>
            </div>

            <div className="flex items-center border p-3 px-6 mb-10">
              <span className="font-bold italic mr-3">
                Call to {contact?.name}
              </span>

              <div
                onClick={(e) => {
                  e.stopPropagation()
                  dispatch(openToast(Number(contact.phone)))
                }}
                className="h-9 cursor-pointer w-9 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center"
              >
                <FaPhone />
              </div>
            </div>
          </div>
        </>
      )}

      {error && <div className="bg-red-200 text-center p-3">{error}</div>}
      {message && (
        <div className="bg-green-200 text-center p-3">{message}</div>
      )}
    </div>
  )
}

export default Contact
