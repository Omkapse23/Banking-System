import "./../assets/styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">

            <div className="container">

                {/* Logo */}

                <a className="navbar-brand d-flex align-items-center" href="#">

                    <div className="logo-box">
                        FF
                    </div>

                    <span className="brand-name">
                        FinFlow
                    </span>

                </a>

                {/* Mobile Toggle */}

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                {/* Menu */}

                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarContent"
                >

                    <ul className="navbar-nav align-items-center">

                        <li className="nav-item">

                            <a className="nav-link" href="#">
                                Home
                            </a>

                        </li>

                        <li className="nav-item">

                            <a className="nav-link" href="#">
                                Features
                            </a>

                        </li>

                        <li className="nav-item">

                            <a className="nav-link" href="#">
                                Services
                            </a>

                        </li>

                        <li className="nav-item">

                            <a className="nav-link" href="#">
                                About
                            </a>

                        </li>

                        {/* Customer Login */}

                        <li className="nav-item ms-3">

                            <button
                                className="btn btn-outline-primary px-4"
                                onClick={() =>
                                    navigate("/login", {
                                        state: {
                                            role: "customer"
                                        }
                                    })
                                }
                            >

                                Login

                            </button>

                        </li>

                        {/* Admin Login */}

                        <li className="nav-item ms-2">

                            <button
                                className="btn btn-outline-dark px-4"
                                onClick={() =>
                                    navigate("/login", {
                                        state: {
                                            role: "admin"
                                        }
                                    })
                                }
                            >

                                Admin Login

                            </button>

                        </li>

                        {/* Register */}

                        <li className="nav-item ms-2">

                            <Link
                                to="/register"
                                className="btn btn-primary px-4 register-btn"
                            >

                                Register

                            </Link>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;