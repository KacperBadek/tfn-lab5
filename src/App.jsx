import './App.css'
import AllProducts from "./components/AllProducts.jsx";
import {useContext, useEffect} from "react";
import {GlobalContext} from "./GlobalContext";
import DATA from "./products.js";

function App() {

    const {setProducts, setFilteredProducts} = useContext(GlobalContext);

    useEffect(() => {
        setProducts(DATA);
        setFilteredProducts(DATA);
    }, []);

    return (
        <>
            <AllProducts/>
        </>
    )
}

export default App
