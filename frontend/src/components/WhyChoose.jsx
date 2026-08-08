import {
  FaShieldAlt,
  FaBolt,
  FaMobileAlt,
  FaHeadset,
} from "react-icons/fa";

import "../assets/styles/whyChoose.css";

function WhyChoose() {
  return (
    <section className="why-section">

      <div className="container">

        <div className="text-center mb-5">
          <h2 className="section-title">Why Choose FinFlow?</h2>

          <p className="section-subtitle">
            Banking designed for speed, security and convenience.
          </p>
        </div>

        <div className="row g-4">

          <div className="col-md-6 col-lg-3">
            <div className="why-card">

              <FaShieldAlt className="why-icon"/>

              <h5>Secure Banking</h5>

              <p>
                Your data and transactions are protected with modern security.
              </p>

            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="why-card">

              <FaBolt className="why-icon"/>

              <h5>Fast Transfers</h5>

              <p>
                Send money instantly with reliable transaction processing.
              </p>

            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="why-card">

              <FaMobileAlt className="why-icon"/>

              <h5>Simple Interface</h5>

              <p>
                Easy-to-use dashboard for all your banking services.
              </p>

            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="why-card">

              <FaHeadset className="why-icon"/>

              <h5>24×7 Support</h5>

              <p>
                Get help whenever you need it.
              </p>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default WhyChoose;