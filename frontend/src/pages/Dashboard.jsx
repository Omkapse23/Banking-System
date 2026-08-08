import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAccountByCustomer } from "../services/accountService";
import {
    FaMoneyCheckAlt,
    FaUniversity,
    FaPiggyBank,
    FaHistory,
    FaWallet
} from "react-icons/fa";

import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";
import "../assets/styles/dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    useEffect(() => {

    const loadDashboard = async () => {

        const customerData = JSON.parse(
            localStorage.getItem("customer")
        );

        if (!customerData) {

            navigate("/login");
            return;

        }

        try {

            const response = await getAccountByCustomer(
                customerData.customerId
            );

            localStorage.setItem(
                "account",
                JSON.stringify(response.data)
            );

            setAccount(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    loadDashboard();

}, [navigate]);

    const customer = JSON.parse(localStorage.getItem("customer"));

const [account, setAccount] = useState(
    JSON.parse(localStorage.getItem("account"))
);

    return (

        <>

            <DashboardNavbar />

            <div className="container py-5" style={{ marginTop: "90px" }}>

                {/* Welcome Section */}

                <div className="mb-4">

                    <h2 className="fw-bold">

                        Welcome,
                        <span className="text-primary">
                            {" "}{customer?.firstName}
                        </span>

                    </h2>

                    <p className="text-muted">

                        Manage your banking services securely from one place.

                    </p>

                </div>

                {/* Account Summary */}

                {

                    account && (

                        <div className="card shadow-sm border-0 mb-5 rounded-4">

                            <div className="card-body p-4">

                                <div className="row align-items-center">

                                    <div className="col-lg-3">

                                        <small className="text-muted">
                                            Account Number
                                        </small>

                                        <h5 className="mb-0">

                                            {account.accountNumber}

                                        </h5>

                                    </div>

                                    <div className="col-lg-2">

                                        <small className="text-muted">
                                            Account Type
                                        </small>

                                        <h6 className="mt-2">

                                            <span className="badge bg-success">

                                                {account.accountType}

                                            </span>

                                        </h6>

                                    </div>

                                    <div className="col-lg-3">

                                        <small className="text-muted">
                                            Branch
                                        </small>

                                        <h5 className="mb-0">

                                            {account.branchName}

                                        </h5>

                                    </div>

                                    <div className="col-lg-4 text-lg-end">

                                        <small className="text-muted">

                                            Available Balance

                                        </small>

                                        <h3 className="text-success fw-bold mb-0">

                                            ₹ {account.balance.toLocaleString("en-IN")}

                                        </h3>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )

                }

                {/* Dashboard Cards */}

                <div className="row g-4">

                    {/* Account */}

                        {

                            !account && (

                                <div className="col-md-3">

                                    <div className="card dashboard-card h-100">

                                        <div className="card-body text-center">

                                            <FaWallet
                                                size={38}
                                                className="text-primary mb-3"
                                            />

                                            <h5>

                                                Open Account

                                            </h5>

                                            <p className="text-muted">

                                                Create your bank account.

                                            </p>

                                            <Link
                                                to="/account"
                                                className="btn btn-primary"
                                            >

                                                Open

                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            )

                        }

                    {account && (

                        <>

                            {/* Deposit */}

                            <div className="col-md-6 col-lg-3">

                                <div className="card dashboard-card h-100">

                                    <div className="card-body text-center">

                                        💰

                                        <h5 className="mt-3">

                                            Deposit

                                        </h5>

                                        <p className="text-muted">

                                            Deposit money into your account.

                                        </p>

                                        <Link
                                            to="/deposit"
                                            className="btn btn-success"
                                        >

                                            Open

                                        </Link>

                                    </div>

                                </div>

                            </div>

                            {/* Withdraw*/}

                            <div className="col-md-6 col-lg-3">

                                <div className="card dashboard-card h-100">

                                    <div className="card-body text-center">

                                        💸

                                        <h5 className="mt-3">

                                            Withdraw

                                        </h5>

                                        <p className="text-muted">

                                            Withdraw money from your account.

                                        </p>

                                        <Link
                                            to="/withdraw"
                                            className="btn btn-danger"
                                        >

                                            Open

                                        </Link>

                                    </div>

                                </div>

                            </div>

                            {/* Transfer */}

                            <div className="col-md-6 col-lg-3">

                                <div className="card dashboard-card h-100">

                                    <div className="card-body text-center">

                                        <FaMoneyCheckAlt
                                            size={38}
                                            className="text-success mb-3"
                                        />

                                        <h5>

                                            Transfer

                                        </h5>

                                        <p className="text-muted">

                                            Transfer money securely.

                                        </p>

                                        <Link
                                            to="/transfer"
                                            className="btn btn-success"
                                        >

                                            Open

                                        </Link>

                                    </div>

                                </div>

                            </div>

                            {/* Loan */}

                            <div className="col-md-6 col-lg-3">

                                <div className="card dashboard-card h-100">

                                    <div className="card-body text-center">

                                        <FaUniversity
                                            size={38}
                                            className="text-warning mb-3"
                                        />

                                        <h5>

                                            Loan

                                        </h5>

                                        <p className="text-muted">

                                            Apply and manage loans.

                                        </p>

                                        <Link
                                            to="/loan"
                                            className="btn btn-warning"
                                        >

                                            Open

                                        </Link>

                                    </div>

                                </div>

                            </div>

                            {/* FD */}

                            <div className="col-md-6 col-lg-3">

                                <div className="card dashboard-card h-100">

                                    <div className="card-body text-center">

                                        <FaPiggyBank
                                            size={38}
                                            className="text-danger mb-3"
                                        />

                                        <h5>

                                            Fixed Deposit

                                        </h5>

                                        <p className="text-muted">

                                            Manage your fixed deposits.

                                        </p>

                                        <Link
                                            to="/fd"
                                            className="btn btn-danger"
                                        >

                                            Open

                                        </Link>

                                    </div>

                                </div>

                            </div>

                            {/* Transactions */}

                            <div className="col-md-6 col-lg-3">

                                <div className="card dashboard-card h-100">

                                    <div className="card-body text-center">

                                        <FaHistory
                                            size={38}
                                            className="text-dark mb-3"
                                        />

                                        <h5>

                                            Transactions

                                        </h5>

                                        <p className="text-muted">

                                            View transaction history.

                                        </p>

                                        <Link
                                            to="/transactions"
                                            className="btn btn-dark"
                                        >

                                            Open

                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </>

                    )}

                </div>

            </div>

            <Footer />

        </>

    );

}

export default Dashboard;