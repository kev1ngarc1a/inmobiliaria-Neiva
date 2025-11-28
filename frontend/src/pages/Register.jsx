import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        const res = await axios.post("http://localhost:4000/api/register", form);

        alert("Registro exitoso ✔️");

      navigate("/login"); // Redirigir al login
    } catch (err) {
        alert("Error: " + err.response?.data?.message);
    }

    setLoading(false);
    };

    return (
    <div className="uk-container uk-margin-top">
        <h2 className="uk-heading-medium">Registrarse</h2>

        <form onSubmit={handleSubmit} className="uk-form-stacked uk-margin-top">

        <label className="uk-form-label">Nombre</label>
        <input
            className="uk-input"
            name="username"
            required
            onChange={handleChange}
        />

        <label className="uk-form-label uk-margin-top">Correo</label>
        <input
            className="uk-input"
            type="email"
            name="email"
            required
            onChange={handleChange}
        />

        <label className="uk-form-label uk-margin-top">Teléfono</label>
        <input
            className="uk-input"
            name="phone"
            required
            onChange={handleChange}
        />

        <label className="uk-form-label uk-margin-top">Rol</label>
        <select className="uk-select" name="rol" onChange={handleChange}>
            <option value="cliente">Cliente</option>
            <option value="admin">Admin</option>
        </select>

        <label className="uk-form-label uk-margin-top">Contraseña</label>
        <input
            className="uk-input"
            type="password"
            name="password"
            required
            onChange={handleChange}
        />

        <button className="uk-button uk-button-primary uk-margin-top" disabled={loading}>
            {loading ? "Registrando..." : "Crear cuenta"}
        </button>
        </form>
    </div>
    );
}
