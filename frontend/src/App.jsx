import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Property from "./pages/Property";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import CreateProperty from "./pages/CreateProperty";
import MyPublications from "./pages/MyPublications";
import MyRequests from "./pages/MyRequests";

import ProtectedRoute from "./routes/ProtectedRoute";

import { AuthProvider } from "./contexts/AuthContext";
import { PropertyProvider } from "./contexts/PropertyContext";
import { useAuth } from "./contexts/AuthContext";

// ✅ Ruta privada simple
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <Navbar />

        <div className="uk-container uk-margin-large-top uk-margin-large-bottom uk-container-large">
          <Routes>

            {/* ================= PÚBLICAS ================= */}
            <Route path="/" element={<Home />} />
            <Route path="/buscar" element={<Search />} />
            <Route path="/propiedad/:id" element={<Property />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ================= DASHBOARD ================= */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* ================= PANEL USUARIO ================= */}
            <Route
              path="/crear-propiedad"
              element={
                <PrivateRoute>
                  <CreateProperty />
                </PrivateRoute>
              }
            />

            <Route
              path="/mis-publicaciones"
              element={
                <PrivateRoute>
                  <MyPublications />
                </PrivateRoute>
              }
            />

            <Route
              path="/mis-peticiones"
              element={
                <PrivateRoute>
                  <MyRequests />
                </PrivateRoute>
              }
            />

            {/* ================= 404 ================= */}
            <Route
              path="*"
              element={
                <div className="uk-container uk-text-center uk-margin-large-top">
                  <h2 className="uk-heading-medium">Página no encontrada</h2>
                  <p>La ruta que intentaste visitar no existe.</p>
                </div>
              }
            />

          </Routes>
        </div>
      </PropertyProvider>
    </AuthProvider>
  );
}
