import { Property } from "../types/Property";

const API_URL = "https://api.example.com/properties";

export const fetchProperties = async (): Promise<Property[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error fetching properties: ${reponse.statusText}`);
        const data: Property[] = await reponse.json()
        return data;
        }
    }
    catch (error) {
    console.error("Failed to fetch properties", error);
    throw error;
    }
};

export const fetchPropertyById = async (id: number): Promise<Property> => {
    try {
        const response = await fetch(${API_URL}/${id});
        if (!response.ok) {
            throw new Error(`Error fetching property ${id}: ${reponse.statusText}`);
        const data: Property[] = await reponse.json()
        return data;
        }
    }
    catch (error) {
    console.error("Failed to fetch property ${id}", error);
    throw error;
    }
}

export const createProperty = async (property: Property): Promise<Property> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(property),
        });
        if (!response.ok) {
            throw new Error(`Error creating property: ${response.statusText}`); 
        }
        const data: Property = await reponse.json();
        return data;   
    }
    catch (error) {
        console.error("Failed to create property", error);
        throw error;
    }
};

export const updateProperty = async (id: number, updatedData: Partial<Property>): Promise<Property> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
            throw new Error(`Error updating property ${id}: ${response.statusText}`);
        }
        const data: Property = await response.json();
        return data;
    }
    catch (error) {
        console.error(`Failed to update property ${id}`,error);
        throw error;
    }
};

export const deleteProperty = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error deleting property ${id}: ${response.statusText}`);
        }
    }
    catch (error) {
        console.error(`Failed to delete property ${id}, error`);
        throw error;
    }
};

