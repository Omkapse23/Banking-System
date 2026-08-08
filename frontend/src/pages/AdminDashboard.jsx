import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

function AdminDashboard() {

    const navigate = useNavigate();

    const admin = JSON.parse(localStorage.getItem("admin"));

    useEffect(() => {

        if (!admin) {

            navigate("/");

        }

    }, [admin, navigate]);

    return (

        <>

            <AdminNavbar />

            <div
                className="container py-5"
                style={{
                    marginTop: "90px",
                    minHeight: "calc(100vh - 210px)"
                }}
            >

                <h2 className="mb-3">

                    Welcome,
                    <span className="text-primary">

                        {" "}{admin?.adminName}

                    </span>

                </h2>

                <p className="text-muted mb-5">

                    Manage customer loan applications.

                </p>

                <div className="row">

                    <div className="col-md-4">

                        <div className="card shadow">

                            <div className="card-body">

                                <h4 className="mb-3">

                                    🏦 Loan Management

                                </h4>

                                <p>

                                    View all pending loan applications and approve or reject them.

                                </p>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate("/admin/loans")}
                                >

                                    Open

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

}

export default AdminDashboard;