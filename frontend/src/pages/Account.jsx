import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import { createAccount } from "../services/accountService";
import { getBranches } from "../services/branchService";
import Footer from "../components/Footer";

function Account() {

    const navigate = useNavigate();

    const customer = JSON.parse(localStorage.getItem("customer"));
    const savedAccount = JSON.parse(localStorage.getItem("account"));

    const [branches, setBranches] = useState([]);

    const [account, setAccount] = useState({

        customerId: customer.customerId,
        branchId: "",
        accountType: "SAVINGS"

    });

    useEffect(() => {

        loadBranches();

    }, []);

    const loadBranches = async () => {

        try {

            const response = await getBranches();

            setBranches(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setAccount({

            ...account,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await createAccount(account);

            localStorage.setItem(
                "account",
                JSON.stringify(response.data)
            );

            alert("Account Created Successfully");

            window.location.reload();

        } catch (error) {

            console.log(error);

            if (typeof error.response?.data === "string") {

                alert(error.response.data);

            } else if (error.response?.data?.message) {

                alert(error.response.data.message);

            } else {

                alert("Unable to create account");

            }

        }

    };

    return (

        <>

            <DashboardNavbar />

            <div className="container py-5" style={{ marginTop: "120px" }}>

                {

                    !savedAccount ? (

                        <div className="row justify-content-center">

                            <div className="col-lg-6">

                                <div className="card shadow border-0 p-4">

                                    <h3 className="text-center mb-4">

                                        🏦 Open Bank Account

                                    </h3>

                                    <form onSubmit={handleSubmit}>

                                        <div className="mb-3">

                                            <label className="form-label">

                                                Branch

                                            </label>

                                            <select
                                                className="form-select"
                                                name="branchId"
                                                value={account.branchId}
                                                onChange={handleChange}
                                            >

                                                <option value="">
                                                    Select Branch
                                                </option>

                                                {

                                                    branches.map((branch) => (

                                                        <option
                                                            key={branch.branchId}
                                                            value={branch.branchId}
                                                        >

                                                            {branch.branchName}

                                                        </option>

                                                    ))

                                                }

                                            </select>

                                        </div>

                                        <div className="mb-4">

                                            <label className="form-label">

                                                Account Type

                                            </label>

                                            <select
                                                className="form-select"
                                                name="accountType"
                                                value={account.accountType}
                                                onChange={handleChange}
                                            >

                                                <option value="SAVINGS">

                                                    Savings

                                                </option>

                                                <option value="CURRENT">

                                                    Current

                                                </option>

                                            </select>

                                        </div>

                                        <button className="btn btn-primary w-100">

                                            Create Account

                                        </button>

                                    </form>

                                </div>

                            </div>

                        </div>

                    ) : (

                        <div className="row justify-content-center">

                            <div className="col-lg-8">

                                <div className="card shadow border-0">

                                    <div className="card-header bg-primary text-white text-center py-4">

                                        <h3 className="mb-0">

                                            🏦 My Account

                                        </h3>

                                    </div>

                                    <div className="card-body p-5">

                                        <div className="text-center mb-5">

                                            <div
                                                className="rounded-circle bg-primary text-white mx-auto d-flex justify-content-center align-items-center"
                                                style={{
                                                    width: "90px",
                                                    height: "90px",
                                                    fontSize: "34px",
                                                    fontWeight: "bold"
                                                }}
                                            >

                                                {savedAccount.customerName.charAt(0)}

                                            </div>

                                            <h3 className="mt-3">

                                                {savedAccount.customerName}

                                            </h3>

                                        </div>

                                        <div className="row g-4">

                                            <div className="col-md-6">

                                                <div className="border rounded p-3">

                                                    <small className="text-muted">

                                                        Account Number

                                                    </small>

                                                    <h5 className="mt-2">

                                                        {savedAccount.accountNumber}

                                                    </h5>

                                                </div>

                                            </div>

                                            <div className="col-md-6">

                                                <div className="border rounded p-3">

                                                    <small className="text-muted">

                                                        Branch

                                                    </small>

                                                    <h5 className="mt-2">

                                                        {savedAccount.branchName}

                                                    </h5>

                                                </div>

                                            </div>

                                            <div className="col-md-6">

                                                <div className="border rounded p-3">

                                                    <small className="text-muted">

                                                        Account Type

                                                    </small>

                                                    <h5 className="mt-2">

                                                        <span className="badge bg-success fs-6">

                                                            {savedAccount.accountType}

                                                        </span>

                                                    </h5>

                                                </div>

                                            </div>

                                            <div className="col-md-6">

                                                <div className="border rounded p-3 bg-light">

                                                    <small className="text-muted">

                                                        Available Balance

                                                    </small>

                                                    <h3 className="mt-2 text-success fw-bold">

                                                        ₹ {savedAccount.balance.toLocaleString("en-IN")}

                                                    </h3>

                                                </div>

                                            </div>

                                        </div>

                                        <div className="text-center mt-5">

                                            <button
                                                className="btn btn-primary px-5"
                                                onClick={() => navigate("/dashboard")}
                                            >

                                                Back to Dashboard

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )

                }

            </div>

            <Footer />

        </>

    );

}

export default Account;