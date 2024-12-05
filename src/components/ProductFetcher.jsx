import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../GlobalContext.jsx";

export default function ProductFetcher() {

    const {setProducts, setFilteredProducts} = useContext(GlobalContext);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const API_URL = "http://localhost:3000/products";

    const fetchProducts = async () => {
        try {
            const response = await axios.get(API_URL);
            setProducts(response.data);
            setFilteredProducts(response.data);
            console.log("Fetched Products:", response.data);
        } catch (error) {
            setError(`Nie udało się załadować produktów :(, ${error}`);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        setError("");
        fetchProducts();
    }, []);

    return (
        <div>
            {isLoading && <p>Loading products...</p>}
            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    );

}