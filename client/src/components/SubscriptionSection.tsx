import { useEffect, useState } from "react";

function SubscriptionSection() {
  const [plan, setPlan] = useState("free");
  const [subscribedPlan, setSubscribedPlan] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://saas-backend-nx6q.onrender.com/api/subscriptions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok && data.subscriptions?.length > 0) {
          const latestSubscription =
            data.subscriptions[data.subscriptions.length - 1];

          setPlan(latestSubscription.plan);
          setSubscribedPlan(latestSubscription.plan);
        }
      } catch (error) {
        console.error("Failed to fetch subscription");
      }
    };

    fetchSubscription();
  }, []);

  const handleSubscribe = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://saas-backend-nx6q.onrender.com/api/subscriptions",
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
        setSubscribedPlan(data.subscription.plan);
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
          className={`plan-card ${
            plan === "enterprise" ? "selected" : ""
          }`}
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

        {subscribedPlan && (
          <p>
            Current Subscription: <strong>{subscribedPlan}</strong>
          </p>
        )}

        <button className="primary-button" onClick={handleSubscribe}>
          Subscribe
        </button>
      </div>
    </section>
  );
}

export default SubscriptionSection;