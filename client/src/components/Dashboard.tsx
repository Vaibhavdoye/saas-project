import ProjectSection from "./ProjectSection";
import TaskSection from "./TaskSection";
import SubscriptionSection from "./SubscriptionSection";

function Dashboard() {
  return (
    <section className="dashboard">
      <div className="dashboard-heading">
        <div>
          <h2>Dashboard</h2>
          <p>Welcome to your SaaS Dashboard</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <ProjectSection />
        <TaskSection />
        <SubscriptionSection />
      </div>
    </section>
  );
}

export default Dashboard;