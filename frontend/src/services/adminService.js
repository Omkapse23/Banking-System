import axios from "axios";

const API_URL = "http://localhost:8080/api/admin";

export const loginAdmin = (admin) => {

    return axios.post(`${API_URL}/login`, admin);

};