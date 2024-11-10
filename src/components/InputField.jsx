export default function InputField({ label, name, value, type, onChange, options, error }) {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            {type === 'select' ? (
                <select name={name} value={value} onChange={onChange}>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    name={name}
                    value={value}
                    type={type}
                    onChange={onChange}
                />
            )}
            {error && <div className="error">{error}</div>}
        </div>
    );
}