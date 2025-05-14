export interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    area: number;
    bedrooms: number;
    bathrooms: number;
    property_type: string;
    status: string;
    owner_id: string;
    created_at: string;
    updated_at: string;
    is_verified: boolean;
    
    images: string[];
    owner: {
      id: string;
      full_name: string;
      avatar?: string;
      phone_number: string;
    };
  }
  
  
export interface FilterItem {
    label: string;
    value: string;
}
  
export interface LocationStat {
    location: string;
    count: number;
}
  
export interface Article {
    id: number;
    title: string;
}
  
export interface FAQ {
    id: number;
    question: string;
    answer: string;
}