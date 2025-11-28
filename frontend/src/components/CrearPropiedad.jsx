import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function CrearPropiedad() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:4000/api/properties",
      form,
      { headers: { Authorization: `Bearer ${user.token}` } }
    );

    alert("Propiedad creada");
  };

  return (
    <form onSubmit={handleSubmit} className="uk-form-stacked">
      <input className="uk-input" name="title" onChange={handleChange} placeholder="Título" />
      <input className="uk-input uk-margin-top" name="price" onChange={handleChange} placeholder="Precio" />
      <input className="uk-input uk-margin-top" name="location" onChange={handleChange} placeholder="Ubicación" />
      <textarea className="uk-textarea uk-margin-top" name="description" onChange={handleChange} placeholder="Descripción"></textarea>

      <button className="uk-button uk-button-primary uk-margin-top">Publicar</button>
    </form>
  );
}
