import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        <h2 className="dashboard-title">
          Bienvenido, <span>{user.username}</span>
        </h2>
        <p className="dashboard-subtitle">
          Administra tus propiedades y solicitudes desde tu panel
        </p>

        <div className="dashboard-grid">

          <Link to="/crear-propiedad" className="dashboard-card">
            <div className="dashboard-icon">🏠</div>
            <h3>Publicar Propiedad</h3>
            <p>Agrega una nueva propiedad al sistema</p>
          </Link>

          <Link to="/mis-publicaciones" className="dashboard-card">
            <div className="dashboard-icon">📋</div>
            <h3>Mis Publicaciones</h3>
            <p>Administra tus propiedades publicadas</p>
          </Link>

          <Link to="/mis-peticiones" className="dashboard-card">
            <div className="dashboard-icon">📩</div>
            <h3>Mis Solicitudes</h3>
            <p>Mensajes de clientes interesados</p>
          </Link>

        </div>
      </div>
    </div>
  );
}
