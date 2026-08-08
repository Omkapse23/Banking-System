import axios from "axios";

const API = "http://localhost:8080/api/loans";

export const getAllLoans = () => {

    return axios.get(`${API}/all`);

};

export const approveLoan = (loanNumber) => {

    return axios.put(`${API}/${loanNumber}/approve`);

};

export const rejectLoan = (loanNumber) => {

    return axios.put(`${API}/${loanNumber}/reject`);

};