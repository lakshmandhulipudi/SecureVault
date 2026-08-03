import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [newPassword, setNewPassword] = useState("");

  const resetPassword = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8080/api/password/reset",
        {
          email: email,
          newPassword: newPassword
        }
      );

      alert(response.data);

      navigate("/");

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message || error.response.data);
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
              Reset Password
            </h2>

            <div className="mb-3">

              <label>Email</label>

              <input
                type="email"
                className="form-control"
                value={email}
                readOnly
              />

            </div>

            <div className="mb-3">

              <label>New Password</label>

              <input
                type="password"
                className="form-control"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

            </div>

            <button
              className="btn btn-success w-100"
              onClick={resetPassword}
            >
              Reset Password
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ResetPassword;