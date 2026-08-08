import axios from "axios";

const API_URL = "http://localhost:8080/api/transactions";

export const withdrawMoney = (withdraw) => {

    return axios.post(`${API_URL}/withdraw`, withdraw);

};