import {Axios} from 'axios'

export default new Axios({
    baseURL : import.meta.env.VITE_PRODUCT_HOST,
    headers: { 'Content-Type': 'application/json' },
})


export const privateAxios = new Axios({
    baseURL : import.meta.env.VITE_SERVER_HOST,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})