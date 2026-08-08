import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import {
    getAllLoans,
    approveLoan,
    rejectLoan
} from "../services/adminLoanService";

function LoanManagement() {

    const navigate = useNavigate();

    const admin = JSON.parse(localStorage.getItem("admin"));

    const [loans, setLoans] = useState([]);

    useEffect(() => {

        if (!admin) {

            navigate("/");

            return;

        }

        loadLoans();

    }, [admin, navigate]);

    const loadLoans = async () => {

        try {

            const response = await getAllLoans();

            setLoans(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to load loan applications");

        }

    };

    const handleApprove = async (loanNumber) => {

        try {

            await approveLoan(loanNumber);

            alert("Loan Approved Successfully");

            loadLoans();

        } catch (error) {

            console.log(error);

            if (error.response) {

                alert(error.response.data.message);

            } else {

                alert("Server Error");

            }

        }

    };

    const handleReject = async (loanNumber) => {

        try {

            await rejectLoan(loanNumber);

            alert("Loan Rejected Successfully");

            loadLoans();

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

            <AdminNavbar />

            <div
                className="container py-5"
                style={{
                    marginTop: "80px",
                    minHeight: "80vh"
                }}
            >

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>

                        Loan Applications

                    </h2>

                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/admin/dashboard")}
                    >

                        Back

                    </button>

                </div>

                <div className="table-responsive">

                    <table className="table table-bordered table-hover align-middle">

                        <thead className="table-dark">

                            <tr>

                                <th>Loan No</th>
                                <th>Account No</th>
                                <th>Loan Type</th>
                                <th>Amount</th>
                                <th>Occupation</th>
                                <th>Employer</th>
                                <th>Income</th>
                                <th>Experience</th>
                                <th>Status</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                loans.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="10"
                                            className="text-center"
                                        >

                                            No Loan Applications

                                        </td>

                                    </tr>

                                ) : (

                                    loans.map((loan) => (

                                        <tr key={loan.loanNumber}>

                                            <td>{loan.loanNumber}</td>

                                            <td>{loan.accountNumber}</td>

                                            <td>{loan.loanType}</td>

                                            <td>₹ {loan.loanAmount}</td>

                                            <td>{loan.occupation}</td>

                                            <td>{loan.employerName}</td>

                                            <td>₹ {loan.monthlyIncome}</td>

                                            <td>{loan.experienceYears} Years</td>

                                            <td>

                                                {loan.status === "PENDING" && (
                                                    <span className="badge bg-warning text-dark">
                                                        Pending
                                                    </span>
                                                )}

                                                {loan.status === "APPROVED" && (
                                                    <span className="badge bg-success">
                                                        Approved
                                                    </span>
                                                )}

                                                {loan.status === "REJECTED" && (
                                                    <span className="badge bg-danger">
                                                        Rejected
                                                    </span>
                                                )}

                                                {loan.status === "CLOSED" && (
                                                    <span className="badge bg-primary">
                                                        Closed
                                                    </span>
                                                )}

                                            </td>

                                            <td>

                                                {loan.status === "PENDING" ? (

                                                    <>

                                                        <button
                                                            className="btn btn-success btn-sm me-2"
                                                            onClick={() =>
                                                                handleApprove(
                                                                    loan.loanNumber
                                                                )
                                                            }
                                                        >

                                                            Approve

                                                        </button>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                handleReject(
                                                                    loan.loanNumber
                                                                )
                                                            }
                                                        >

                                                            Reject

                                                        </button>

                                                    </>

                                                ) : (

                                                    <span>-</span>

                                                )}

                                            </td>

                                        </tr>

                                    ))

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

            <Footer />

        </>

    );

}

export default LoanManagement;