import './App.css'
import AllProducts from "./components/AllProducts.jsx";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "./GlobalContext";
import DATA from "./products.js";

function App() {

    // const {setProducts, setFilteredProducts} = useContext(GlobalContext);
    // const [error, setError] = useState(null);
    //
    // useEffect(() => {
    //
    //     try {
    //         if (DATA && Array.isArray(DATA)) {
    //             setProducts(DATA);
    //             setFilteredProducts(DATA);
    //         } else {
    //              throw new Error("Błąd podczas wczytywania danych")
    //         }
    //     } catch (e) {
    //         setError(e.message);
    //     }
    //
    //
    // }, []);
    //
    // if (error) {
    //     return (
    //         <div>
    //             <h1>Błąd</h1>
    //             <p>{error}</p>
    //         </div>
    //     )
    // }

    return (
        <>
            <AllProducts/>
        </>
    )
}

export default App
