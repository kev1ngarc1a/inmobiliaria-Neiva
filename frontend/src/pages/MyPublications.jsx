import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import "../styles/MyPublications.css";
import BackToDashboard from "../components/BackToDashboard";

export default function MyPublications() {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchMyProps = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/properties/mine",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setProperties(res.data);
      } catch (error) {
        console.error("Error cargando publicaciones:", error);
      }
    };

    fetchMyProps();
  }, [user.token]);

  return (
    <div className="my-publications-page uk-container uk-margin-large-top">

      {/* Botón volver */}
      <BackToDashboard />

      {/* Título */}
      <h2 className="uk-heading-medium uk-margin-small-top">
        Mis Publicaciones
      </h2>

      {/* GRID */}
      <div className="my-publications-grid uk-margin-medium-top">
        {properties.length === 0 ? (
          <div className="uk-card uk-card-default uk-card-body uk-text-center">
            <p>Aún no has publicado propiedades.</p>
          </div>
        ) : (
          properties.map((p) => (
            <div className="publication-card" key={p._id}>

              {p.images && p.images.length > 0 ? (
                <img
                  src={`http://localhost:4000${p.images[0]}`}
                  alt={p.title}
                  className="publication-img"
                />
              ) : (
                <div className="no-image">Sin imagen</div>
              )}

              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <span className="price">${p.price}</span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
