// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import UIkit from "uikit";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      <nav className="navbar-glass uk-navbar-container" uk-navbar="true">
        <div className="uk-container uk-container-large navbar-inner">

        <div className="uk-navbar-left navbar-left">  
            <Link to="/" className="uk-navbar-item navbar-brand">
              <div className="brand-logo">IN</div>
              <span className="brand-text">InmoNeiva</span>
            </Link>
          </div>
          
    <div className="uk-navbar-right navbar-right">
            {/* DESKTOP */}
            <div className="uk-navbar-item uk-visible@s">
              {!user ? (
                <div className="auth-actions">
                  <Link to="/login" className="btn-text">
                    Iniciar sesión
                  </Link>
                  <Link to="/register" className="btn-primary-pill">
                    Registrarse
                  </Link>
                </div>
              ) : (
                <div className="user-area">
                  <span className="username">
                    Hola, <strong>{user.username}</strong>
                  </span>

                  <div className="uk-inline">
                    <button className="user-avatar" type="button">
                      {user.username[0].toUpperCase()}
                    </button>

                    <div
                      uk-dropdown="mode: click; pos: bottom-right"
                      className="user-dropdown"
                    >
                      <ul className="uk-nav uk-dropdown-nav">
                        <li className="uk-nav-header">Panel</li>
                        <li><Link to="./Mispublicaciones.jsx">Mis publicaciones</Link></li>
                        <li><Link to="./Mispeticiones">Mis peticiones</Link></li>
                        <li className="uk-nav-divider"></li>
                        <li>
                          <button className="logout-btn" onClick={handleLogout}>
                            Cerrar sesión
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* MOBILE */}
            <div className="uk-navbar-item uk-hidden@s">
              <button
                className="mobile-menu-btn"
                uk-toggle="target: #mobile-nav"
                aria-label="Abrir menú"
              >
                <span uk-icon="menu"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* OFFCANVAS MOBILE */}
      <div id="mobile-nav" uk-offcanvas="overlay: true">
        <div className="uk-offcanvas-bar mobile-glass">
          <button className="uk-offcanvas-close" uk-close="true"></button>

          <div className="mobile-brand">
            <Link to="/" onClick={() => UIkit.offcanvas("#mobile-nav").hide()}>
              InmoNeiva
            </Link>
          </div>

          <ul className="uk-nav uk-nav-default">
            <li className={location.pathname === "/" ? "uk-active" : ""}>
              <Link to="/">Inicio</Link>
            </li>

            {!user ? (
              <>
                <li><Link to="/login">Iniciar sesión</Link></li>
                <li><Link to="/register">Registrarse</Link></li>
              </>
            ) : (
              <>
                <li className="uk-nav-header">Panel</li>
                <li><Link to="/mis-publicaciones">Mis publicaciones</Link></li>
                <li><Link to="/mis-peticiones">Mis peticiones</Link></li>
                <li className="uk-nav-divider"></li>
                <li>
                  <button
                    className="logout-btn"
                    onClick={() => {
                      handleLogout();
                      UIkit.offcanvas("#mobile-nav").hide();
                    }}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
