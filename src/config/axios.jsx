import axios from "axios";
let clienteAxios = '';
let clienteAxiosNotification = '';

clienteAxios = axios.create({
    //baseURL: import.meta.env.VITE_CLIENTE_AXIOS_URL
    baseURL: "https://documents.clikauto.com/api"
});

clienteAxiosNotification = axios.create({
    baseURL: "https://hld3b9zbfd.execute-api.us-east-1.amazonaws.com/apitwilio"
});

export {clienteAxiosNotification} 
export default clienteAxios;