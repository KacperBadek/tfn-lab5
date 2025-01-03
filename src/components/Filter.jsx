import {useState, useEffect, useContext} from "react";
import {GlobalContext} from "../GlobalContext";

export default function Filter() {
    const {state, dispatch} = useContext(GlobalContext);
    const {products} = state;

    const [category, setCategory] = useState('Wszystko');
    const [priceMin, setPriceMin] = useState('0')
    const [priceMax, setPriceMax] = useState('300')


    useEffect(() => {
        const filtered = products.filter((product) => {
            const isCategoryMatch = category === 'Wszystko' || product.category === category;
            const isPriceInRange = product.unitPrice >= parseFloat(priceMin) && product.unitPrice <= parseFloat(priceMax);
            return isCategoryMatch && isPriceInRange;
        });

        dispatch({type: "SET_FILTERED_PRODUCTS", filteredProducts: filtered})
    }, [category, priceMin, priceMax, products]);


    return (
        <div>
            <label>
                Kategorie:
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Wszystko">Wszystko</option>
                    <option value="Elektronika">Elektronika</option>
                    <option value="Odzież">Odzież</option>
                    <option value="Żywność">Żywność</option>
                </select>
            </label>

            <label>
                Min Cena: {priceMin}
                <input type="range" min="0" max="300" value={priceMin} onChange={(e) => setPriceMin(e.target.value)}/>
            </label>

            <label>
                Max Cena: {priceMax}
                <input type="range" min="0" max="300" value={priceMax} onChange={(e) => setPriceMax(e.target.value)}/>
            </label>


        </div>
    );
}
