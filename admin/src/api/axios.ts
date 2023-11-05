import {Axios} from 'axios'

export const privateAxios = new Axios({
    baseURL : import.meta.env.VITE_SERVICE_HOST,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

export const authAxios = new Axios({
    baseURL : import.meta.env.VITE_AUTH_HOST,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})