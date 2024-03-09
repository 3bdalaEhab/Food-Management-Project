import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import './index.css'
import TokenContextProvider from './SharedModule/components/TokenContext/TokenContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
<TokenContextProvider>
  <App />
</TokenContextProvider>

)
