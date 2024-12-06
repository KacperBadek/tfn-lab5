import {createContext, useState} from "react";
import axios from "axios";

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [isProductAdded, setIsProductAdded] = useState(false);
    const [notification, setNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [apiError, setApiError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(4);


    const API_URL = "http://localhost:3000/products";

    const fetchProducts = async () => {
        try {
            const response = await axios.get(API_URL);
            setProducts(response.data);
            setFilteredProducts(response.data);

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
    }

    const addProduct = async (newProduct) => {
        try {
            await axios.post(API_URL, newProduct);
            await fetchProducts();
            setNotificationMessage(`Dodano produkt: ${newProduct.name}`);
            toggleNotification();
        } catch (error) {
            setApiError(`Nie udało się dodać produktu :(, ${error}`);
        }
    };

    const updateProduct = async (updatedProduct) => {
        try {
            await axios.put(`${API_URL}/${updatedProduct.id}`, updatedProduct);
            await fetchProducts();
            setNotificationMessage(`Edytowano produkt, id: ${updatedProduct.id}`);
            toggleNotification();
        } catch (error) {
            setApiError(`Nie udało się zaktualizować produktu: ${updatedProduct.id} :(, ${error}`);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            await fetchProducts();

        } catch (error) {
            setApiError(`Nie udało się usunąć produktu: ${id} :(, ${error}`);
        }
    };

    const toggleModal = (product) => {
        setSelectedProduct(product);
        setModal(!modal);
    };

    const toggleEdit = (product) => {
        setSelectedProduct(product);
        setEdit(!edit);
    };

    const toggleNotification = () => {
        setNotification(!notification);
    }

    return (
        <GlobalContext.Provider
            value={{
                products,
                setProducts,
                filteredProducts,
                setFilteredProducts,
                selectedProduct,
                modal,
                edit,
                isProductAdded,
                setIsProductAdded,
                notification,
                setNotification,
                notificationMessage,
                currentPage,
                setCurrentPage,
                productsPerPage,
                toggleModal,
                toggleEdit,
                toggleNotification,
                addProduct,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
