import { useState } from "react";

function SubscriptionSection() {
  const [plan, setPlan] = useState("free");

  const handleSubscribe = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/subscriptions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            plan,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Subscription created successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <section className="subscription-section">
      <div className="section-header">
        <div>
          <h3>Subscription</h3>
          <p>Choose a plan for your SaaS account.</p>
        </div>
      </div>

      <div className="subscription-plans">
        <div
          className={`plan-card ${plan === "free" ? "selected" : ""}`}
          onClick={() => setPlan("free")}
        >
          <h4>Free</h4>
          <div className="plan-price">₹0</div>
          <p>Basic access</p>
          <button className="plan-button">Select</button>
        </div>

        <div
          className={`plan-card ${plan === "pro" ? "selected" : ""}`}
          onClick={() => setPlan("pro")}
        >
          <h4>Pro</h4>
          <div className="plan-price">₹499</div>
          <p>Advanced features</p>
          <button className="plan-button">Select</button>
        </div>

        <div
          className={`plan-card ${plan === "enterprise" ? "selected" : ""}`}
          onClick={() => setPlan("enterprise")}
        >
          <h4>Enterprise</h4>
          <div className="plan-price">₹999</div>
          <p>Complete business access</p>
          <button className="plan-button">Select</button>
        </div>
      </div>

      <div className="subscribe-area">
        <p>
          Selected Plan: <strong>{plan}</strong>
        </p>

        <button className="primary-button" onClick={handleSubscribe}>
          Subscribe
        </button>
      </div>
    </section>
  );
}

export default SubscriptionSection;