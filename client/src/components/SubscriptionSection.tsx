import { useEffect, useState } from "react";

function SubscriptionSection() {
  const [plan, setPlan] = useState("free");
  const [subscribedPlan, setSubscribedPlan] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [paymentDone, setPaymentDone] = useState(false);
    const [transactionId, setTransactionId] = useState<string | null>(null);

  const [payments, setPayments] = useState<any[]>([]);
const [showPayments, setShowPayments] = useState(false);
  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://saas-backend-nx6q.onrender.com/api/payments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setPayments(data.payments || []);
      }
    } catch (error) {
      console.error("Failed to fetch payments");
    }
  };


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
          setSubscriptionId(latestSubscription._id);
        }
      } catch (error) {
        console.error("Failed to fetch subscription");
      }
    };

    fetchSubscription();
    fetchPayments();
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
        setSubscriptionId(data.subscription._id);
        setPaymentDone(false);
        setTransactionId(null);

        alert("Subscription created successfully");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error");
    }
  };

  const handlePayment = async () => {
    if (!subscriptionId) {
      alert("Please subscribe to a plan first");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const amount =
        plan === "pro" ? 499 : plan === "enterprise" ? 999 : 0;

      const response = await fetch(
        "https://saas-backend-nx6q.onrender.com/api/payments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            subscriptionId,
            amount,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setPaymentDone(true);
        setTransactionId(data.payment.transactionId);

        alert("Simulated payment successful");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Payment failed");
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
        <button
  className="primary-button"
  onClick={() => setShowPayments(!showPayments)}
>
  {showPayments ? "Hide Payment History" : "Payment History"}
</button>
{showPayments && (
  <div className="payment-history">
    <h4>Payment History</h4>

    {payments.length === 0 ? (
      <p>No payments found.</p>
    ) : (
      payments.map((payment) => (
        <div className="payment-item" key={payment._id}>
          <p>
            Amount: <strong>₹{payment.amount}</strong>
          </p>
          <p>
            Status: <strong>{payment.status}</strong>
          </p>
          <p>
            Transaction ID: <strong>{payment.transactionId}</strong>
          </p>
          <p>
            Payment Method: <strong>{payment.paymentMethod}</strong>
          </p>
        </div>
      ))
    )}
  </div>
)}

        {subscribedPlan && !paymentDone && (
          <button className="primary-button" onClick={handlePayment}>
            Make Payment
          </button>
        )}

        {paymentDone && (
          <p>
            Payment Status: <strong>Success</strong>
            <br />
            Transaction ID: <strong>{transactionId}</strong>
          </p>
        )}
      </div>
    </section>
  );
}

export default SubscriptionSection;