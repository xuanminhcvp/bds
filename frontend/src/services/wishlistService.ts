import axios from "axios";
import { Wishlist } from "../types/Wishlist";

const API_URL = "https://api.example.com/properties";

export const addToWishlist = async (property_id: string) => {
    return await axios.post(API_URL, {property_id});
};

export const getWishlist = async (user_id: string): Promise<Wishlist[]> => {
    const response = await axios.get(`${API_URL}/${user_id}`);
    return response.data;
};

export const removeFromWishlist = async (property_id: string) => {
    return await axios.delete(`${API_URL}/${property_id}`);
};




