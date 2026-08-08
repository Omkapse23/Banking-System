import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginCustomer } from "../services/customerService";
import { loginAdmin } from "../services/adminService";
import { getAccountByCustomer } from "../services/accountService";
import "../assets/styles/login.css";

function Login() {

    const navigate = useNavigate();
    const location = useLocation();

    const role = location.state?.role;

    useEffect(() => {

        if (!role) {

            navigate("/");

        }

    }, [role, navigate]);

    const [loginData, setLoginData] = useState({

        email: "",
        password: ""

    });

    const handleChange = (e) => {

        setLoginData({

            ...loginData,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (role === "customer") {

                const response = await loginCustomer(loginData);

                localStorage.setItem(
                    "customer",
                    JSON.stringify(response.data)
                );

                try {

                    const accountResponse =
                        await getAccountByCustomer(
                            response.data.customerId
                        );

                    localStorage.setItem(
                        "account",
                        JSON.stringify(accountResponse.data)
                    );

                } catch (error) {

                    localStorage.removeItem("account");

                }

                navigate("/dashboard");

            } else if (role === "admin") {

                const response = await loginAdmin(loginData);

                localStorage.setItem(
                    "admin",
                    JSON.stringify(response.data)
                );

                navigate("/admin/dashboard");

            }

        } catch (error) {

            console.log(error);

            if (error.response) {

                alert(error.response.data.message);

            } else {

                alert("Server Error");

            }

        }

    };

    if (!role) {

        return null;

    }

    return (

        <section className="login-page">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-5">

                        <div className="login-card">

                            <h2 className="text-center mb-4">

                                {role === "customer"
                                    ? "Customer Login"
                                    : "Admin Login"}

                            </h2>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={loginData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label>Password</label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={loginData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <button
                                    className={`btn ${role === "customer"
                                        ? "btn-primary"
                                        : "btn-dark"} w-100`}
                                    type="submit"
                                >

                                    Login

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default Login;