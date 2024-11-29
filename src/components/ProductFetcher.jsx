import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../GlobalContext.jsx";

export default function ProductFetcher() {

    const {setProducts} = useContext(GlobalContext);

    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState("");

    const API_URL = "http://localhost:3000/products";

    const fetchProducts = async () => {
        try {
            const response = await axios.get(API_URL);
            setProducts(response.data);
        } catch (error) {
            setErrors(`Nie udało się załadować produktów :(, ${error}`);
        } finally {
            setIsLoading(false);
        }
    }

    const addProduct = async (newProduct) => {
        try {
            await axios.post(API_URL, newProduct);
            await fetchProducts();
        } catch (error) {
            setErrors(`Nie udało się dodać produktu :(, ${error}`);
        }
    }

    const updateProduct = async (id, updatedProduct) => {
        try {
            await axios.get(`${API_URL}/${id}`, updatedProduct);
            await fetchProducts();
        } catch (error) {
            setErrors(`Nie udało się zaktualizować produktu: ${id} :(, ${error}`);
        }
    }

    const deleteProduct = async (id) => {
        try {
            await axios.get(`${API_URL}/${id}`);
            await fetchProducts();
        } catch (error) {
            setErrors(`Nie udało się usunąć produktu: ${id} :(, ${error}`);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        setErrors("");
        fetchProducts();
    }, []);

    return (
        <div>
            {isLoading && <p>Loading products...</p>}
            {errors && <p style={{color: "red"}}>{errors}</p>}
        </div>
    );

}