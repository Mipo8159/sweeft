import {HelmetProvider} from 'react-helmet-async'
import {useEffect, FC} from 'react'

import {useAppDispatch, useAppSelector} from 'hooks/redux'
import {refresh} from 'store/auth/auth.action'

import AppRouter from 'components/misc/AppRouter'

import Loader from 'components/misc/Loader'
import 'styles/main.scss'
import MainLayout from 'components/layout/MainLayout'
import {closePopupCreate, closeToast} from 'store/popup/popup.reducer'
import {setContacts} from 'store/contact/contact.reducer'
import {clearStatus} from 'store/call/call.reducer'

const App: FC = () => {
  const {isSubmitting} = useAppSelector((state) => state.auth)
  const {contacts} = useAppSelector((state) => state.contact)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(refresh())
  }, []) // eslint-disable-line

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts')!)
    if (contacts) {
      dispatch(setContacts(contacts))
    }
  }, []) // eslint-disable-line

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  if (isSubmitting) {
    return <Loader />
  }

  return (
    <div
      onClick={() => {
        dispatch(closeToast())
        dispatch(closePopupCreate())
        dispatch(clearStatus())
      }}
      className="min-h-[95vh]"
    >
      <HelmetProvider>
        <MainLayout>
          <AppRouter />
        </MainLayout>
      </HelmetProvider>
    </div>
  )
}

export default App
