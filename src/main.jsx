import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {GlobalProvider} from "./GlobalContext.jsx";
import ProductFetcher from "./components/ProductFetcher.jsx";

createRoot(document.getElementById('root')).render(

        <GlobalProvider>
            <ProductFetcher/>
            <App/>
        </GlobalProvider>

)
