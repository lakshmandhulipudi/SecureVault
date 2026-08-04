import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function UpdateCredential() {

    const { id } = useParams();

    const navigate = useNavigate();

    const email = localStorage.getItem("email");

    const [credential, setCredential] = useState({
        website: "",
        username: "",
        password: "",
        category: "",
        favourite: false
    });

    useEffect(() => {
        loadCredential();
    }, []);

    const loadCredential = async () => {

        try {

            const response = await api.get(
                `/credentials?email=${email}`
            );

            const selected = response.data.find(
                c => c.id === Number(id)
            );

            if (selected) {
                setCredential(selected);
            }

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setCredential({

            ...credential,

            [name]: type === "checkbox"
                ? checked
                : value

        });

    };

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            await api.put(

                `/credentials/${id}`,

                credential

            );

            alert("Credential Updated Successfully");

            navigate("/credentials");

        } catch (error) {

            console.log(error);

            alert("Update Failed");

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

                                Update Credential

                            </h2>

                            <form onSubmit={handleUpdate}>

                                <div className="mb-3">

                                    <input
                                        className="form-control"
                                        name="website"
                                        value={credential.website}
                                        onChange={handleChange}
                                        placeholder="Website"
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <input
                                        className="form-control"
                                        name="username"
                                        value={credential.username}
                                        onChange={handleChange}
                                        placeholder="Username"
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <input
                                        className="form-control"
                                        name="password"
                                        value={credential.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <select
                                        className="form-select"
                                        name="category"
                                        value={credential.category}
                                        onChange={handleChange}
                                    >

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
                                        type="checkbox"
                                        className="form-check-input"
                                        name="favourite"
                                        checked={credential.favourite}
                                        onChange={handleChange}
                                    />

                                    <label className="form-check-label">

                                        ⭐ Favourite

                                    </label>

                                </div>

                                <button
                                    className="btn btn-dark"
                                    type="submit"
                                >

                                    Update Credential

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default UpdateCredential;