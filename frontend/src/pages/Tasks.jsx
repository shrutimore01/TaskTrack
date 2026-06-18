import { useState } from "react";
import Layout from "../components/Layout";

const initialTasks = [
  {
    id: 1,
    name: "Design Login Page",
    priority: "High",
    status: "In Progress",
    assignedTo: "Shruti More",
    dueDate: "2026-06-25",
  },
  {
    id: 2,
    name: "Create JWT Authentication",
    priority: "High",
    status: "Pending",
    assignedTo: "Rahul Patil",
    dueDate: "2026-06-28",
  },
  {
    id: 3,
    name: "Build Dashboard",
    priority: "Medium",
    status: "Completed",
    assignedTo: "Priya Sharma",
    dueDate: "2026-06-18",
  },
];

const emptyForm = {
  name: "",
  priority: "Medium",
  status: "Pending",
  assignedTo: "",
  dueDate: "",
};

function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingId) {
      setTasks(
        tasks.map((task) =>
          task.id === editingId ? { ...formData, id: editingId } : task
        )
      );
    } else {
      setTasks([
        ...tasks,
        {
          ...formData,
          id: Date.now(),
        },
      ]);
    }

    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (task) => {
    setFormData(task);
    setEditingId(task.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const filteredTasks =
    statusFilter === "All"
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  return (
    <Layout>
      <div className="task-management">
        <div className="task-page-header">
          <div>
            <h1>Task Management</h1>
            <p>Create, assign and monitor team tasks.</p>
          </div>

          <button
            className="task-create-button"
            onClick={() => setShowForm(true)}
          >
            + Create Task
          </button>
        </div>

        <div className="task-summary">
          <div className="task-summary-item">
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>

          <div className="task-summary-item">
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>

          <div className="task-summary-item">
            <span>Pending</span>
            <strong>{pendingTasks}</strong>
          </div>
        </div>

        {showForm && (
          <form className="task-form-panel" onSubmit={handleSubmit}>
            <div className="task-form-heading">
              <h2>{editingId ? "Edit Task" : "Create New Task"}</h2>
              <button type="button" onClick={handleCancel}>
                ×
              </button>
            </div>

            <div className="task-form-grid">
              <div className="task-field">
                <label>Task Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter task name"
                  required
                />
              </div>

              <div className="task-field">
                <label>Assigned To</label>
                <input
                  type="text"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  placeholder="Enter team member name"
                  required
                />
              </div>

              <div className="task-field">
                <label>Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="task-field">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              <div className="task-field">
                <label>Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="task-form-actions">
              <button type="button" className="task-cancel" onClick={handleCancel}>
                Cancel
              </button>

              <button type="submit" className="task-save">
                {editingId ? "Update Task" : "Create Task"}
              </button>
            </div>
          </form>
        )}

        <div className="task-list-header">
          <h2>Task List</h2>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>

        <div className="task-card-list">
          {filteredTasks.map((task) => (
            <div className="management-task-card" key={task.id}>
              <div className="task-card-heading">
                <h3>{task.name}</h3>

                <span
                  className={`task-status ${task.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {task.status}
                </span>
              </div>

              <div className="task-information">
                <div>
                  <span>Assigned to</span>
                  <strong>{task.assignedTo}</strong>
                </div>

                <div>
                  <span>Due date</span>
                  <strong>{task.dueDate}</strong>
                </div>
              </div>

              <div className="task-card-footer">
                <span className={`task-priority ${task.priority.toLowerCase()}`}>
                  {task.priority} Priority
                </span>

                <div className="task-buttons">
                  <button
                    className="task-edit"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>

                  <button
                    className="task-delete"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <div className="task-empty">No tasks found.</div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Tasks;