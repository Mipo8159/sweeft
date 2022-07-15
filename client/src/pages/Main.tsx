import ContactCard from 'components/contact/ContactCard'
import PopupCreate from 'components/popup/PopupCreate'
import {useAppDispatch, useAppSelector} from 'hooks/redux'
import {FC, useEffect, useState} from 'react'
import {FaPlus} from 'react-icons/fa'
import {searchContacts} from 'store/contact/contact.reducer'
import {openPopupCreate} from 'store/popup/popup.reducer'

const Main: FC = () => {
  const [search, setSearch] = useState<string>('')
  const {contacts, filtered} = useAppSelector((state) => state.contact)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(searchContacts(search))
  }, [search]) // eslint-disable-line

  return (
    <div className="text-center font-comfortaa">
      <PopupCreate text="create" />
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-lg font-bold uppercase mr-5">contact list</h1>
        <div
          onClick={(e) => {
            e.stopPropagation()
            dispatch(openPopupCreate())
          }}
          className="bg-green-800 hover:bg-green cursor-pointer mb-1 h-8 w-8 text-white rounded-full flex items-center justify-center"
        >
          <FaPlus />
        </div>
      </div>

      <div className="flex flex-col items-center mb-8 rounded-md ">
        <label className="italic mb-1" htmlFor="search">
          "Search contacts" (name or number)
        </label>
        <input
          className="border rounded-md p-1 w-1/2 hover:bg-gray-50 focus:bg-white focus:outline-none focus:border-green"
          type="text"
          id="search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5">
        {search !== '' && filtered.length === 0 ? (
          <div>No contacts found</div>
        ) : search !== '' && filtered.length > 0 ? (
          filtered.map((c) => <ContactCard key={c.phone} contact={c} />)
        ) : (
          contacts.map((c) => <ContactCard key={c.phone} contact={c} />)
        )}
      </div>
    </div>
  )
}

export default Main
