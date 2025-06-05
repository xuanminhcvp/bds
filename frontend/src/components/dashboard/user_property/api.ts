import axios from "axios";
import {Property} from "../../../stores/type/PropertyType"; 

export const get_property_by_user= async (token: any): Promise<Property[]> => {
    try { 
        const response = await axios.get(
            'http://127.0.0.1:8000/api/v1/property/me', { 
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response.data;
    } catch(error) {
        throw new Error("Get property by user failed");
    }
};