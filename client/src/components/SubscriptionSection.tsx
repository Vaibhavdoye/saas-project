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
    <section>
      <h3>Subscription</h3>

      <select value={plan} onChange={(e) => setPlan(e.target.value)}>
       <option value="free">Free</option>
<option value="pro">Pro</option>
<option value="enterprise">Enterprise</option>
      </select>

      <br />

      <button onClick={handleSubscribe}>Subscribe</button>
    </section>
  );
}

export default SubscriptionSection;