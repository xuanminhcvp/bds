export interface PropertyImage {
    image_url: string,
}

export interface User {
    id: string,
    email: string,
    name: string,
    phone: string,
    avatar: string,
}

export interface Property {
    property_id: number,
    title: string,
    description: string,
    price: number,
    area: number,
    address: string,
    bedrooms: number,
    bathrooms: number,
    property_type: string,
    category: string,
    status: string,
    views: number,
    updated_at: string,
    expires_at: string,
    images: PropertyImage[],
    user: User,
}

export interface PropertyCreate {
    title: string,
    description: string,
    price: number,
    area: number,
    address: string,
    bedrooms: number,
    bathrooms: number,
    property_type: string,
    category: string,
    images: string[],
}