import React, {createContext, useState} from "react";

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

    const addProduct = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        setIsProductAdded(true);
        setNotificationMessage(`Dodano produkt: ${newProduct.name}`);
        toggleNotification();
    };

    const updateProduct = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        );
        setNotificationMessage(`Edytowano produkt, id: ${updatedProduct.id}`);
        toggleNotification();
    };

    const deleteProduct = (id) => {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
        );
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
