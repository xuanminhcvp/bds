import api from './api';

export const addFavoriteAPI = async (property_id: number) => {
    return await api.post('/favorite/add', { property_id });
}

export const removeFavoriteAPI = async (property_id: number) => {
    return await api.post('/favorite/remove', { property_id });
}

