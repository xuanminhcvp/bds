export interface ItemCreate {
    title: string
    description: string
    price: number
    area: number
    address: string
    propertyType: "apartment" | "house" | "land"
}

export interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    images: string [];
    location: string;
    contactInfo: {
        name: string;
        phone: string;
        email: string;
    };
}

