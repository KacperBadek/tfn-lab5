import "./Modal.css"

export default function ProductDetails({product, toggleModal}) {

    return (
        <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>{product.dateAdded}</p>
                <p>{product.supplier}</p>
                <button className="close-modal" onClick={toggleModal}>
                    CLOSE
                </button>
            </div>
        </div>
    )
}