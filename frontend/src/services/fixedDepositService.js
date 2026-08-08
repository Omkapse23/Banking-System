import axios from "axios";

const API = "http://localhost:8080/api/fixed-deposits";

export const createFD = (data) => {
    return axios.post(API, data);
};

export const getFDs = (accountNumber) => {
    return axios.get(`${API}/account/${accountNumber}`);
};

export const closeFD = (fdNumber) => {
    return axios.put(`${API}/close/${fdNumber}`);
};