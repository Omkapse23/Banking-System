import axios from "axios";

const API = "http://localhost:8080/api/customers";

export const loginCustomer = (data) => {
    return axios.post(`${API}/login`, data);
};

export const registerCustomer = (data) => {
    return axios.post(`${API}/register`, data);
};