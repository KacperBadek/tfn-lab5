import {lazy, Suspense, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {FixedSizeList as List} from "react-window";
// import Filter from "./Filter.jsx";
// import ProductDetails from "./ProductDetails.jsx";
// import AddProduct from "./AddProduct.jsx";
import EditProduct from "./EditProduct.jsx";
import Notification from "./Notification.jsx";
import {GlobalContext} from "../GlobalContext.jsx";
import Pagination from "./Pagination.jsx";
import ProductRow from "./ProductRow.jsx";
import BrokenComponent from "./BrokenComponent.jsx";
import {ClipLoader} from "react-spinners";

const Filter = lazy(() => import("./Filter.jsx"));
const AddProduct = lazy(() => import("./AddProduct.jsx"));
const ProductDetails = lazy(() => import("./ProductDetails.jsx"));

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

    const [loadingProductDetails, setLoadingProductDetails] = useState(false);
    const [productDetailsError, setProductDetailsError] = useState(null);
    const [timerStarted, setTimerStarted] = useState(false);

    useEffect(() => {
        if (modal && selectedProduct) {
            setLoadingProductDetails(true);
            setProductDetailsError(null);
            setTimerStarted(false);

            const timer = setTimeout(() => {
                if (!loadingProductDetails) {
                    setProductDetailsError("Trwa ładowanie dłużej niż oczekiwano. Próba ponownego ładowania...");
                }
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [modal, selectedProduct, loadingProductDetails]);

    const retryLoadProductDetails = () => {
        setLoadingProductDetails(true);
        setProductDetailsError(null);
    };

    const ProductDetailsWithRetry = () => {
        if (productDetailsError) {
            setTimeout(() => {
                retryLoadProductDetails();
            }, 3000);

            return (
                <div>
                    <p style={{ color: "red" }}>
                        Wystąpił problem z ładowaniem szczegółów produktu. Próba ponownego ładowania...
                    </p>
                </div>
            );
        }

        return (
            <Suspense
                fallback={
                    loadingProductDetails ? (
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            <ClipLoader color="white" />
                            <p>Trwa ładowanie szczegółów produktu. Proszę czekać...</p>
                        </div>
                    ) : null
                }
            >
                <ProductDetails product={selectedProduct} toggleModal={toggleModal} />
            </Suspense>
        );
    };

    return (
        <>
            {/*} <BrokenComponent/>*/}
            <div>
                <Suspense fallback={<div>Loading add form...</div>}>
                    <AddProduct/>
                </Suspense>
            </div>

            <div>
                <h1>Produkty</h1>
                <Suspense fallback={<div>Loading filter...</div>}>
                    <Filter/>
                </Suspense>

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

                {modal && selectedProduct && <ProductDetailsWithRetry />}
                {edit && selectedProduct && (
                    <EditProduct product={selectedProduct} toggleEdit={toggleEdit} updateProduct={updateProduct}/>)}
                {notification && (<Notification/>)}
            </div>
        </>


    );
}
