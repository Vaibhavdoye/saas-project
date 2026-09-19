import ProjectSection from "./ProjectSection";
import TaskSection from "./TaskSection";
import SubscriptionSection from "./SubscriptionSection";
function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your SaaS Dashboard</p>

      <ProjectSection />

     <TaskSection />
     <SubscriptionSection />
    </div>
  );
}

export default Dashboard;