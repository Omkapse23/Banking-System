import { useState } from "react";
import "../assets/styles/transfer.css";
import { transferMoney } from "../services/transactionService";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";
import { getAccountByCustomer } from "../services/accountService";

function Transfer() {

    const navigate = useNavigate();

    const account = JSON.parse(localStorage.getItem("account"));

    const [transfer, setTransfer] = useState({

        fromAccountNumber: account.accountNumber,
        toAccountNumber: "",
        amount: "",
        remarks: ""

    });

    const handleChange = (e) => {

        setTransfer({

            ...transfer,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await transferMoney(transfer);

            const customer = JSON.parse(localStorage.getItem("customer"));

            const response = await getAccountByCustomer(customer.customerId);

            localStorage.setItem(
                "account",
                JSON.stringify(response.data)
            );

            alert("Money Transferred Successfully");

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            if (error.response) {

                alert(error.response.data.message);

            } else {

                alert("Server Error");

            }

        }

    };

    return (

        <>

            <DashboardNavbar />

            <div className="container py-5" style={{ marginTop: "100px" }}>

                <div className="row justify-content-center">

                    <div className="col-lg-6">

                        <div className="card shadow p-4">

                            <h3 className="mb-4 text-center">
                                Transfer Money
                            </h3>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label>Your Account Number</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={account.accountNumber}
                                        disabled
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>To Account</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="toAccountNumber"
                                        value={transfer.toAccountNumber}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Amount</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="amount"
                                        value={transfer.amount}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label>Remarks</label>

                                    <textarea
                                        className="form-control"
                                        name="remarks"
                                        value={transfer.remarks}
                                        onChange={handleChange}
                                    />

                                </div>

                                <button
                                    className="btn btn-success w-100">

                                    Transfer Money

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

}

export default Transfer;