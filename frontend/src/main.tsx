import React from 'react'

import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { HttpCheckoutGateway } from './gateway/HttpCheckoutGateway.ts'
import { FetchAdapter } from './http/FetchAdapter.ts'

// const httpClient = new AxiosAdapter()
const httpClient = new FetchAdapter()
const checkoutGateway = new HttpCheckoutGateway(httpClient)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App checkoutGateway={checkoutGateway} />
  </React.StrictMode>,
)
