import axios from "axios";

const API_URL = "http://localhost:8080/api/transactions";

export const depositMoney = (deposit) => {

    return axios.post(`${API_URL}/deposit`, deposit);

};