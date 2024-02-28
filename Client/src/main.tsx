import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import {store , persistedStore}from './App/store'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <Provider store = {store}>
    <PersistGate persistor={persistedStore} loading={null}>
      <React.StrictMode>
      <App />
    </React.StrictMode>,
  </PersistGate>
  </Provider>
)
