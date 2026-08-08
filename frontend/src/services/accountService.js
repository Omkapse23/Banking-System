import axios from "axios";

const API_URL = "http://localhost:8080/api/accounts";

export const createAccount = (account) => {
    return axios.post(API_URL, account);
};

export const getAccountByCustomer = (customerId) => {
    return axios.get(`${API_URL}/customer/${customerId}`);
};