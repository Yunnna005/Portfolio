import './index.css'
import App from './App.tsx'

import { BrowserRouter } from 'react-router-dom'

<BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
  <App />
</BrowserRouter>