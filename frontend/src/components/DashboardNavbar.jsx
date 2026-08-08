import { Link, useNavigate } from "react-router-dom";
import { FaUniversity, FaSignOutAlt, FaHome, FaTachometerAlt } from "react-icons/fa";
import Logo from "./Logo";

function DashboardNavbar() {

    const navigate = useNavigate();

    const customer = JSON.parse(localStorage.getItem("customer"));

    const handleLogout = () => {

        localStorage.removeItem("customer");
        localStorage.removeItem("account");

        navigate("/login");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold d-flex align-items-center"
                    to="/"
                >

                    <Logo />

                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
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
                                to="/dashboard"
                            >

                                <FaTachometerAlt className="me-1" />
                                Dashboard

                            </Link>

                        </li>

                        <li className="nav-item me-4">

                            <span className="fw-semibold text-primary">

                                👋 {customer?.firstName}

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

export default DashboardNavbar;