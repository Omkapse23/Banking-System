import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transfer from "./pages/Transfer";
import Transactions from "./pages/Transactions";
import Loan from "./pages/Loan";
import FixedDeposit from "./pages/FixedDeposit";
import Account from "./pages/Account";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import AdminDashboard from "./pages/AdminDashboard";
import LoanManagement from "./pages/LoanManagement";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<LandingPage />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/transfer" element={<Transfer />} />

                <Route path="/transactions" element={<Transactions />} />

                <Route path="/loan" element={<Loan />} />

                <Route path="/fd" element={<FixedDeposit />} />

                <Route path="/account" element={<Account />} />

                <Route path="/deposit" element={<Deposit />} />

                <Route path="/withdraw" element={<Withdraw />} />

                <Route path="/admin/dashboard" element={<AdminDashboard />} />

                <Route path="/admin/loans" element={<LoanManagement />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;