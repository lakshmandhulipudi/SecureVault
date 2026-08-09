import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Credentials() {

    const [credentials, setCredentials] = useState([]);
    const [search, setSearch] = useState("");
    const [showFavourite, setShowFavourite] = useState(false);
    const [visiblePasswords, setVisiblePasswords] = useState({});

    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedCredential, setSelectedCredential] = useState(null);
    const [recipientUserId, setRecipientUserId] = useState("");
    const [sharing, setSharing] = useState(false);

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

        if (!window.confirm("Delete this credential?")) {
            return;
        }

        try {

            await api.delete(`/credentials/${id}`);

            fetchCredentials();

        } catch (error) {

            console.log(error);

            alert("Delete Failed");
        }
    };

    const togglePassword = (id) => {

        setVisiblePasswords({
            ...visiblePasswords,
            [id]: !visiblePasswords[id]
        });
    };

    const copyPassword = async (password) => {

        try {

            await navigator.clipboard.writeText(password);

            alert("Password copied successfully");

        } catch (error) {

            console.log(error);

            alert("Unable to copy password");
        }
    };

    const openShareModal = (credential) => {

        setSelectedCredential(credential);
        setRecipientUserId("");
        setShowShareModal(true);
    };

    const closeShareModal = () => {

        setShowShareModal(false);
        setSelectedCredential(null);
        setRecipientUserId("");
    };

    const shareCredential = async () => {

        if (!recipientUserId.trim()) {

            alert("Please enter the recipient User ID");

            return;
        }

        if (!selectedCredential) {
            return;
        }

        try {

            setSharing(true);

            await api.post(
    `/credential-sharing/${selectedCredential.id}/share`,
    null,
    {
        params: {
            ownerEmail: email,
            recipientUserId: recipientUserId
        }
    }
);
            alert("Credential shared successfully");

            closeShareModal();

        } catch (error) {

            console.log(error);

            const message =
                error.response?.data ||
                "Unable to share credential";

            alert(message);

        } finally {

            setSharing(false);
        }
    };

    const filteredCredentials = credentials.filter(
        (credential) => {

            const website =
                credential.website?.toLowerCase() || "";

            const category =
                credential.category?.toLowerCase() || "";

            const searchText =
                search.toLowerCase();

            const matchSearch =
                website.includes(searchText) ||
                category.includes(searchText);

            if (showFavourite) {

                return (
                    matchSearch &&
                    credential.favourite
                );
            }

            return matchSearch;
        }
    );

    return (
        <>
            <Navbar />

            <div className="container mt-5 mb-5">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="fw-bold mb-0">
                        Saved Credentials
                    </h2>

                    <Link
                        to="/add-credential"
                        className="btn btn-primary px-4"
                    >
                        Add Credential
                    </Link>

                </div>

                {/* Search */}
                <div className="input-group mb-3">

                    <span className="input-group-text">
                        Search
                    </span>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Website or Category..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                {/* Favourite Filter */}
                <button
                    className={`btn mb-4 ${
                        showFavourite
                            ? "btn-warning"
                            : "btn-outline-warning"
                    }`}
                    onClick={() =>
                        setShowFavourite(
                            !showFavourite
                        )
                    }
                >
                    Favourite Only
                </button>

                {/* No Credentials */}
                {filteredCredentials.length === 0 && (
                    <div className="alert alert-light border text-secondary">
                        No credentials found.
                    </div>
                )}

                {/* Credentials */}
                {filteredCredentials.map(
                    (credential) => (

                        <div
                            className="card shadow-sm border-0 rounded-4 mb-4"
                            key={credential.id}
                        >

                            <div className="card-body p-4">

                                {/* Credential Header */}
                                <div className="d-flex justify-content-between align-items-center">

                                    <h4 className="fw-bold mb-0">
                                        {credential.website}
                                    </h4>

                                    {credential.favourite && (
                                        <span className="badge bg-warning text-dark px-3 py-2">
                                            Favourite
                                        </span>
                                    )}

                                </div>

                                <hr />

                                {/* Username */}
                                <p className="mb-3">

                                    <strong>
                                        Username:
                                    </strong>{" "}

                                    <span>
                                        {credential.username}
                                    </span>

                                </p>

                                {/* Category */}
                                <p className="mb-3">

                                    <strong>
                                        Category:
                                    </strong>{" "}

                                    <span className="badge bg-light text-dark border">

                                        {credential.category}

                                    </span>

                                </p>

                                {/* Password */}
                                <p className="mb-3">

                                    <strong>
                                        Password:
                                    </strong>{" "}

                                    <span>

                                        {visiblePasswords[
                                            credential.id
                                        ]
                                            ? credential.password
                                            : "••••••••"}

                                    </span>

                                </p>

                                {/* Buttons */}
                                <div className="mt-4">

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-secondary me-2 px-3"
                                        onClick={() =>
                                            togglePassword(
                                                credential.id
                                            )
                                        }
                                    >
                                        {visiblePasswords[
                                            credential.id
                                        ]
                                            ? "Hide"
                                            : "Show"}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-info text-white me-2 px-3"
                                        onClick={() =>
                                            copyPassword(
                                                credential.password
                                            )
                                        }
                                    >
                                        Copy
                                    </button>

                                    <Link
                                        to={`/update-credential/${credential.id}`}
                                        className="btn btn-sm btn-primary me-2 px-3"
                                    >
                                        Update
                                    </Link>

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-danger me-2 px-3"
                                        onClick={() =>
                                            deleteCredential(
                                                credential.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-success px-3"
                                        onClick={() =>
                                            openShareModal(
                                                credential
                                            )
                                        }
                                    >
                                        Share
                                    </button>

                                </div>

                            </div>

                        </div>
                    )
                )}

            </div>

            {/* Share Modal */}
            {showShareModal && (
                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor:
                            "rgba(0, 0, 0, 0.5)"
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content rounded-4 shadow">

                            <div className="modal-header">

                                <h5 className="modal-title fw-bold">
                                    Share Credential
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={
                                        closeShareModal
                                    }
                                ></button>

                            </div>

                            <div className="modal-body">

                                <p className="mb-3">

                                    Share{" "}

                                    <strong>
                                        {selectedCredential?.website}
                                    </strong>

                                    {" "}with another registered user.

                                </p>

                                <label className="form-label fw-semibold">

                                    Recipient User ID

                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter User ID"
                                    value={
                                        recipientUserId
                                    }
                                    onChange={(e) =>
                                        setRecipientUserId(
                                            e.target.value
                                        )
                                    }
                                />

                                <small className="text-muted">
                                    The recipient must already
                                    be registered in SecureVault.
                                </small>

                            </div>

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={
                                        closeShareModal
                                    }
                                    disabled={sharing}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={
                                        shareCredential
                                    }
                                    disabled={sharing}
                                >
                                    {sharing
                                        ? "Sharing..."
                                        : "Share Credential"}
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            )}

        </>
    );
}

export default Credentials;