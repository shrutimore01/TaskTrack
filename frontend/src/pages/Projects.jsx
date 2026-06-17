import Layout from "../components/Layout";

function Projects() {
  return (
    <Layout>
      <div className="projects-page">
        <div className="page-header">
          <div>
            <h1>Projects</h1>
            <p>Manage all organization projects from here.</p>
          </div>

          <button className="create-btn">Create Project</button>
        </div>

        <div className="project-form-card">
          <h2>Create New Project</h2>

          <div className="project-form">
            <input type="text" placeholder="Project Name" />
            <input type="text" placeholder="Description" />
            <input type="date" />
            <input type="date" />

            <select>
              <option value="">Select Status</option>
              <option value="PLANNING">Planning</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="ON_HOLD">On Hold</option>
            </select>

            <button>Create Project</button>
          </div>
        </div>

        <div className="project-table-card">
          <h2>Project List</h2>

          <div className="project-card-list">
            <div className="project-list-card">
              <div className="project-card-top">
                <div>
                  <h3>TaskFlow Web App</h3>
                  <p>Enterprise project management platform</p>
                </div>

                <span className="status in-progress">In Progress</span>
              </div>

              <div className="project-card-dates">
                <span>Start: 2026-06-01</span>
                <span>End: 2026-07-15</span>
              </div>

              <div className="project-actions">
                <button className="view-btn">View</button>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </div>
            </div>

            <div className="project-list-card">
              <div className="project-card-top">
                <div>
                  <h3>HR Management</h3>
                  <p>Employee and payroll management system</p>
                </div>

                <span className="status completed">Completed</span>
              </div>

              <div className="project-card-dates">
                <span>Start: 2026-05-10</span>
                <span>End: 2026-06-30</span>
              </div>

              <div className="project-actions">
                <button className="view-btn">View</button>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </div>
            </div>

            <div className="project-list-card">
              <div className="project-card-top">
                <div>
                  <h3>CRM Portal</h3>
                  <p>Customer relationship management dashboard</p>
                </div>

                <span className="status planning">Planning</span>
              </div>

              <div className="project-card-dates">
                <span>Start: 2026-06-05</span>
                <span>End: 2026-08-01</span>
              </div>

              <div className="project-actions">
                <button className="view-btn">View</button>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Projects;