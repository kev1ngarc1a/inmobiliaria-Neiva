import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProperties } from '../contexts/PropertyContext';
import { useAuth } from '../contexts/AuthContext';
import CreateEditModal from '../components/CreateEditModal';
import UIkit from 'uikit';

export default function Property() {
    const { id } = useParams();
    const { getById, remove } = useProperties();
    const { user } = useAuth();
    const navigate = useNavigate();
    const prop = getById(id);
    const [editing, setEditing] = useState(false);

    if (!prop) {
        return (
            <div className="uk-container uk-margin-top">
                <h2>Propiedad no encontrada</h2>
            </div>
        );
    }

    const handleDelete = () => {
        if (confirm('¿Eliminar publicación?')) {
            remove(prop.id);
            navigate('/buscar');
        }
    };

    const openRequestForm = () => {
        const mensaje = prompt('Mensaje para el propietario');
        if (mensaje) {
            UIkit.notification({ message: 'Petición enviada (demo).', status: 'success' });
        }
    };

    // Imagen final a mostrar
    const imageSrc = prop.image
        ? `/img/${prop.image}`          // la imagen que el usuario guardó
        : "/img/image.png";             // imagen por defecto

    return (
        <div className="uk-container uk-margin-top">

            {/* 🏠 TÍTULO */}
            <h2 className="uk-heading-line"><span>{prop.title}</span></h2>

            {/* 🖼️ IMAGEN DE LA PROPIEDAD */}
            <div className="uk-margin">
                <img 
                    src={imageSrc}
                    alt={prop.title}
                    style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px" }}
                />
            </div>

            {/* 📄 DESCRIPCIÓN */}
            <p>{prop.description}</p>

            {/* 💰 PRECIO */}
            <p>Precio: <strong>${prop.price}</strong></p>

            {/* 📍 UBICACIÓN */}
            <p>Ubicación: {prop.location}</p>

            {/* 📦 CATEGORÍA */}
            <p>Categoría: {prop.category}</p>

            {/* 🏡 TIPO */}
            <p>Tipo: {prop.type}</p>

            {/* BOTONES */}
            <div className="uk-margin">
                <button 
                    className="uk-button uk-button-primary" 
                    onClick={openRequestForm}
                >
                    Enviar petición
                </button>

                {user && user.id === prop.ownerId && (
                    <>
                        <button 
                            className="uk-button uk-button-default uk-margin-left"
                            onClick={() => {
                                setEditing(true);
                                UIkit.modal(document.getElementById('modal-create-edit')).show();
                            }}
                        >
                            Editar
                        </button>

                        <button 
                            className="uk-button uk-button-danger uk-margin-left"
                            onClick={handleDelete}
                        >
                            Eliminar
                        </button>
                    </>
                )}
            </div>

            {/* MODAL DE CREAR / EDITAR */}
            <CreateEditModal 
                propertyToEdit={editing ? prop : null} 
                onClose={() => setEditing(false)} 
            />
        </div>
    );
}
