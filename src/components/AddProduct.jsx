import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import InputFieldFormik from "./InputFieldFormik.jsx";
import {GlobalContext} from "../GlobalContext";
import {useContext} from "react";

export default function AddProduct() {
    const {addProduct} = useContext(GlobalContext);

    const validationSchema = Yup.object({
        name: Yup.string().required('Pole nie może być puste').min(3),
        category: Yup.string().required('Pole nie może być puste').oneOf(["Elektronika", "Odzież", "Żywność"]),
        quantity: Yup.number().required('Pole nie może być puste').integer().positive(),
        unitPrice: Yup.number().required('Pole nie może być puste').positive(),
        description: Yup.string().required('Pole nie może być puste').min(3),
        dateAdded: Yup.date().required('Pole nie może być puste').typeError('Nieprawidłowy format daty').max(new Date()),
        supplier: Yup.string().required('Pole nie może być puste').min(3)
    })

    const handleSubmit = (values, {resetForm}) => {
        const newProduct = {...values}
        addProduct(newProduct)
        resetForm();
    }

    return (
        <div>
            <h1>Dodaj produkt</h1>
            <Formik initialValues={{
                name: '',
                category: '',
                quantity: '',
                unitPrice: '',
                description: '',
                dateAdded: '',
                supplier: ''
            }} validationSchema={validationSchema} onSubmit={handleSubmit}>

                {() => (
                    <Form>
                        <InputFieldFormik name="name" label="Nazwa" type="text"/>
                        <InputFieldFormik name="category" label="Kategoria" type="select"
                                          options={["Elektronika", "Odzież", "Żywność"]}/>
                        <InputFieldFormik name="quantity" label="Ilość" type="number"/>
                        <InputFieldFormik name="unitPrice" label="Cena" type="number"/>
                        <InputFieldFormik name="description" label="Opis" type="text"/>
                        <InputFieldFormik name="dateAdded" label="Data Dodania" type="date"/>
                        <InputFieldFormik name="supplier" label="Dostawca" type="text"/>
                        <button type="Submit">Dodaj</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}