import "./../styles/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    // Demo Admin Login
    if (email === "admin@gmail.com" && password === "admin123") {

      alert("Login Successful ✅");
      navigate("/dashboard");

    } else {

      alert("Invalid Email or Password ❌");

    }

  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h1>🩸 Blood Donor Management System</h1>

        <p>Donate Blood, Save Lives</p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>

  );
}

export default Login;