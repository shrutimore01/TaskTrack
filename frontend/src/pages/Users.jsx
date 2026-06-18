import { useState } from "react";
import Layout from "../components/Layout";

const initialUsers = [
  {
    id: 1,
    name: "Shruti More",
    email: "shruti@taskflow.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Rahul Patil",
    email: "rahul@taskflow.com",
    role: "Project Manager",
  },
  {
    id: 3,
    name: "Priya Sharma",
    email: "priya@taskflow.com",
    role: "Team Member",
  },
];

const emptyForm = {
  name: "",
  email: "",
  role: "Team Member",
};

function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingId !== null) {
      setUsers(
        users.map((user) =>
          user.id === editingId
            ? { ...formData, id: editingId }
            : user
        )
      );
    } else {
      setUsers([
        ...users,
        {
          ...formData,
          id: Date.now(),
        },
      ]);
    }

    closeForm();
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });

    setEditingId(user.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmed) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const openAddForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const filteredUsers = users.filter((user) => {
    const search = searchText.toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search);

    const matchesRole =
      roleFilter === "All" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const projectManagers = users.filter(
    (user) => user.role === "Project Manager"
  ).length;

  const teamMembers = users.filter(
    (user) => user.role === "Team Member"
  ).length;

  return (
    <Layout>
      <div className="user-management">
        <div className="user-page-header">
          <div>
            <h1>User Management</h1>
            <p>Manage users and their system roles.</p>
          </div>

          <button className="add-user-button" onClick={openAddForm}>
            + Add User
          </button>
        </div>

        <div className="user-summary">
          <div className="user-summary-card">
            <span>Total Users</span>
            <strong>{users.length}</strong>
          </div>

          <div className="user-summary-card manager">
            <span>Project Managers</span>
            <strong>{projectManagers}</strong>
          </div>

          <div className="user-summary-card member">
            <span>Team Members</span>
            <strong>{teamMembers}</strong>
          </div>
        </div>

        {showForm && (
          <form className="user-form-panel" onSubmit={handleSubmit}>
            <div className="user-form-header">
              <h2>{editingId !== null ? "Edit User" : "Add New User"}</h2>

              <button
                type="button"
                className="user-close-button"
                onClick={closeForm}
                aria-label="Close form"
              >
                ×
              </button>
            </div>

            <div className="user-form-grid">
              <div className="user-field">
                <label htmlFor="user-name">Name</label>
                <input
                  id="user-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="user-field">
                <label htmlFor="user-email">Email</label>
                <input
                  id="user-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="user-field">
                <label htmlFor="user-role">Role</label>
                <select
                  id="user-role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="Admin">Admin</option>
                  <option value="Project Manager">
                    Project Manager
                  </option>
                  <option value="Team Member">Team Member</option>
                </select>
              </div>
            </div>

            <div className="user-form-actions">
              <button
                type="button"
                className="user-cancel-button"
                onClick={closeForm}
              >
                Cancel
              </button>

              <button type="submit" className="user-save-button">
                {editingId !== null ? "Update User" : "Add User"}
              </button>
            </div>
          </form>
        )}

        <div className="user-list-section">
          <div className="user-list-header">
            <h2>User List</h2>

            <div className="user-filters">
              <input
                type="search"
                placeholder="Search name or email"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />

              <select
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Project Manager">
                  Project Manager
                </option>
                <option value="Team Member">Team Member</option>
              </select>
            </div>
          </div>

          <div className="user-card-list">
            {filteredUsers.map((user) => (
              <div className="user-list-card" key={user.id}>
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div className="user-details">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </div>

                <span
                  className={`user-role ${user.role
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {user.role}
                </span>

                <div className="user-actions">
                  <button
                    className="user-edit-button"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>

                  <button
                    className="user-delete-button"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="user-empty-message">
                No users found.
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Users;