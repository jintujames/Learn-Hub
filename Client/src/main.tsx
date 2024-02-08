import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import store from './App/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <Provider store = {store}>
    <React.StrictMode>
    <App />
  </React.StrictMode>,

  </Provider>
)
