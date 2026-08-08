import axios from "axios";

const API = "http://localhost:8080/api/loans";

export const applyLoan = (loan) => {
    return axios.post(API, loan);
};

export const getLoans = (accountNumber) => {
    return axios.get(`${API}/account/${accountNumber}`);
};

export const payEmi = (loanNumber) => {
    return axios.put(`${API}/pay-emi/${loanNumber}`);
};