import { Link } from "react-router-dom";

function Logo() {

    return (

        <Link
            className="navbar-brand d-flex align-items-center text-decoration-none"
            to="/"
        >

            <div className="logo-box">
                FF
            </div>

            <span className="brand-name">
                FinFlow
            </span>

        </Link>

    );

}

export default Logo;