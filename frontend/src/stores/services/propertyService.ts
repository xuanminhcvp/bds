import api from './api';
import { Property, PropertyCreate } from '../type/PropertyType';
import { PropertyFilterSlice } from '../slices/propertyFilterSlice';

export const fetchPropertyAPI = async (filterProperty?: PropertyFilterSlice['filterProperty']) => {
  const params: Record<string, any> = {};
  if (!filterProperty) {
    return await api.get('/property');
  }
  if (filterProperty.property_type) params.property_type = filterProperty.property_type;
  if (filterProperty.category) params.category = filterProperty.category;
  if (filterProperty.price.min !== null) params.price_min = filterProperty.price.min*1000000;
  if (filterProperty.price.max !== null) params.price_max = filterProperty.price.max*1000000;
  if (filterProperty.area.min !== null) params.area_min = filterProperty.area.min;
  if (filterProperty.area.max !== null) params.area_max = filterProperty.area.max;
  if (filterProperty.bedrooms !== null) params.bedrooms = filterProperty.bedrooms;
  if (filterProperty.bathrooms !== null) params.bathrooms = filterProperty.bathrooms;
  if (filterProperty.address) params.address = filterProperty.address;
  if (filterProperty.title) params.title = filterProperty.title;
  if (filterProperty.created_at) params.created_at = filterProperty.created_at;

  return await api.get('/property', { params });
};


export const addPropertyAPI = async (property: PropertyCreate) => {
  return await api.post('/property', property);
};

export const updatePropertyAPI = async (
  property_id: number,
  updated_Property: Partial<Property>
) => {
  return await api.post(`/property/${property_id}`, updated_Property);
};

export const deletePropertyAPI = async (property_id: number) => {
  return await api.delete(`/property/${property_id}`);
};

export const getPropertyByIdAPI = async (property_id: number) => {
  return await api.get(`/property/${property_id}`);
};

export const getPropertyByUserAPI = async () => {
  return await api.get('/property/me');
}

export const extendPropertyAPI = async (
  property_id: number,
  days: number
) => {
  return await api.post(`/property/${property_id}/extend`, { days });
};

export const updatePropertyStatusAPI = async (
  property_id: number,
  status: string
) => {
  return await api.post(`/property/${property_id}/status`, { status });
};
