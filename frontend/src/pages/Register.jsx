import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    rol: "cliente",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:4000/api/register", form);
      alert("Registro exitoso ✔️");
      navigate("/login");
    } catch (err) {
      alert("Error: " + err.response?.data?.message);
    }

    setLoading(false);
  };

  return (
    <div className="register-page">
      <div className="register-card uk-card uk-card-default uk-card-body">

        <h2 className="register-title">Crear cuenta</h2>
        <p className="register-subtitle">
          Regístrate para publicar, buscar y gestionar propiedades
        </p>

        <form onSubmit={handleSubmit} className="uk-form-stacked">

          <div className="uk-margin">
            <label className="uk-form-label">Nombre</label>
            <input
              className="uk-input"
              name="username"
              required
              onChange={handleChange}
            />
          </div>

          <div className="uk-margin">
            <label className="uk-form-label">Correo</label>
            <input
              className="uk-input"
              type="email"
              name="email"
              required
              onChange={handleChange}
            />
          </div>

          <div className="uk-margin">
            <label className="uk-form-label">Teléfono</label>
            <input
              className="uk-input"
              name="phone"
              required
              onChange={handleChange}
            />
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">Contraseña</label>
            <input
              className="uk-input"
              type="password"
              name="password"
              required
              onChange={handleChange}
            />
          </div>

          <button
            className="uk-button uk-button-primary uk-width-1-1 register-btn"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Crear cuenta"}
          </button>

        </form>
      </div>
    </div>
  );
}
