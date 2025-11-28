export default class Property {
    constructor({
    id = null,
    title = '',
    description = '',
    price = 0,
    category = '',
    location = '',
    type = 'arriendo', // 'arriendo' o 'venta'
    images = [],
    ownerId = null,
    createdAt = null
    } = {}) {
    this.id = id ?? Date.now().toString();
    this.title = title;
    this.description = description;
    this.price = price;
    this.category = category;
    this.location = location;
    this.type = type;
    this.images = images;
    this.ownerId = ownerId;
    this.createdAt = createdAt ?? new Date().toISOString();
    }
}