import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const res = await axios.post("http://localhost:4000/api/login", {
      email,
      password,
    });

    const user = {
      ...res.data.user,
      token: res.data.token,
    };

    login(user);
    navigate("/dashboard"); 
  } catch (err) {
    setError(err.response?.data?.message || "Error al iniciar sesión");
  }

  setLoading(false);
};


  return (
    <div className="login-page">
      <div className="login-card uk-card uk-card-default uk-card-body">

        <h2 className="login-title">Iniciar sesión</h2>
        <p className="login-subtitle">
          Accede para publicar, guardar y contactar propiedades
        </p>

        {error && (
          <div className="uk-alert-danger" uk-alert="true">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="uk-form-stacked">

          <div className="uk-margin">
            <label className="uk-form-label">Correo</label>
            <input
              className="uk-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="uk-margin">
            <label className="uk-form-label">Contraseña</label>
            <input
              className="uk-input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="uk-button uk-button-primary uk-width-1-1 login-btn"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>

        </form>

      </div>
    </div>
  );
}
