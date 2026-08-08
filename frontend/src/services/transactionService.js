import axios from "axios";

const API = "http://localhost:8080/api/transactions";

export const transferMoney = (data) => {
    return axios.post(`${API}/transfer`, data);
};

export const getTransactionHistory = (accountNumber) => {

    return axios.get(
        `${API}/history/${accountNumber}`
    );

};