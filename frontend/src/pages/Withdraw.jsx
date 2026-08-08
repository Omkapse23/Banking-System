import { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";
import { withdrawMoney } from "../services/withdrawService";
import { useNavigate } from "react-router-dom";
import { getAccountByCustomer } from "../services/accountService";

function Withdraw() {

    const navigate = useNavigate();

    const account = JSON.parse(localStorage.getItem("account"));

    const [withdraw, setWithdraw] = useState({

        accountNumber: account.accountNumber,
        amount: ""

    });

    const handleChange = (e) => {

        setWithdraw({

            ...withdraw,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await withdrawMoney(withdraw);

            const customer = JSON.parse(localStorage.getItem("customer"));

            const response = await getAccountByCustomer(customer.customerId);

            localStorage.setItem(
                "account",
                JSON.stringify(response.data)
            );

            alert("Money Withdrawn Successfully");

            navigate("/dashboard");

            setWithdraw({

                accountNumber: account.accountNumber,
                amount: ""

            });

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

            <div className="container py-5" style={{ marginTop: "120px" }}>

                <div className="row justify-content-center">

                    <div className="col-lg-6">

                        <div className="card shadow p-4">

                            <h3 className="text-center mb-4">

                                Withdraw Money

                            </h3>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label>

                                        Account Number

                                    </label>

                                    <input
                                        className="form-control"
                                        value={withdraw.accountNumber}
                                        readOnly
                                    />

                                </div>

                                <div className="mb-4">

                                    <label>

                                        Withdraw Amount

                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="amount"
                                        value={withdraw.amount}
                                        onChange={handleChange}
                                        placeholder="Enter Amount"
                                        required
                                    />

                                </div>

                                <button
                                    className="btn btn-danger w-100"
                                    type="submit"
                                >

                                    Withdraw Money

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

export default Withdraw;