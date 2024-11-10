import {useState} from "react";
import InputField from "./InputField.jsx";
import "./Modal.css"

export default function EditProduct({product, toggleEdit, updateProduct}) {
    const [name, setName] = useState(product.name);
    const [category, setCategory] = useState(product.category);
    const [quantity, setQuantity] = useState(product.quantity);
    const [unitPrice, setUnitPrice] = useState(product.unitPrice);
    const [description, setDescription] = useState(product.description);
    const [dateAdded, setDateAdded] = useState(product.dateAdded);
    const [supplier, setSupplier] = useState(product.supplier);
    const [errors, setErrors] = useState({
        name: '',
        category: '',
        quantity: '',
        unitPrice: '',
        description: '',
        dateAdded: '',
        supplier: ''
    });

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Nazwa jest wymagana';
            isValid = false;
        }
        if (!category.trim()) {
            newErrors.category = 'Kategoria jest wymagana';
            isValid = false;
        }
        if (!quantity || quantity <= 0) {
            newErrors.quantity = 'Ilość musi być liczbą większą niż 0';
            isValid = false;
        }
        if (!unitPrice || unitPrice <= 0) {
            newErrors.unitPrice = 'Cena musi być liczbą większą niż 0';
            isValid = false;
        }
        if (!description.trim()) {
            newErrors.description = 'Opis jest wymagany';
            isValid = false;
        }
        if (!dateAdded.trim()) {
            newErrors.dateAdded = 'Data dodania jest wymagana';
            isValid = false;
        }
        if (!supplier.trim()) {
            newErrors.supplier = 'Dostawca jest wymagany';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const updatedProduct = {
                ...product,
                name,
                category,
                quantity,
                unitPrice,
                description,
                dateAdded,
                supplier
            }
            updateProduct(updatedProduct);
            toggleEdit();
        }
    }


    return (
        <div className="modal">
            <div onClick={toggleEdit} className="overlay"></div>
            <div className="modal-content">
                <h1>Edytuj Produkt</h1>
                <form onSubmit={handleSubmit}>
                    <InputField label="Nazwa" name="name" value={name} type="text"
                                onChange={(e) => setName(e.target.value)} error={errors.name}/>
                    <InputField label="Kategoria" name="category" value={category} type="select"
                                options={["Elektronika", "Odzież", "Żywność"]}
                                onChange={(e) => setCategory(e.target.value)} error={errors.category}/>
                    <InputField label="Ilość" name="quantity" value={quantity} type="number"
                                onChange={(e) => setQuantity(e.target.value)} error={errors.quantity}/>
                    <InputField label="Cena" name="unitPrice" value={unitPrice} type="number"
                                onChange={(e) => setUnitPrice(e.target.value)} error={errors.unitPrice}/>
                    <InputField label="Opis" name="description" value={description} type="text"
                                onChange={(e) => setDescription(e.target.value)} error={errors.description}/>
                    <InputField label="Data dodania" name="dateAdded" value={dateAdded} type="date"
                                onChange={(e) => setDateAdded(e.target.value)} error={errors.dateAdded}/>
                    <InputField label="Dostawca" name="supplier" value={supplier} type="text"
                                onChange={(e) => setSupplier(e.target.value)} error={errors.supplier}/>
                    <button type="submit">Zatwierdź</button>
                    <button className="close-modal" onClick={toggleEdit}>
                        X
                    </button>
                </form>
            </div>
        </div>
    )
}