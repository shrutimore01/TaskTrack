import "./register.css";

function Register() {
  return (
    <div className="register-container">
      <div className="register-card">

        <h1>TaskTrack</h1>
        <p>Create New Account</p>

        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <select>
            <option value="">Select Role</option>
            <option value="PROJECT_MANAGER">Project Manager</option>
            <option value="TEAM-MEMBER">Team Member</option>
            </select>

        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />

        <button>Register</button>

      </div>
    </div>
  );
}

export default Register;