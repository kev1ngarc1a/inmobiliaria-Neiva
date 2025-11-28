import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Property from "./pages/Property";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { AuthProvider } from "./contexts/AuthContext";
import { PropertyProvider } from "./contexts/PropertyContext";
import { useAuth } from "./contexts/AuthContext";

// Ruta protegida
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        
        <Navbar />

        {/* CONTENEDOR GLOBAL */}
       <div className="uk-container uk-margin-large-top uk-margin-large-bottom uk-container-large">

          <Routes>

            {/* PÚBLICAS */}
            <Route path="/" element={<Home />} />
            <Route path="/buscar" element={<Search />} />
            <Route path="/propiedad/:id" element={<Property />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* PROTEGIDA */}
            <Route
              path="/mis-propiedades"
              element={
                <PrivateRoute>
                  <Property />
                </PrivateRoute>
              }
            />

            {/* 404 */}
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
