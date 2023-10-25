import {Axios} from 'axios'

export default new Axios({
    baseURL : import.meta.env.VITE_SERVICE_HOST,
    headers: { 'Content-Type': 'application/json' },
})


export const privateAxios = new Axios({
    baseURL : import.meta.env.VITE_SERVICE_HOST,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})
export const cartAxios = new Axios({
    baseURL : import.meta.env.VITE_SERVICE_HOST,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})