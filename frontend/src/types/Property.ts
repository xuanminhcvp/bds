export interface Property {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    type: PropertyType;
    status: PropertyStatus;
    createdAt: String;
    updatedAt: String;
}

export enum PropertyType {
    APARTMENT = 'APARTMENT',
    HOUSE = 'HOUSE',
    LAND = 'LAND',
    VILLA = 'VILLA',
    OFFICE = 'OFFICE',
}

export enum PropertyStatus {
    FOR_SALE = 'FOR_SALE',
    FOR_RENT = 'FOR_RENT',
    SOLD = 'SOLD',
    RENTED = 'RENTED',
}

export type PropertyList = Property[];

export interface PropertyApiResponse {
    success: boolean;
    data: PropertyList;
    message?: string;
}
