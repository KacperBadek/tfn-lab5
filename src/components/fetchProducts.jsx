import axios from "axios";
const API_URL = "http://localhost:3000/products";

export function fetchProducts() {
    return axios.get(API_URL).then(response => response.data);
}
