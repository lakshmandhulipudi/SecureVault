import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Dashboard() {

    const navigate = useNavigate();

    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username") || "User";

    const [credentials, setCredentials] = useState([]);

    useEffect(() => {
        loadCredentials();
    }, []);

    const loadCredentials = async () => {
        try {
            const response = await api.get(`/credentials?email=${email}`);
            setCredentials(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const favouriteCount = credentials.filter(c => c.favourite).length;
    const categoryCount = new Set(credentials.map(c => c.category)).size;

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <div className="mb-4">
                    <h2 className="fw-bold">
                        👋 Welcome, {username}
                    </h2>

                    <p className="text-muted">
                        Manage all your passwords securely from one place.
                    </p>
                </div>

                <div className="row">

                    <div className="col-md-4 mb-4">

                        <div
                            className="card text-white shadow-lg"
                            style={{
                                background:
                                    "linear-gradient(135deg,#4F46E5,#6366F1)",
                                border: "none",
                                borderRadius: "18px"
                            }}
                        >

                            <div className="card-body">

                                <h5>🔑 Total Credentials</h5>

                                <h1 className="display-4 fw-bold">
                                    {credentials.length}
                                </h1>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4 mb-4">

                        <div
                            className="card text-white shadow-lg"
                            style={{
                                background:
                                    "linear-gradient(135deg,#16A34A,#22C55E)",
                                border: "none",
                                borderRadius: "18px"
                            }}
                        >

                            <div className="card-body">

                                <h5>⭐ Favourite</h5>

                                <h1 className="display-4 fw-bold">
                                    {favouriteCount}
                                </h1>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4 mb-4">

                        <div
                            className="card text-white shadow-lg"
                            style={{
                                background:
                                    "linear-gradient(135deg,#EA580C,#F97316)",
                                border: "none",
                                borderRadius: "18px"
                            }}
                        >

                            <div className="card-body">

                                <h5>📂 Categories</h5>

                                <h1 className="display-4 fw-bold">
                                    {categoryCount}
                                </h1>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="row mt-3">

                    <div className="col-md-6 mb-4">

                        <div className="card shadow border-0 rounded-4">

                            <div className="card-body">

                                <h4 className="mb-4">
                                    ⚡ Quick Actions
                                </h4>

                                <button
                                    className="btn btn-primary me-3"
                                    onClick={() =>
                                        navigate("/add-credential")
                                    }
                                >
                                    ➕ Add Credential
                                </button>

                                <button
                                    className="btn btn-dark"
                                    onClick={() =>
                                        navigate("/credentials")
                                    }
                                >
                                    📋 View Credentials
                                </button>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-6">

                        <div className="card shadow border-0 rounded-4">

                            <div className="card-body">

                                <h4 className="mb-4">
                                    🕒 Recent Credentials
                                </h4>

                                {
                                    credentials.length === 0 ? (

                                        <div className="alert alert-secondary">

                                            No credentials added.

                                        </div>

                                    ) : (

                                        credentials
                                            .slice(-5)
                                            .reverse()
                                            .map(c => (

                                                <div
                                                    key={c.id}
                                                    className="border rounded p-3 mb-3"
                                                >

                                                    <h5>
                                                        🌐 {c.website}
                                                    </h5>

                                                    <small className="text-muted">
                                                        👤 {c.username}
                                                    </small>

                                                    <br />

                                                    <span className="badge bg-primary mt-2">
                                                        {c.category}
                                                    </span>

                                                </div>

                                            ))

                                    )
                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}

export default Dashboard;