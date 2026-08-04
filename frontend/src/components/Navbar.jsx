import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("email");
        localStorage.removeItem("username");

        navigate("/");

    };

    return (

        <nav
            className="navbar navbar-expand-lg navbar-dark"
            style={{
                backgroundColor: "#0f172a",
                padding: "15px 30px"
            }}
        >

            <div className="container-fluid">

                {/* Logo */}
                <Link
                    className="navbar-brand fw-bold fs-3"
                    to="/dashboard"
                >
                    🔐 Password Vault
                </Link>

                {/* Home Button */}
                <button
                    className="btn btn-outline-light ms-3"
                    onClick={() => navigate("/dashboard")}
                >
                    🏠 Home
                </button>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav ms-auto align-items-center">

                        <li className="nav-item me-3">

                            <Link
                                className="nav-link text-white"
                                to="/dashboard"
                            >
                                Dashboard
                            </Link>

                        </li>

                        <li className="nav-item dropdown me-3">

                            <a
                                className="nav-link dropdown-toggle text-white"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                            >
                                Credentials
                            </a>

                            <ul className="dropdown-menu">

                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to="/add-credential"
                                    >
                                        ➕ Add Credential
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to="/credentials"
                                    >
                                        📋 View Credentials
                                    </Link>
                                </li>

                            </ul>

                        </li>

                        <li className="nav-item me-4">

                            <Link
                                className="nav-link text-white"
                                to="/profile"
                            >
                                👤 Profile
                            </Link>

                        </li>

                        <li className="nav-item">

                            <button
                                className="btn btn-danger px-4"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;