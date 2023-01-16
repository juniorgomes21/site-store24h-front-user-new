import axios from "axios";
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
    maxAge: 15 * 60 * 1000,
    exclude: {
        // Only exclude PUT, PATCH and DELETE methods from cache
        query: false
    }
})

  
const apiAxios = axios.create({
    baseURL: import.meta.env.VITE_APP_AXIOS,
    data: {},
    headers: {},

})

export default apiAxios;