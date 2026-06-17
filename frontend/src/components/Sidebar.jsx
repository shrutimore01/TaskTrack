import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>TaskFlow</h2>

      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;