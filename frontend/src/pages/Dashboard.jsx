import Layout from "../components/Layout";

function Dashboard() {
  return (
    <Layout>
      <div className="dashboard">

        <h1>Dashboard Overview</h1>

        <div className="stats">

          <div className="card">
            <h3>Total Projects</h3>
            <p>8</p>
          </div>

          <div className="card">
            <h3>Total Tasks</h3>
            <p>145</p>
          </div>

          <div className="card">
            <h3>Completed Tasks</h3>
            <p>70</p>
          </div>

          <div className="card">
            <h3>Pending Tasks</h3>
            <p>75</p>
          </div>

        </div>

        <div className="dashboard-grid">

          <div className="section-card">
            <h2>Recent Projects</h2>

            <div className="project-item">
              <span>TaskFlow Web App</span>
              <span>80%</span>
            </div>

            <div className="project-item">
              <span>HR Management</span>
              <span>65%</span>
            </div>

            <div className="project-item">
              <span>CRM Portal</span>
              <span>90%</span>
            </div>
          </div>

          <div className="section-card">
            <h2>Recent Tasks</h2>

            <div className="task-item">
              Design Login Page
            </div>

            <div className="task-item">
              Create JWT Authentication
            </div>

            <div className="task-item">
              Build REST APIs
            </div>
          </div>

          <div className="section-card">
            <h2>Team Activity</h2>

            <div className="activity-item">
              John assigned a task
            </div>

            <div className="activity-item">
              Sarah completed UI Design
            </div>

            <div className="activity-item">
              Mike created a new project
            </div>
          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;