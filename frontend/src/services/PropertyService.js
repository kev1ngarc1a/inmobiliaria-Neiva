import axios from "axios";

const API_URL = "http://localhost:4000/api/properties";

export default class PropertyService {

    async listAll() {
        const res = await axios.get(API_URL);
        return res.data; // devuelve un ARRAY de propiedades
    }

    async listByFilter(filters = {}) {
        const params = new URLSearchParams(filters).toString();
        const res = await axios.get(`${API_URL}?${params}`);
        return res.data; // ARRAY filtrado
    }

    async getById(id) {
        const res = await axios.get(`${API_URL}/${id}`);
        return res.data;
    }

    async create(data) {
        const res = await axios.post(API_URL, data);
        return res.data;
    }

    async update(id, data) {
        const res = await axios.put(`${API_URL}/${id}`, data);
        return res.data;
    }

    async delete(id) {
        const res = await axios.delete(`${API_URL}/${id}`);
        return res.data;
    }
}
