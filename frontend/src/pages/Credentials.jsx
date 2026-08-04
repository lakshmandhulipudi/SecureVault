import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Credentials() {

    const [credentials, setCredentials] = useState([]);
    const [search, setSearch] = useState("");
    const [showFavourite, setShowFavourite] = useState(false);
    const [visiblePasswords, setVisiblePasswords] = useState({});

    const email = localStorage.getItem("email");

    useEffect(() => {
        fetchCredentials();
    }, []);

    const fetchCredentials = async () => {

        try {

            const response = await api.get(
                `/credentials?email=${email}`
            );

            setCredentials(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const deleteCredential = async (id) => {

        if (!window.confirm("Delete this credential?"))
            return;

        try {

            await api.delete(`/credentials/${id}`);

            fetchCredentials();

        } catch (error) {

            alert("Delete Failed");

        }

    };

    const togglePassword = (id) => {

        setVisiblePasswords({

            ...visiblePasswords,

            [id]: !visiblePasswords[id]

        });

    };

    const copyPassword = (password) => {

        navigator.clipboard.writeText(password);

        alert("Password Copied");

    };

    const filteredCredentials = credentials.filter((credential) => {

        const matchSearch =

            credential.website
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            credential.category
                .toLowerCase()
                .includes(search.toLowerCase());

        if (showFavourite) {

            return matchSearch && credential.favourite;

        }

        return matchSearch;

    });

    return (

        <>

            <Navbar />

            <div className="container mt-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="fw-bold">
                        🔐 Saved Credentials
                    </h2>

                    <Link
                        to="/add-credential"
                        className="btn btn-primary"
                    >
                        ➕ Add Credential
                    </Link>

                </div>

                <div className="input-group mb-4">

                    <span className="input-group-text">
                        🔍
                    </span>

                    <input
                        className="form-control"
                        placeholder="Search by Website or Category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <button
                    className={`btn ${showFavourite
                            ? "btn-success"
                            : "btn-outline-warning"
                        } mb-4`}
                    onClick={() =>
                        setShowFavourite(!showFavourite)
                    }
                >
                    ⭐ Favourite Only
                </button>

                {

                    filteredCredentials.length === 0 && (

                        <div className="alert alert-secondary">

                            No Credentials Found

                        </div>

                    )

                }

                {

                    filteredCredentials.map((credential) => (

                        <div
                            className="card shadow border-0 rounded-4 mb-4"
                            key={credential.id}
                        >

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center">

                                    <h4 className="fw-bold">

                                        🌐 {credential.website}

                                    </h4>

                                    {

                                        credential.favourite &&

                                        <span className="badge bg-warning text-dark fs-6">

                                            ⭐ Favourite

                                        </span>

                                    }

                                </div>

                                <hr />

                                <p>

                                    👤 <b>Username :</b>{" "}

                                    {credential.username}

                                </p>

                                <p>

                                    🏷 <b>Category :</b>{" "}

                                    <span className="badge bg-primary">

                                        {credential.category}

                                    </span>

                                </p>

                                <p>

                                    🔒 <b>Password :</b>{" "}

                                    {

                                        visiblePasswords[credential.id]

                                            ? credential.password

                                            : "••••••••"

                                    }

                                </p>

                                <div className="mt-4">

                                    <button
                                        className="btn btn-outline-secondary me-2"
                                        onClick={() =>
                                            togglePassword(credential.id)
                                        }
                                    >
                                        👁 Show
                                    </button>

                                    <button
                                        className="btn btn-info text-white me-2"
                                        onClick={() =>
                                            copyPassword(credential.password)
                                        }
                                    >
                                        📋 Copy
                                    </button>

                                    <Link
                                        to={`/update-credential/${credential.id}`}
                                        className="btn btn-warning me-2"
                                    >
                                        ✏ Update
                                    </Link>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            deleteCredential(credential.id)
                                        }
                                    >
                                        🗑 Delete
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </>

    );

}

export default Credentials;