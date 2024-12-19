import {StrictMode, Suspense, lazy} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import {GlobalProvider} from "./GlobalContext.jsx";
// import ProductFetcher from "./components/ProductFetcher.jsx";
import {ClipLoader} from "react-spinners";

const App = lazy(() => import("./App"));
const ProductFetcher = lazy(() => import("./components/ProductFetcher"));

createRoot(document.getElementById('root')).render(
    <GlobalProvider>
        <Suspense fallback={<div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#000",
            color: "#fff"
        }}><ClipLoader color="white"/></div>}>
            <ProductFetcher/>
            <App/>
        </Suspense>
    </GlobalProvider>
)
