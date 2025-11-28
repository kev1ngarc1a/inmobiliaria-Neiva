import React, { useEffect, useState } from 'react';
import UIkit from 'uikit';
import { useProperties } from '../contexts/PropertyContext';
import { useAuth } from '../contexts/AuthContext';

export default function CreateEditModal({ propertyToEdit = null, onClose }) {
    const { create, update } = useProperties();
    const { user } = useAuth();

    const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: user?.location || '',
    type: 'arriendo'
    });

    useEffect(() => {
    if (propertyToEdit) {
        setForm({
        title: propertyToEdit.title || '',
        description: propertyToEdit.description || '',
        price: propertyToEdit.price || '',
        category: propertyToEdit.category || '',
        location: propertyToEdit.location || user?.location || '',
        type: propertyToEdit.type || 'arriendo'
        });
    }
    }, [propertyToEdit, user]);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
        ...form,
        price: Number(form.price),
        ownerId: user?.id ?? 'owner-demo'
    };

    if (propertyToEdit) {
        update(propertyToEdit.id, payload);
        UIkit.modal(document.getElementById('modal-create-edit')).hide();
        onClose && onClose();
    } else {
        create(payload);
        UIkit.modal(document.getElementById('modal-create-edit')).hide();
        onClose && onClose();
    }
    };

    return (
    <div id="modal-create-edit" uk-modal="true">
        <div className="uk-modal-dialog uk-modal-body">
        <h2 className="uk-modal-title">{propertyToEdit ? 'Editar publicación' : 'Crear publicación'}</h2>
        <form onSubmit={handleSubmit}>
            <input name="title" value={form.title} onChange={handleChange} className="uk-input uk-margin" placeholder="Título" required />
            <textarea name="description" value={form.description} onChange={handleChange} className="uk-textarea uk-margin" placeholder="Descripción" required />
            <input name="price" value={form.price} onChange={handleChange} type="number" className="uk-input uk-margin" placeholder="Precio" required />
            <input name="category" value={form.category} onChange={handleChange} className="uk-input uk-margin" placeholder="Categoría (Casas, Apartamentos...)" required />
            <input name="location" value={form.location} onChange={handleChange} className="uk-input uk-margin" placeholder="Ubicación" required />
            <select name="type" value={form.type} onChange={handleChange} className="uk-select uk-margin">
            <option value="arriendo">Arriendo</option>
            <option value="venta">Venta</option>
            </select>
            <div className="uk-flex uk-flex-right">
            <button type="button" className="uk-button uk-button-default uk-modal-close" onClick={() => UIkit.modal(document.getElementById('modal-create-edit')).hide()}>Cancelar</button>
            <button type="submit" className="uk-button uk-button-primary uk-margin-left">Guardar</button>
            </div>
        </form>
        </div>
    </div>
    );
}
