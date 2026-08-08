import { useEffect, useState } from "react";
import { getTransactionHistory } from "../services/transactionService";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";

function Transactions() {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {

        const loadTransactions = async () => {

            try {

                const account = JSON.parse(localStorage.getItem("account"));

                const response = await getTransactionHistory(account.accountNumber);

                setTransactions(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        loadTransactions();

    }, []);

    return (

        <>

                <DashboardNavbar />

        <div className="container py-5" style={{ marginTop: "100px" }}>

            <h2 className="mb-4">
                Transaction History
            </h2>

            <table className="table table-striped table-bordered">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Balance</th>
                        <th>Status</th>
                        <th>Remarks</th>
                        <th>Date</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        transactions.map((transaction) => (

                            <tr key={transaction.transactionId}>

                                <td>{transaction.transactionId}</td>

                                <td>{transaction.transactionType}</td>

                                <td>₹ {transaction.amount}</td>

                                <td>₹ {transaction.balanceAfterTransaction}</td>

                                <td>{transaction.transactionStatus}</td>

                                <td>{transaction.remarks}</td>

                                <td>{transaction.transactionDate}</td>

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

export default Transactions;