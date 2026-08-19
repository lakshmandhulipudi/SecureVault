import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";

import Dashboard from "./pages/Dashboard";
import AddCredential from "./pages/AddCredential";
import Credentials from "./pages/Credentials";
import UpdateCredential from "./pages/UpdateCredential";
import Profile from "./pages/Profile";
import LoginActivities from "./pages/LoginActivities";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Authentication */}

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Forgot Password */}

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Credentials */}

        <Route
          path="/add-credential"
          element={
            <ProtectedRoute>
              <AddCredential />
            </ProtectedRoute>
          }
        />

        <Route
          path="/credentials"
          element={
            <ProtectedRoute>
              <Credentials />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-credential/:id"
          element={
            <ProtectedRoute>
              <UpdateCredential />
            </ProtectedRoute>
          }
        />

        {/* Profile */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Login Activities */}

        <Route
          path="/login-activities"
          element={
            <ProtectedRoute>
              <LoginActivities />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;