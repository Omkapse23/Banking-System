import { useState } from "react";
import { applyLoan, getLoans, payEmi } from "../services/loanService";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";
import { getAccountByCustomer } from "../services/accountService";

function Loan() {

    const navigate = useNavigate();

    const account = JSON.parse(localStorage.getItem("account"));

    const [loan, setLoan] = useState({

        accountNumber: account.accountNumber,
        loanType: "HOME",
        loanAmount: "",
        tenureMonths: "",

        occupation: "",
        monthlyIncome: "",
        employerName: "",
        experienceYears: ""

    });

    const [loans, setLoans] = useState([]);

    const handleChange = (e) => {

        setLoan({

            ...loan,
            [e.target.name]: e.target.value

        });

    };

    const loadLoans = async () => {

        if (!loan.accountNumber) return;

        try {

            const response = await getLoans(loan.accountNumber);

            setLoans(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await applyLoan(loan);

            alert("Loan Applied Successfully");

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

    const handlePayEmi = async (loanNumber) => {

        try {

            await payEmi(loanNumber);

            const customer = JSON.parse(localStorage.getItem("customer"));

            const response = await getAccountByCustomer(customer.customerId);

            localStorage.setItem(
                "account",
                JSON.stringify(response.data)
            );

            alert("EMI Paid Successfully");

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

                <h2 className="mb-4">

                    Loan Management

                </h2>

                <form onSubmit={handleSubmit} className="card p-4 shadow">

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

                        <label>Loan Type</label>

                        <select
                            className="form-select"
                            name="loanType"
                            value={loan.loanType}
                            onChange={handleChange}
                        >

                            <option value="HOME">HOME</option>
                            <option value="PERSONAL">PERSONAL</option>
                            <option value="VEHICLE">VEHICLE</option>
                            <option value="EDUCATION">EDUCATION</option>
                            <option value="GOLD">GOLD</option>

                        </select>

                    </div>

                    <div className="mb-3">

                        <label>Loan Amount</label>

                        <input
                            type="number"
                            className="form-control"
                            name="loanAmount"
                            value={loan.loanAmount}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Tenure (Months)</label>

                        <input
                            type="number"
                            className="form-control"
                            name="tenureMonths"
                            value={loan.tenureMonths}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Occupation</label>

                        <input
                            type="text"
                            className="form-control"
                            name="occupation"
                            value={loan.occupation}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Monthly Income</label>

                        <input
                            type="number"
                            className="form-control"
                            name="monthlyIncome"
                            value={loan.monthlyIncome}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Employer Name</label>

                        <input
                            type="text"
                            className="form-control"
                            name="employerName"
                            value={loan.employerName}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-4">

                        <label>Years of Experience</label>

                        <input
                            type="number"
                            className="form-control"
                            name="experienceYears"
                            value={loan.experienceYears}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button className="btn btn-warning w-100">

                        Apply Loan

                    </button>

                </form>

                <button
                    className="btn btn-dark mt-4 mb-3"
                    onClick={loadLoans}
                >

                    Load My Loans

                </button>

                <table className="table table-bordered">

                    <thead>

                        <tr>

                            <th>Loan No</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>EMI</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            loans.map((l) => (

                                <tr key={l.loanNumber}>

                                    <td>{l.loanNumber}</td>
                                    <td>{l.loanType}</td>
                                    <td>₹ {l.loanAmount}</td>
                                    <td>₹ {l.emiAmount}</td>
                                    <td>{l.status}</td>

                                    <td>

                                        <button
                                            className="btn btn-success btn-sm"
                                            disabled={l.status !== "APPROVED"}
                                            onClick={() => handlePayEmi(l.loanNumber)}
                                        >

                                            Pay EMI

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

            <Footer />

        </>

    );

}

export default Loan;