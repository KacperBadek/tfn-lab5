import DATA from '../products.js'
import DelButton from "./DelButton.jsx";
import {useState} from "react";
import Filter from "./Filter.jsx";
import ProductDetails from "./ProductDetails.jsx";

export default function AllProducts() {
    const [products, setProducts] = useState(DATA);
    const [filteredProducts, setFilteredProducts] = useState(DATA);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modal, setModal] = useState(false);

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id))
    }

    const toggleModal = (product) => {
        setSelectedProduct(product);
        setModal(!modal);
    }


    return (
        <div>
            <h1>Produkty</h1>
            <Filter products={products} setFilteredProducts={setFilteredProducts}/>
            <ul>
                {filteredProducts.map((product) => (
                    <li key={product.id} style={{listStyle: "none", cursor: "pointer"}}>
                        <div onClick={() => toggleModal(product)}>
                            <h2>{product.name}</h2>
                            <p>{product.category}</p>
                            <p>{product.quantity}</p>
                            <p>{product.unitPrice}</p>
                        </div>
                        <DelButton handler={() => handleDelete(product.id)}></DelButton>
                    </li>
                ))}
            </ul>
            {modal && selectedProduct && (<ProductDetails product={selectedProduct} toggleModal={toggleModal}/>)}
        </div>
    );
}
