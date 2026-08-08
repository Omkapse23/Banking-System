import { useState } from "react";
import "../assets/styles/register.css";
import { registerCustomer } from "../services/customerService";
import { useNavigate } from "react-router-dom";

function Register() {

    const [step, setStep] = useState(1);

    const [customer, setCustomer] = useState({

        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        email: "",
        password: "",
        phone: "",
        aadhaar: "",
        pan: "",
        address: "",
        city: "",
        state: "",
        pincode: ""

    });

    const handleChange = (e) => {

        setCustomer({

            ...customer,
            [e.target.name]: e.target.value

        });

    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await registerCustomer(customer);

            alert("Customer Registered Successfully");

            navigate("/login");

        }
        catch(error) {

            console.log(error);

            if(error.response){

                alert(error.response.data.message || "Registration Failed");

            }
            else{

                alert("Server Error");

            }

        }

    };

    return (

        <section className="register-page">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-7">

                        <div className="register-card">

                            <h2 className="text-center mb-4">
                                Create Your Account
                            </h2>

                            <form onSubmit={handleSubmit}>

                                {/* STEP 1 */}

                                {step === 1 && (

                                    <>

                                        <div className="row">

                                            <div className="col-md-6 mb-3">

                                                <label>First Name</label>

                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    className="form-control"
                                                    value={customer.firstName}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                            <div className="col-md-6 mb-3">

                                                <label>Last Name</label>

                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    className="form-control"
                                                    value={customer.lastName}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6 mb-3">

                                                <label>Gender</label>

                                                <select
                                                    name="gender"
                                                    className="form-control"
                                                    value={customer.gender}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="MALE">Male</option>
                                                    <option value="FEMALE">Female</option>
                                                    <option value="OTHER">Other</option>
                                                </select>

                                            </div>

                                            <div className="col-md-6 mb-3">

                                                <label>Date of Birth</label>

                                                <input
                                                    type="date"
                                                    name="dob"
                                                    className="form-control"
                                                    value={customer.dob}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                        </div>

                                        <div className="mb-3">

                                            <label>Email</label>

                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                value={customer.email}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="mb-4">

                                            <label>Password</label>

                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                value={customer.password}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <button
                                            type="button"
                                            className="btn btn-primary w-100"
                                            onClick={() => setStep(2)}
                                        >
                                            Next →
                                        </button>

                                    </>

                                )}

                                {/* STEP 2 */}

                                {step === 2 && (

                                    <>

                                        <div className="mb-3">

                                            <label>Phone</label>

                                            <input
                                                type="text"
                                                name="phone"
                                                className="form-control"
                                                value={customer.phone}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="mb-3">

                                            <label>Aadhaar</label>

                                            <input
                                                type="text"
                                                name="aadhaar"
                                                className="form-control"
                                                value={customer.aadhaar}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="mb-3">

                                            <label>PAN</label>

                                            <input
                                                type="text"
                                                name="pan"
                                                className="form-control"
                                                value={customer.pan}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="mb-3">

                                            <label>Address</label>

                                            <textarea
                                                name="address"
                                                className="form-control"
                                                value={customer.address}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6 mb-3">

                                                <label>City</label>

                                                <input
                                                    type="text"
                                                    name="city"
                                                    className="form-control"
                                                    value={customer.city}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                            <div className="col-md-6 mb-3">

                                                <label>State</label>

                                                <input
                                                    type="text"
                                                    name="state"
                                                    className="form-control"
                                                    value={customer.state}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                        </div>

                                        <div className="mb-4">

                                            <label>Pincode</label>

                                            <input
                                                type="text"
                                                name="pincode"
                                                className="form-control"
                                                value={customer.pincode}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="d-flex justify-content-between">

                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => setStep(1)}
                                            >
                                                ← Back
                                            </button>

                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                Register
                                            </button>

                                        </div>

                                    </>

                                )}

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );
}

export default Register;