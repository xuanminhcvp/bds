import apitoken from './api';
import { api } from './api';
import { Property, PropertyCreate } from '../type/PropertyType';

export const fetchPropertyAPI = async () => {
  return await api.get('/property');
};

export const addPropertyAPI = async (property: PropertyCreate) => {
  return await apitoken.post('/property', property);
};

export const updatePropertyAPI = async(property_id: number, updated_Property: Partial<Property>) => {
  return await apitoken.post(`/property/${property_id}`, updated_Property)
};

export const deletePropertyAPI = async(property_id: number) => {
  return await api.delete(`/property/${property_id}`)
}

export const getPropertyByIdAPI = async(property_id: number) => {
  return await apitoken.get(`/property/${property_id}`)
}