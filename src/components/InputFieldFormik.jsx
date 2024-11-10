import {ErrorMessage, Field} from "formik";

export default function InputFieldFormik({label, name, type, options}) {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            {type === "select" ? (
                <Field as="select" name={name}>
                    <option value="" disabled>Wybierz opcję</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </Field>
            ) : (
                <Field name={name} type={type}/>
            )}
            <ErrorMessage name={name} component="div" className="error"/>
        </div>
    );
}