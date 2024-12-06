import {createContext, useCallback, useReducer, useState} from "react";
import axios from "axios";

const initialState = {
    products: [],
    filteredProducts: [],
    notification: false,
    notificationMessage: null,
}

function reducer(state, action) {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
                ...state,
                products: action.products,
                filteredProducts: action.products
            };
        case "SET_FILTERED_PRODUCTS":
            return {
                ...state,
                filteredProducts: action.filteredProducts,
            };
        case "SET_NOTIFICATION":
            return {
                ...state,
                notification: action.value,
                notificationMessage: action.message,
            };
        default:
            return state;
    }
}

const API_URL = "http://localhost:3000/products";
export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [isProductAdded, setIsProductAdded] = useState(false);
    const [apiError, setApiError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(4);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(API_URL);
            dispatch({type: "SET_PRODUCTS", products: response.data, filteredProducts: response.data})

            try {
                localStorage.setItem("products", JSON.stringify(response.data));
            } catch (localStorageError) {
                console.error("Nie udało się zapisać danych w localStorage:", localStorageError);
            }

            const totalPages = Math.ceil(response.data.length / productsPerPage);
            if (currentPage > totalPages) {
                setCurrentPage(totalPages);
            }

        } catch (error) {
            setApiError(`Nie udało się załadować produktów :(, ${error}`);
        }
    }, [])

    const addProduct = useCallback(async (newProduct) => {
        try {
            await axios.post(API_URL, newProduct);
            await fetchProducts();
            dispatch({
                type: "SET_NOTIFICATION",
                value: !state.notification,
                message: `Dodano produkt: ${newProduct.name}`
            })
        } catch (error) {
            setApiError(`Nie udało się dodać produktu :(, ${error}`);
        }
    }, [fetchProducts])

    const updateProduct = useCallback(async (updatedProduct) => {
        try {
            await axios.put(`${API_URL}/${updatedProduct.id}`, updatedProduct);
            await fetchProducts();
            dispatch({
                type: "SET_NOTIFICATION",
                value: !state.notification,
                message: `Edytowano produkt, id: ${updatedProduct.id}`
            })
        } catch (error) {
            setApiError(`Nie udało się zaktualizować produktu: ${updatedProduct.id} :(, ${error}`);
        }
    }, [fetchProducts])

    const deleteProduct = useCallback(async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            await fetchProducts();

        } catch (error) {
            setApiError(`Nie udało się usunąć produktu: ${id} :(, ${error}`);
        }
    }, [fetchProducts])

    const toggleModal = (product) => {
        setSelectedProduct(product);
        setModal(!modal);
    };

    const toggleEdit = (product) => {
        setSelectedProduct(product);
        setEdit(!edit);
    };

    return (
        <GlobalContext.Provider
            value={{
                state,
                dispatch,
                selectedProduct,
                modal,
                edit,
                isProductAdded,
                setIsProductAdded,
                currentPage,
                setCurrentPage,
                productsPerPage,
                toggleModal,
                toggleEdit,
                addProduct,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
