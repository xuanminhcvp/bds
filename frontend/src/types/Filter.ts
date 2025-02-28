import { PropertyType, PropertyStatus} from './Property'

export interface PropertyFilter {
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    maxBedrooms?: number;
    minBathrooms?: number;
    maxBathrooms?: number;
    location?: string;
    type?: PropertyType;
    status?: PropertyStatus;
}

export interface SortOptions {
    field: 'price' | 'createdAt';
    order: 'asc' | 'desc';
}



