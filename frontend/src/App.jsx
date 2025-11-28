import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Property from './pages/Property';

import Login from './pages/Login';        // <-- IMPORTANTE
import Register from './pages/Register';  // <-- IMPORTANTE

import { AuthProvider } from './contexts/AuthContext';
import { PropertyProvider } from './contexts/PropertyContext';

export default function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buscar" element={<Search />} />
          <Route path="/propiedad/:id" element={<Property />} />

          {/* RUTAS NUEVAS */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Página no encontrada */}
          <Route
            path="*"
            element={
              <div className="uk-container uk-margin-top">
                <h2>Página no encontrada</h2>
              </div>
            }
          />
        </Routes>
      </PropertyProvider>
    </AuthProvider>
  );
}
