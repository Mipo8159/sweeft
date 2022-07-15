import Toast from 'components/popup/Toast'
import {FC, FormEvent, useState} from 'react'
import {ContactInterface} from 'store/contact/types/contact.interface'
import {FaTrash, FaPencilAlt, FaCheck} from 'react-icons/fa'
import {closePopupCreate, openToast} from 'store/popup/popup.reducer'
import {useAppDispatch} from 'hooks/redux'
import {updateContact} from 'store/contact/contact.reducer'
import {useNavigate} from 'react-router-dom'

interface ContactCardProps {
  contact: ContactInterface
}

const ContactCard: FC<ContactCardProps> = ({contact}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [edit, setEdit] = useState<boolean>(false)

  const [name, setName] = useState<string>(contact.name)
  const [phone, setPhone] = useState<number>(contact.phone)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (name === contact.name && phone === contact.phone) {
      return
    }

    if (name !== '' && isNumber(String(phone))) {
      dispatch(
        updateContact({
          number: Number(contact.phone),
          data: {name, phone: Number(phone)},
        })
      )
      dispatch(closePopupCreate())
    }
  }

  const isNumber = (str: string) => {
    return /^[0-9]*$/.test(str)
  }

  return (
    <div
      onClick={() => navigate(`/contact/${contact.phone}`)}
      className="bg-gray-50 cursor-pointer hover:bg-gray-200 p-3 px-6 flex items-center justify-between"
    >
      <Toast
        text="Delete contact"
        phone={contact.phone}
        name={contact.name}
        call={1}
      />
      <div className="flex items-center">
        <div
          onClick={(e) => {
            edit && e.stopPropagation()
          }}
          className="flex mr-5"
        >
          <span className="font-bold italic mr-2">contact name:</span>
          {!edit ? (
            <h3>{contact.name}</h3>
          ) : (
            <input
              className="border px-2 rounded-sm"
              type="text"
              defaultValue={contact.name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </div>

        <div
          onClick={(e) => {
            edit && e.stopPropagation()
          }}
          className="flex"
        >
          <span className="font-bold italic mr-2">phone number:</span>
          {!edit ? (
            <h3>{contact.phone}</h3>
          ) : (
            <input
              className="border px-2 rounded-sm"
              type="number"
              defaultValue={contact.phone}
              onChange={(e) => setPhone(Number(e.target.value))}
            />
          )}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex items-center">
        {!edit ? (
          <div
            onClick={(e) => {
              e.stopPropagation()
              setEdit(true)
            }}
            className="h-8 mr-2 cursor-pointer w-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center"
          >
            <FaPencilAlt />
          </div>
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation()
              onSubmit(e)
              setEdit(false)
            }}
            className="h-8 mr-2 cursor-pointer w-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center"
          >
            <FaCheck />
          </div>
        )}

        <div
          onClick={(e) => {
            e.stopPropagation()
            dispatch(openToast(Number(contact.phone)))
          }}
          className="h-8 cursor-pointer w-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center"
        >
          <FaTrash />
        </div>
      </div>
    </div>
  )
}

export default ContactCard
