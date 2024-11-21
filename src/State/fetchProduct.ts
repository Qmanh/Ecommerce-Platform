import axios from "axios"

const api = "http://localhost:8088/products"

export const fetchProduct = async()=> {
    try {
        const response = await axios.get(api)
        console.log("response ",response)
    } catch (error) {
        console.error(error)
    }
}