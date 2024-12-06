import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../GlobalContext.jsx";

export default function ProductFetcher() {

    const {state, dispatch} = useContext(GlobalContext);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const API_URL = "http://localhost:3000/products";

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(API_URL);
            dispatch({type: "SET_PRODUCTS", products: response.data, filteredProducts: response.data})
            console.log("Fetched Products:", response.data);

            try {
                localStorage.setItem("products", JSON.stringify(response.data));
            } catch (localStorageError) {
                console.error("Nie udało się zapisać danych w localStorage:", localStorageError);
            }

        } catch (error) {
            setError(`Nie udało się załadować produktów :(, ${error}`);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        try {
            const storedProducts = JSON.parse(localStorage.getItem("products"));
            if (storedProducts) {
                dispatch({type: "SET_PRODUCTS", products: storedProducts, filteredProducts: storedProducts})
                setIsLoading(false)
            } else {
                fetchProducts();
            }
        } catch (error) {
            setError(`Nie udało się wczytać produktów: ${error}`);
        }


    }, []);

    return (
        <div>
            {isLoading && <p>Loading products...</p>}
            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    );

}