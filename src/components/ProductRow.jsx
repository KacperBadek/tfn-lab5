import MyButton from "./MyButton.jsx";

export default function ProductRow({index, style, data}) {
    const {currentProducts, toggleModal, toggleEdit, deleteProduct} = data;
    const product = currentProducts[index];

    return (
        <div style={{
            ...style,
            display: "flex",
            flexDirection: "column",
            borderBottom: "1px solid #ddd",
            padding: "10px"
        }}>
            <div onClick={() => toggleModal(product)}>
                <h2>{product.name}</h2>
                <p>{product.category}</p>
                <p>{product.quantity}</p>
                <p>{product.unitPrice}</p>
            </div>
            <div style={{marginTop: "10px"}}>
                <MyButton handler={() => toggleEdit(product)} text="Edytuj"/>
                <MyButton handler={() => deleteProduct(product.id)} text="Usuń"/>
            </div>
        </div>
    );
}