import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/users" element={<Users />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  );
}

export default App;