export interface Property {
  id: string;
  title: string;
  image: string;
  price: number;
  bedrooms: number;
  location: string;
}

export interface PropertyResponse {
  id: string;
  name: string;
  location: string;
  price: number;
}
