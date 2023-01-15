import axios from "axios";

const apiAxios = axios.create({
    baseURL: "https://apcodes.top:9988/store/user",
    data: {},
    headers: {}
})

export default apiAxios;