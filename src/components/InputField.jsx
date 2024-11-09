import {ErrorMessage, Field} from "formik";

export default function InputField({label, name, type}) {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Field name={name} type={type}/>
            <ErrorMessage name={name} component="div" className="error"/>
        </div>
    );
}