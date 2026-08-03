import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/auth/register", formData);

            alert("Registration Successful");

            navigate("/");

        } catch (error) {

            alert(error.response?.data || "Registration Failed");

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Register
                        </h2>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label>Username</label>

                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    placeholder="Enter Username"
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label>Email</label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label>Password</label>

                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <button
                                className="btn btn-success w-100"
                                type="submit"
                            >
                                Register
                            </button>

                        </form>

                        <p className="text-center mt-3">

                            Already have an account?

                        </p>

                        <Link
                            to="/"
                            className="btn btn-primary w-100"
                        >
                            Login
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;