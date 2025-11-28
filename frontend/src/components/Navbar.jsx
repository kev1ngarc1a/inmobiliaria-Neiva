import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    return (
        <nav className="uk-navbar-container uk-padding-small" uk-navbar="true">
            {/* IZQUIERDA */}
            <div className="uk-navbar-left">
                <Link to="/" className="uk-navbar-item uk-logo">
                    InmoNeiva
                </Link>
            </div>

            {/* DERECHA */}
            <div className="uk-navbar-right">

                {/* SI NO ESTÁ LOGUEADO */}
                {!user ? (
                    <>
                        <Link to="/login" className="uk-button uk-button-text">
                            Iniciar sesión
                        </Link>
                        <Link
                            to="/register"
                            className="uk-button uk-button-primary uk-margin-left"
                        >
                            Registrarse
                        </Link>
                    </>
                ) : (
                    <div className="uk-navbar-item">

                        {/* TEXTO BIENVENIDO */}
                        <span className="uk-margin-right uk-text-bold">
                            Bienvenido {user.username}
                        </span>

                        {/* MENÚ HAMBURGUESA */}
                        <div className="uk-inline">
                            <button className="uk-button uk-button-default" uk-icon="icon: menu"></button>

                            <div uk-dropdown="mode: click; pos: bottom-right">
                                <ul className="uk-nav uk-dropdown-nav">

                                    <li className="uk-nav-header">Opciones</li>

                                    <li>
                                        <Link to="/mis-publicaciones">Mis publicaciones</Link>
                                    </li>

                                    <li>
                                        <Link to="/mis-peticiones">Mis peticiones</Link>
                                    </li>

                                    <li className="uk-nav-divider"></li>

                                    <li>
                                        <button
                                            className="uk-button uk-button-text"
                                            onClick={() => {
                                                logout();
                                                navigate("/");
                                            }}
                                        >
                                            Cerrar sesión
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
