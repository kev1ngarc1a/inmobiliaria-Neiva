import React, { createContext, useContext, useState, useEffect } from 'react';
import PropertyService from '../services/PropertyService';

const PropertyContext = createContext();

export function PropertyProvider({ children }) {
    const propertyService = new PropertyService();

    const [properties, setProperties] = useState([]);

    // Cargar todas las propiedades al iniciar
    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = async () => {
        try {
            const data = await propertyService.listAll();
            setProperties(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error cargando propiedades:", error);
        }
    };

    const listByFilter = async (filter) => {
        try {
            const data = await propertyService.listByFilter(filter);
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error("Error filtrando propiedades:", error);
            return [];
        }
    };

    const getById = (id) => {
        return properties.find((p) => p._id === id) || null;
    };

    const create = async (data) => {
        try {
            const newProp = await propertyService.create(data);
            await loadProperties();
            return newProp;
        } catch (error) {
            console.error("Error creando propiedad:", error);
        }
    };

    const update = async (id, data) => {
        try {
            const updated = await propertyService.update(id, data);
            await loadProperties();
            return updated;
        } catch (error) {
            console.error("Error actualizando propiedad:", error);
        }
    };

    const remove = async (id) => {
        try {
            const ok = await propertyService.delete(id);
            await loadProperties();
            return ok;
        } catch (error) {
            console.error("Error eliminando propiedad:", error);
        }
    };

    return (
        <PropertyContext.Provider value={{
            properties,
            listByFilter,
            getById,
            create,
            update,
            remove
        }}>
            {children}
        </PropertyContext.Provider>
    );
}

export function useProperties() {
    return useContext(PropertyContext);
}
