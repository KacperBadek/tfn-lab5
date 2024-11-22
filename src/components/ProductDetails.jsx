import "./Modal.css"
import {useContext} from "react";
import {GlobalContext} from "../GlobalContext";

export default function ProductDetails() {

    const {selectedProduct, toggleModal} = useContext(GlobalContext);

    return (
        <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
                <h2>{selectedProduct.name}</h2>
                <p>{selectedProduct.description}</p>
                <p>{selectedProduct.dateAdded}</p>
                <p>{selectedProduct.supplier}</p>
                <button className="close-modal" onClick={toggleModal}>
                    X
                </button>
            </div>
        </div>
    )
}