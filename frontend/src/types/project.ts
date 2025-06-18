  export interface User {
    id: string;
    email: string;
    name: string;
    phone: string;
    avatar: string;
  }

export interface Project {
  project_id: number;
  user_id: string;
  title: string;
  description: string;
  area: number;
  address: string;
  status: string;
  images: string[];
  company: string;
  created_at: string;
  updated_at: string;
  expires_at: string;
  is_approved: boolean;
}

export interface ProjectCreate {
  title: string;
  description: string;
  area: number;
  address: string;
  status: string;
  images: string[];
  company: string;
}

export interface ProjectResponse {
  project_id: number;
  user_id: string;
  title: string;
  description: string;
  area: number;
  address: string;
  status: string;
  images: string[];
  company: string;
  created_at: string;
  updated_at: string;
  expires_at: string;
  is_approved: boolean;
  user: User;
}