import { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });

    // Call Spring Boot Login API here
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>TaskFlow</h1>
        <p>Project Management & Team Collaboration</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <div className="extra-links">
          <Link to="/">Forgot Password?</Link>
          <span> | </span>
          <Link to="/register">Create Account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;