import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProperties } from "../contexts/PropertyContext";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
    const { properties } = useProperties();
    const { user } = useAuth();
    const navigate = useNavigate();

    const categorias = useMemo(() => ['Casas', 'Apartamentos', 'Locales', 'Oficinas', 'Lotes'], []);

    const recomendados = user
        ? properties.filter(p =>
            p.location?.toLowerCase().includes(user.location?.toLowerCase())
        )
        : properties.slice(0, 6);

    return (
        <div className="uk-container uk-margin-top">


            <h2>Categorías</h2>
            <div className="uk-grid-small uk-child-width-1-5@s" uk-grid="true">
                {categorias.map(cat => (
                    <div key={cat}>
                        <div
                            onClick={() =>
                                navigate(`/buscar?categoria=${encodeURIComponent(cat)}`)
                            }
                            className="uk-card uk-card-default uk-card-body uk-text-center uk-link"
                        >
                            {cat}
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="uk-margin-large-top">Recomendados</h2>
            <div className="uk-grid-small uk-child-width-1-3@s" uk-grid="true">
                {recomendados.length === 0 && (
                    <p>No hay recomendaciones para tu ubicación.</p>
                )}

                {recomendados.map(p => (
                    <div key={p.id}>
                        <div className="uk-card uk-card-hover uk-card-default uk-card-body">
                            <h3 className="uk-card-title">{p.title}</h3>
                            <p>{p.description}</p>
                            <p>
                                <strong>{p.price}</strong>
                            </p>
                            <Link
                                to={`/propiedad/${p.id}`}
                                className="uk-button uk-button-text"
                            >
                                Ver
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

