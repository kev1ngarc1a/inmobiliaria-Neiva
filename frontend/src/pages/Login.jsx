import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:4000/api/login", {
                email,
                password,
            });

            // Guardar token
            localStorage.setItem("token", res.data.token);

            // ¡AQUÍ ESTABA EL PROBLEMA!
            login(res.data.user);

            alert("Bienvenido " + res.data.user.username);

            navigate("/");
        } catch (err) {
            alert("Error: " + err.response?.data?.message);
        }

        setLoading(false);
    };

    return (
        <div className="uk-container uk-margin-top">
            <h2 className="uk-heading-medium">Iniciar sesión</h2>

            <form onSubmit={handleSubmit} className="uk-form-stacked uk-margin-top">
                <label className="uk-form-label">Correo</label>
                <input
                    className="uk-input"
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className="uk-form-label uk-margin-top">Contraseña</label>
                <input
                    className="uk-input"
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="uk-button uk-button-primary uk-margin-top" disabled={loading}>
                    {loading ? "Ingresando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}
