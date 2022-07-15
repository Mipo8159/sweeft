import classNames from 'classnames'
import {useAppDispatch, useAppSelector} from 'hooks/redux'
import {FC, FormEvent, useState} from 'react'
import {addContact} from 'store/contact/contact.reducer'
import {closePopupCreate} from 'store/popup/popup.reducer'

interface PopupCreateProps {
  text: string
}
const PopupCreate: FC<PopupCreateProps> = ({text}) => {
  const {popupCreate} = useAppSelector((state) => state.popup)
  const dispatch = useAppDispatch()

  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')

  const [error, setError] = useState<any>({})

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    let errors: any = {}
    if (name === '') {
      errors.name = 'provide a name'
    }
    if (name === '') {
      errors.phone = 'provide a phone'
    }
    if (!isNumber(phone)) {
      errors.isNumber = 'should only contain numbers'
    }

    if (Object.keys(errors).length > 0) {
      return setError(errors)
    }

    setName('')
    setPhone('')

    if (name !== '' && phone !== '' && isNumber(phone)) {
      setError({})
      dispatch(addContact({name, phone: Number(phone)}))
      dispatch(closePopupCreate())
    }
  }

  const isNumber = (str: string) => {
    return /^[0-9]*$/.test(str)
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={classNames(
        'absolute bg-white rounded-lg z-10 border top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] scale-0 duration-300',
        {'scale-100': popupCreate}
      )}
    >
      <form onSubmit={onSubmit} className="relative p-7">
        <h1 className="uppercase font-bold mb-3">Add contact</h1>

        <div className="flex flex-col items-start mb-3">
          <label htmlFor="name">name</label>
          {error.name && <small className="text-red">{error.name}</small>}
          <input
            id="name"
            className="border p-1 rounded-sm focus:border-none focus:outline-gray-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-start mb-5">
          <label htmlFor="phone">phone</label>
          {error.phone && (
            <small className="text-red">{error.phone}</small>
          )}
          {error.isNumber && (
            <small className="text-red">{error.isNumber}</small>
          )}
          <input
            id="phone"
            className="border p-1 rounded-sm focus:border-none focus:outline-gray-200"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex">
          <button className="bg-green-800 rounded-sm text-white flex-1 hover:bg-green-900 mr-1">
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              setError({})
              setName('')
              setPhone('')
              dispatch(closePopupCreate())
            }}
            className="bg-red-800 rounded-sm text-white flex-1 hover:bg-red-900 ml-1 p-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
export default PopupCreate
