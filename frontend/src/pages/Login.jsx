import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );

      alert(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Login Failed");
      } else {
        alert("Server not running");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              SecureVault Login
            </h2>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary w-100"
              onClick={handleLogin}
            >
              Login
            </button>

            {/* Forgot Password */}
            <p className="text-center mt-3 mb-2">
              <button
                className="btn btn-link text-decoration-none p-0"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </p>

            <p className="text-center">
              Don't have an account?
            </p>

            <button
              className="btn btn-success w-100"
              onClick={() => navigate("/register")}
            >
              Register
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;