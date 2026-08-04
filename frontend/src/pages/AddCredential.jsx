import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function AddCredential() {

    const navigate = useNavigate();

    const email = localStorage.getItem("email");

    const [credential, setCredential] = useState({
        website: "",
        username: "",
        password: "",
        category: "",
        favourite: false
    });

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setCredential({
            ...credential,
            [name]: type === "checkbox" ? checked : value
        });

    };

    const saveCredential = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                `/credentials?email=${email}`,
                credential
            );

            alert("Credential Saved Successfully");

            navigate("/credentials");

        } catch (error) {

            console.log(error);

            alert("Unable to Save Credential");

        }

    };

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate("/dashboard")}
                >
                    🏠 Dashboard
                </button>

            </div>

            <div className="container mt-4">

                <div className="row justify-content-center">

                    <div className="col-md-7">

                        <div className="card shadow-lg p-4 rounded-4">

                            <h2 className="mb-4">
                                Add Credential
                            </h2>

                            <form onSubmit={saveCredential}>

                                <div className="mb-3">

                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Website Name"
                                        name="website"
                                        value={credential.website}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Username / Email"
                                        name="username"
                                        value={credential.username}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        name="password"
                                        value={credential.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <select
                                        className="form-select form-select-lg"
                                        name="category"
                                        value={credential.category}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">Select Category</option>
                                        <option>Social</option>
                                        <option>Banking</option>
                                        <option>Work</option>
                                        <option>Shopping</option>
                                        <option>Education</option>
                                        <option>Entertainment</option>
                                        <option>Other</option>

                                    </select>

                                </div>

                                <div className="form-check mb-4">

                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="favourite"
                                        checked={credential.favourite}
                                        onChange={handleChange}
                                    />

                                    <label className="form-check-label">
                                        ⭐ Mark as Favourite
                                    </label>

                                </div>

                                <button
                                    className="btn btn-dark btn-lg"
                                    type="submit"
                                >
                                    Save Credential
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default AddCredential;