import {FaExchangeAlt,  FaUniversity, FaPiggyBank, FaHandHoldingUsd} from "react-icons/fa";

import "../assets/styles/features.css";

function Features() {

    const features = [
        {
            icon: <FaUniversity />,
            title: "Account Management",
            description: "Create and manage your bank account securely."
        },
        {
            icon: <FaExchangeAlt />,
            title: "Instant Transfers",
            description: "Transfer money instantly between bank accounts."
        },
        {
            icon: <FaPiggyBank />,
            title: "Fixed Deposits",
            description: "Invest your savings and earn attractive returns."
        },
        {
            icon: <FaHandHoldingUsd />,
            title: "Loan Services",
            description: "Apply, approve and repay loans with ease."
        }
    ];

    return (
        <section className="features-section">

            <div className="container">

                <div className="text-center mb-5">

                    <h2 className="section-title">
                        Our Banking Services
                    </h2>

                    <p className="section-subtitle">
                        Everything you need to manage your finances in one secure platform.
                    </p>

                </div>

                <div className="row g-4">

                    {features.map((feature, index) => (

                        <div className="col-md-6 col-lg-3" key={index}>

                            <div className="feature-card">

                                <div className="feature-icon">
                                    {feature.icon}
                                </div>

                                <h5>{feature.title}</h5>

                                <p>{feature.description}</p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default Features;