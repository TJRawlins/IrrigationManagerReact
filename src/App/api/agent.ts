import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = 'https://localhost:5555/api/'

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Users = {
    list: () => requests.get('users'),
    details: (id: string) => requests.get(`users/${id}`) 
}
const Plants = {
    list: () => requests.get('plants'),
    details: (id: string) => requests.get(`plants/${id}`) 
}
const Zones = {
    list: () => requests.get('zones'),
    details: (id: string) => requests.get(`zones/${id}`) 
}

const agent = {
    Users,
    Plants,
    Zones
}

export default agent