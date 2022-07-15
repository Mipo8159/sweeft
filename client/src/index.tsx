import ReactDom from 'react-dom/client'
import App from 'App'
import {Provider} from 'react-redux'
import {makeStore} from 'store/store'
import {BrowserRouter} from 'react-router-dom'

const root = ReactDom.createRoot(
  document.getElementById('root') as HTMLElement
)

const store = makeStore()
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
