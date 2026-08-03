import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const sendOtp = async () => {

    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:8080/api/password/forgot",
        {
          email: email,
        }
      );

      alert(response.data);

      navigate("/verify-otp", {
        state: {
          email: email,
        },
      });

    } catch (error) {

      if (error.response) {
        alert(error.response.data);
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
              Forgot Password
            </h2>

            <div className="mb-3">

              <label>Email</label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            <button
              className="btn btn-primary w-100"
              onClick={sendOtp}
            >
              Send OTP
            </button>

            <button
              className="btn btn-secondary w-100 mt-3"
              onClick={() => navigate("/")}
            >
              Back to Login
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;