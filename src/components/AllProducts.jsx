import MyButton from "./MyButton.jsx";
import {useContext, useLayoutEffect, useRef} from "react";
import Filter from "./Filter.jsx";
import ProductDetails from "./ProductDetails.jsx";
import AddProduct from "./AddProduct.jsx";
import EditProduct from "./EditProduct.jsx";
import Notification from "./Notification.jsx";
import {GlobalContext} from "../GlobalContext.jsx";

export default function AllProducts() {

    const {
        filteredProducts,
        deleteProduct,
        updateProduct,
        selectedProduct,
        toggleModal,
        toggleEdit,
        modal,

        edit,
        isProductAdded,
        setIsProductAdded,
        notification
    } = useContext(GlobalContext);

    const lastProductRef = useRef(null);

    useLayoutEffect(() => {
        if (isProductAdded) {
            setTimeout(() => {
                lastProductRef.current.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
                setIsProductAdded(false);
            }, 50)
        }
    }, [isProductAdded]);

    return (
        <>
            <div>
                <AddProduct/>
            </div>

            <div>
                <h1>Produkty</h1>
                <Filter/>
                <ul>
                    {filteredProducts.map((product, index) => (
                        <li key={product.id} style={{listStyle: "none", cursor: "pointer"}}
                            ref={index === filteredProducts.length - 1 ? lastProductRef : null}>
                            <div onClick={() => toggleModal(product)}>
                                <h2>{product.name}</h2>
                                <p>{product.category}</p>
                                <p>{product.quantity}</p>
                                <p>{product.unitPrice}</p>
                            </div>
                            <MyButton handler={() => toggleEdit(product)} text="Edytuj"></MyButton>
                            <MyButton handler={() => deleteProduct(product.id)} text="Usuń"></MyButton>
                        </li>
                    ))}
                </ul>

                {modal && selectedProduct && (<ProductDetails product={selectedProduct} toggleModal={toggleModal}/>)}
                {edit && selectedProduct && (
                    <EditProduct product={selectedProduct} toggleEdit={toggleEdit} updateProduct={updateProduct}/>)}
                {notification && (<Notification/>)}
            </div>
        </>


    );
}
