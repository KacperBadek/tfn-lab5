import './App.css'
// import AllProducts from "./components/AllProducts.jsx";
import {lazy, Suspense, useContext, useEffect, useState} from "react";
import {GlobalContext} from "./GlobalContext";
import DATA from "./products.js";
import ErrorBoundary from "./ErrorBoundary.jsx";
import {ClipLoader} from "react-spinners";

const AllProducts = lazy(() => import("./components/AllProducts.jsx"));

function App() {
    const [showProducts, setShowProducts] = useState(false);

    const handleShowProducts = () => {
        setShowProducts(true);
    };

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
            <ErrorBoundary>
                <div>
                    <button onClick={handleShowProducts}>Pokaż produkty</button>
                </div>
                {showProducts && (
                    <Suspense fallback={<div style={{ textAlign: "center", padding: "20px" }}><ClipLoader color="white" /></div>}>
                        <AllProducts />
                    </Suspense>
                )}
            </ErrorBoundary>
        </>
    )
}

export default App
