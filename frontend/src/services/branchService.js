import axios from "axios";

const API = "http://localhost:8080/api/branches";

export const getBranches = () => {
    return axios.get(API);
};