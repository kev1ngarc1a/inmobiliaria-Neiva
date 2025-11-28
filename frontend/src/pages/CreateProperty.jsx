import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import "../styles/CreateProperty.css";
import BackToDashboard from "../components/BackToDashboard";

export default function CreateProperty() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "Casa",
    location: "",
    type: "arriendo" // ✅ IMPORTANTE (tu backend lo espera)
  });

  const [images, setImages] = useState([]);

  // ✅ INPUTS DE TEXTO
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ INPUT DE IMÁGENES (VERDADER ARRAY)
  const handleImages = (e) => {
    setImages(Array.from(e.target.files));
  };

  // ✅ ENVÍO DEL FORMULARIO
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // ✅ DATOS DEL FORMULARIO
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // ✅ ENVÍO CORRECTO DE MÚLTIPLES IMÁGENES
      if (images.length > 0) {
        images.forEach((img) => {
          formData.append("images", img);
        });
      }

      await axios.post(
        "http://localhost:4000/api/properties",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          },
        }
      );

      alert("✅ Propiedad publicada correctamente");
      navigate("/dashboard");

      // ✅ LIMPIAR FORMULARIO
      setForm({
        title: "",
        description: "",
        price: "",
        category: "Casa",
        location: "",
        type: "arriendo"
      });

      setImages([]);

    } catch (error) {
      alert("❌ Error al publicar propiedad");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="create-property-page">
      <div className="uk-container">
        <BackToDashboard />
        <h2 className="uk-heading-medium">Crear Propiedad</h2>
      </div>

      <div className="create-card">
        <h2>Publicar Propiedad</h2>

        <form onSubmit={handleSubmit} className="uk-form-stacked">

          <label>Título</label>
          <input
            name="title"
            className="uk-input"
            required
            value={form.title}
            onChange={handleChange}
          />

          <label>Contacto y descripción</label>
          <textarea
            name="description"
            className="uk-textarea"
            required
            value={form.description}
            onChange={handleChange}
          />

          <label>Precio</label>
          <input
            name="price"
            type="number"
            className="uk-input"
            required
            value={form.price}
            onChange={handleChange}
          />

          <label>Categoría</label>
          <select
            name="category"
            className="uk-select"
            value={form.category}
            onChange={handleChange}
          >
            <option>Casa</option>
            <option>Apartamento</option>
            <option>Local</option>
            <option>Oficina</option>
            <option>Lote</option>
          </select>

          <label>Ubicación</label>
          <input
            name="location"
            className="uk-input"
            required
            value={form.location}
            onChange={handleChange}
          />

          <label>Imágenes</label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="uk-input"
            onChange={handleImages}
          />

          <button
            className="uk-button uk-button-primary uk-width-1-1"
            disabled={loading}
          >
            {loading ? "Publicando..." : "Publicar"}
          </button>

        </form>
      </div>
    </div>
  );
}
