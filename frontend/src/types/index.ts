export interface Property {
    id: number;
    title: string;
    price: string;
    area: string;
    beds: number;
    baths: number;
    location: string;
    description: string;
    images: string[];
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