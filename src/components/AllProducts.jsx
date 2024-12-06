import {useContext, useLayoutEffect, useMemo, useRef} from "react";
import {FixedSizeList as List} from "react-window";
import Filter from "./Filter.jsx";
import ProductDetails from "./ProductDetails.jsx";
import AddProduct from "./AddProduct.jsx";
import EditProduct from "./EditProduct.jsx";
import Notification from "./Notification.jsx";
import {GlobalContext} from "../GlobalContext.jsx";
import Pagination from "./Pagination.jsx";
import ProductRow from "./ProductRow.jsx";

export default function AllProducts() {

    const {
        state,
        deleteProduct,
        updateProduct,
        selectedProduct,
        toggleModal,
        toggleEdit,
        modal,
        edit,
        isProductAdded,
        setIsProductAdded,
        currentPage,
        setCurrentPage,
        productsPerPage
    } = useContext(GlobalContext);

    const {products, filteredProducts, notification} = state;

    const lastProductRef = useRef(null);

    useLayoutEffect(() => {
        if (isProductAdded) {
            setTimeout(() => {
                lastProductRef.current.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
                setIsProductAdded(false);
            }, 50)
        }
    }, [isProductAdded]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalProductValue = useMemo(() => {
        console.log("licze total value")
        return products.reduce((total, product) => {
            return total + product.quantity * product.unitPrice;
        }, 0)
    }, [products])

    return (
        <>
            <div>
                <AddProduct/>
            </div>

            <div>
                <h1>Produkty</h1>
                <Filter/>
                <List
                    height={600}
                    width="100%"
                    itemCount={currentProducts.length}
                    itemSize={250}
                    itemData={{
                        currentProducts: currentProducts,
                        toggleModal,
                        toggleEdit,
                        deleteProduct,
                    }}
                >
                    {ProductRow}
                </List>

                <Pagination
                    totalProducts={filteredProducts.length}
                    productsPerPage={productsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <div>Total value of products: <strong>{totalProductValue}</strong></div>

                {modal && selectedProduct && (<ProductDetails product={selectedProduct} toggleModal={toggleModal}/>)}
                {edit && selectedProduct && (
                    <EditProduct product={selectedProduct} toggleEdit={toggleEdit} updateProduct={updateProduct}/>)}
                {notification && (<Notification/>)}
            </div>
        </>


    );
}
