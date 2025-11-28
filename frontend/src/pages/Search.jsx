import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useProperties } from '../contexts/PropertyContext';
import { useAuth } from '../contexts/AuthContext';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Search() {
    const params = useQuery();
    const q = params.get('q') || '';
    const categoryParam = params.get('categoria') || '';

    const [filters, setFilters] = useState({
        query: q,
        category: categoryParam,
        location: '',
        type: ''
    });

    const { listByFilter } = useProperties();
    const [results, setResults] = useState([]);
    const { user } = useAuth();

    // Si el usuario tiene ubicación, usarla
    useEffect(() => {
        setFilters(prev => ({ ...prev, location: user?.location || '' }));
    }, [user]);

    // Cargar resultados desde el backend cuando cambien filtros
    useEffect(() => {
        const load = async () => {
            const res = await listByFilter(filters);
            setResults(Array.isArray(res) ? res : []);
        };
        load();
    }, [filters]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="uk-container uk-margin-top">
            <h2>Buscar propiedades</h2>

            <div className="uk-grid-small" uk-grid="true">
                
                {/* Filtros */}
                <div className="uk-width-1-4@s">
                    <div className="uk-card uk-card-default uk-card-body">
                        <h4>Filtros</h4>

                        <input
                            className="uk-input uk-margin-small"
                            name="query"
                            value={filters.query}
                            onChange={handleChange}
                            placeholder="Buscar..."
                        />

                        <input
                            className="uk-input uk-margin-small"
                            name="category"
                            value={filters.category}
                            onChange={handleChange}
                            placeholder="Categoría"
                        />

                        <input
                            className="uk-input uk-margin-small"
                            name="location"
                            value={filters.location}
                            onChange={handleChange}
                            placeholder="Ubicación"
                        />

                        <select
                            className="uk-select uk-margin-small"
                            name="type"
                            value={filters.type}
                            onChange={handleChange}
                        >
                            <option value="">Cualquiera</option>
                            <option value="arriendo">Arriendo</option>
                            <option value="venta">Venta</option>
                        </select>
                    </div>
                </div>

                {/* Resultados */}
                <div className="uk-width-expand@s">
                    <div className="uk-grid-small uk-child-width-1-2@s" uk-grid="true">

                        {results.map((p) => (
                            <div key={p._id}>
                                <div className="uk-card uk-card-default uk-card-body">
                                    <h3 className="uk-card-title">{p.title}</h3>
                                    <p>{p.description}</p>
                                    <p><strong>{p.price}</strong> - {p.location}</p>

                                    <Link to={`/propiedad/${p._id}`} className="uk-button uk-button-text">
                                        Ver
                                    </Link>
                                </div>
                            </div>
                        ))}

                        {results.length === 0 && <p>No hay resultados</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
