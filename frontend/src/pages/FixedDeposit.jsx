import { useState } from "react";
import { createFD, getFDs, closeFD } from "../services/fixedDepositService";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";
import { getAccountByCustomer } from "../services/accountService";

function FixedDeposit() {
    
    const navigate = useNavigate();

    const account = JSON.parse(localStorage.getItem("account"));

    const [fd, setFd] = useState({

        accountNumber: account.accountNumber,
        principalAmount: "",
        tenureMonths: ""

    });

    const [fdList, setFdList] = useState([]);

    const handleChange = (e) => {

        setFd({

            ...fd,
            [e.target.name]: e.target.value

        });

    };

    const loadFDs = async () => {

        if (!fd.accountNumber) return;

        try {

            const response = await getFDs(fd.accountNumber);

            setFdList(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createFD(fd);

            const customer = JSON.parse(localStorage.getItem("customer"));

            const response = await getAccountByCustomer(customer.customerId);

            localStorage.setItem(
                "account",
                JSON.stringify(response.data)
            );

            alert("Fixed Deposit Created Successfully");

            navigate("/dashboard");


        } catch (error) {

            console.log(error);

            alert("Unable to Create FD");

        }

    };

    const handleCloseFD = async (fdNumber) => {

        try {

            await closeFD(fdNumber);

            const customer = JSON.parse(localStorage.getItem("customer"));

            const response = await getAccountByCustomer(customer.customerId);

            localStorage.setItem(
                "account",
                JSON.stringify(response.data)
            );

            alert("FD Closed Successfully");

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert("Unable to Close FD");

        }

    };

    return (

        <>

            <DashboardNavbar />

        <div className="container py-5" style={{ marginTop: "100px" }}>

            <h2 className="mb-4">Fixed Deposit</h2>

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

                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Principal Amount"
                    name="principalAmount"
                    value={fd.principalAmount}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Tenure (Months)"
                    name="tenureMonths"
                    value={fd.tenureMonths}
                    onChange={handleChange}
                    required
                />

                <button className="btn btn-danger">

                    Create Fixed Deposit

                </button>

            </form>

            <button
                className="btn btn-dark mt-4 mb-3"
                onClick={loadFDs}
            >

                Load My FDs

            </button>

            <table className="table table-bordered">

                <thead>

                    <tr>

                        <th>FD Number</th>
                        <th>Amount</th>
                        <th>Interest</th>
                        <th>Maturity</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        fdList.map((item) => (

                            <tr key={item.fdNumber}>

                                <td>{item.fdNumber}</td>

                                <td>₹ {item.principalAmount}</td>

                                <td>{item.interestRate}%</td>

                                <td>₹ {item.maturityAmount}</td>

                                <td>{item.status}</td>

                                <td>

                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleCloseFD(item.fdNumber)}
                                    >

                                        Close FD

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

export default FixedDeposit;