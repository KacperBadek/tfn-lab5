import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import InputField from "./InputField.jsx";
import DelButton from "./DelButton.jsx";

export default function AddProduct({addProduct}) {

    const validationSchema = Yup.object({
        name: Yup.string().required('Pole nie może być puste').min(3),
        category: Yup.string().required('Pole nie może być puste').oneOf(["Elektronika", "Odzież", "Żywność"]),
        quantity: Yup.number().required('Pole nie może być puste').integer().positive(),
        unitPrice: Yup.number().required('Pole nie może być puste').positive(),
        description: Yup.string().required('Pole nie może być puste').min(3),
        dateAdded: Yup.date().required('Pole nie może być puste').typeError('Nieprawidłowy format daty').max(new Date()),
        supplier: Yup.string().required('Pole nie może być puste').min(3)
    })

    const handleSubmit = (values) => {
        const newProduct = {...values}
        addProduct(newProduct)
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
                        <InputField name="name" label="Nazwa" type="text"/>
                        <InputField name="category" label="Kategoria" type="text"/>
                        <InputField name="quantity" label="Ilość" type="number"/>
                        <InputField name="unitPrice" label="Cena" type="number"/>
                        <InputField name="description" label="Opis" type="text"/>
                        <InputField name="dateAdded" label="Data Dodania" type="date"/>
                        <InputField name="supplier" label="Dostawca" type="text"/>
                        <button type="Submit">Dodaj</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}