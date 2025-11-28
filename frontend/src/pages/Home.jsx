import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProperties } from "../contexts/PropertyContext";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Home.css";

export default function Home() {
  const { properties } = useProperties();
  const { user } = useAuth();
  const navigate = useNavigate();

  const categorias = useMemo(
    () => [
      { name: "Casas", icon: "home" },
      { name: "Apartamentos", icon: "thumbnails" },
      { name: "Locales", icon: "cart" },
      { name: "Oficinas", icon: "desktop" },
      { name: "Lotes", icon: "location" }
    ],
    []
  );

  const recomendados = user
    ? properties.filter(p =>
        p.location?.toLowerCase().includes(user.location?.toLowerCase())
      )
    : properties.slice(0, 6);

  return (
    <div className="uk-container uk-container-large uk-padding-large">

      {/* HERO */}
      <div className="home-hero uk-text-center uk-margin-large-bottom">
        <h1 className="hero-title">Encuentra tu propiedad ideal</h1>
        <p className="hero-subtitle">
          Explora casas, apartamentos, oficinas y más en tu ciudad
        </p>
      </div>

      {/* CATEGORÍAS */}
      <h2 className="categories-title">Categorías</h2>

      <div 
        className="uk-grid-small uk-child-width-1-5@m uk-child-width-1-2@s uk-flex-center" 
        uk-grid="true"
      >
        {categorias.map(cat => (
          <div key={cat.name}>
            <div
              onClick={() =>
                navigate(`/buscar?categoria=${encodeURIComponent(cat.name)}`)
              }
              className="category-card"
            >
              <span 
                uk-icon={`icon: ${cat.icon}; ratio: 1.7`} 
                className="category-icon"
              ></span>
              <div className="category-title">{cat.name}</div>
            </div>
          </div>
        ))}
      </div>

      {/* RECOMENDADOS */}
      <h2 className="recomendados-title">
        Recomendados para ti
      </h2>

      <div 
        className="uk-grid-medium uk-child-width-1-3@m uk-child-width-1-2@s uk-flex-center" 
        uk-grid="true"
      >
        {recomendados.length === 0 && (
          <div className="uk-text-center uk-width-1-1">
            <p>No hay recomendaciones para tu ubicación.</p>
          </div>
        )}

        {recomendados.map(p => (
          <div key={p.id}>
            <div className="prop-card">
              
              <div className="img-prop-placeholder">
                <span uk-icon="icon: image; ratio: 2.5"></span>
              </div>

              <h3 className="uk-card-title">{p.title}</h3>

              <p className="descripcion-card">
                {p.description.substring(0, 80)}...
              </p>

              <p className="precio-card">
                ${p.price.toLocaleString()}
              </p>

              <Link
                to={`/propiedad/${p.id}`}
                className="uk-button uk-button-primary uk-width-1-1"
              >
                Ver propiedad
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
