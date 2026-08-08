import "../assets/styles/hero.css";
import { FaArrowRight } from "react-icons/fa";
import BankingImage from "../assets/images/banking.svg";

function Hero() {
    return (
        <section className="hero">
            <div className="container">
                <div className="row align-items-center">

                    {/* Left */}
                    <div className="col-lg-6">

                        <span className="hero-tag">
                            Modern Digital Banking
                        </span>

                        <h1 className="hero-title">
                            Manage Your Money
                            <br />
                            <span>Like Never Before.</span>
                        </h1>

                        <p className="hero-description">
                            Secure banking platform with instant transfers,
                            fixed deposits, loans and complete account management.
                        </p>

                        <div className="mt-4">

                            <button className="btn btn-primary btn-lg me-3">
                                Open Account
                            </button>

                            <button className="btn btn-outline-primary btn-lg">
                                Learn More
                                <FaArrowRight className="ms-2"/>
                            </button>

                        </div>

                    </div>

                    {/* Right */}

                    <div className="col-lg-6 text-center">

                        <img
                            src={BankingImage}
                            alt="Banking"
                            className="hero-image"
                        />


                    </div>

                </div>
            </div>
        </section>
    );
}

export default Hero;