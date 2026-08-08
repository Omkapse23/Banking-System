import { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";
import { depositMoney } from "../services/depositService";
import { useNavigate } from "react-router-dom";
import { getAccountByCustomer } from "../services/accountService";

function Deposit() {

    const navigate = useNavigate();

    const account = JSON.parse(localStorage.getItem("account"));

    const [deposit, setDeposit] = useState({

        accountNumber: account.accountNumber,
        amount: ""

    });

    const handleChange = (e) => {

        setDeposit({

            ...deposit,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await depositMoney(deposit);

            const customer = JSON.parse(localStorage.getItem("customer"));

            const response = await getAccountByCustomer(customer.customerId);

            localStorage.setItem(
                "account",
                JSON.stringify(response.data)
            );

            alert("Money Deposited Successfully");

            navigate("/dashboard");

        } catch (error) {

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

            <div className="container py-5" style={{ marginTop: "110px" }}>

                <div className="row justify-content-center">

                    <div className="col-lg-6">

                        <div className="card shadow p-4">

                            <h3 className="text-center mb-4">

                                Deposit Money

                            </h3>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label>

                                        Account Number

                                    </label>

                                    <input

                                        className="form-control"

                                        value={deposit.accountNumber}

                                        readOnly

                                    />

                                </div>

                                <div className="mb-4">

                                    <label>

                                        Deposit Amount

                                    </label>

                                    <input

                                        type="number"

                                        className="form-control"

                                        name="amount"

                                        value={deposit.amount}

                                        onChange={handleChange}

                                        placeholder="Enter Deposit Amount"
                                        min="1"
                                        required

                                    />

                                </div>

                                <button
                                    className="btn btn-success w-100">

                                    Deposit Money

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

export default Deposit;