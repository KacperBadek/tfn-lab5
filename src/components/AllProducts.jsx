import DATA from '../products.js'
import MyButton from "./MyButton.jsx";
import {useState} from "react";
import Filter from "./Filter.jsx";
import ProductDetails from "./ProductDetails.jsx";
import AddProduct from "./AddProduct.jsx";
import EditProduct from "./EditProduct.jsx";

export default function AllProducts() {
    const [products, setProducts] = useState(DATA);
    const [filteredProducts, setFilteredProducts] = useState(DATA);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id))
    }

    const toggleModal = (product) => {
        setSelectedProduct(product);
        setModal(!modal);
    }

    const toggleEdit = (product) => {
        setSelectedProduct(product);
        setEdit(!edit)
    }

    const addProduct = (newProduct) => {
        setProducts(prevProdcuts => [...prevProdcuts, newProduct]);
    }

    const updateProduct = (updatedProduct) => {
        setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
    }

    return (
        <>
            <div>
                <AddProduct addProduct={addProduct}/>
            </div>

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
                            <MyButton handler={() => toggleEdit(product)} text="Edytuj"></MyButton>
                            <MyButton handler={() => handleDelete(product.id)} text="Usuń"></MyButton>
                        </li>
                    ))}
                </ul>
                {modal && selectedProduct && (<ProductDetails product={selectedProduct} toggleModal={toggleModal}/>)}
                {edit && selectedProduct && (<EditProduct product={selectedProduct} toggleEdit={toggleEdit} updateProduct={updateProduct}/>)}
            </div>
        </>


    );
}
