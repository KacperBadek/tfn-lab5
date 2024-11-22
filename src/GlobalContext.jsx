import React, {createContext, useState} from "react";
import DATA from "./products";

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState(false);

    const addProduct = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    const updateProduct = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        );
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
