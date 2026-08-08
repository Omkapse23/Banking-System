import { Link, useNavigate } from "react-router-dom";
import {
    FaHome,
    FaFileInvoiceDollar,
    FaSignOutAlt,
    FaUserShield
} from "react-icons/fa";
import Logo from "./Logo";

function AdminNavbar() {

    const navigate = useNavigate();

    const admin = JSON.parse(localStorage.getItem("admin"));

    const handleLogout = () => {

        localStorage.removeItem("admin");

        navigate("/");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">

            <div className="container">

                <Link
                    className="navbar-brand d-flex align-items-center"
                    to="/"
                >

                    <Logo />

                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#adminNavbar"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className="collapse navbar-collapse"
                    id="adminNavbar"
                >

                    <ul className="navbar-nav ms-auto align-items-center">

                        <li className="nav-item me-3">

                            <Link
                                className="nav-link fw-semibold"
                                to="/"
                            >

                                <FaHome className="me-1" />

                                Home

                            </Link>

                        </li>

                        <li className="nav-item me-4">

                            <Link
                                className="nav-link fw-semibold"
                                to="/admin/loans"
                            >

                                <FaFileInvoiceDollar className="me-1" />

                                Loan Management

                            </Link>

                        </li>

                        <li className="nav-item me-4">

                            <span className="fw-semibold text-primary">

                                <FaUserShield className="me-2" />

                                {admin?.adminName}

                            </span>

                        </li>

                        <li className="nav-item">

                            <button
                                className="btn btn-danger"
                                onClick={handleLogout}
                            >

                                <FaSignOutAlt className="me-2" />

                                Logout

                            </button>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default AdminNavbar;