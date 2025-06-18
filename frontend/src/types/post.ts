export interface PostCreate {
  title: string;
  content: string;
  category: string | null; 
  image_url: string[];
  tags?: string[];
}

export interface PostResponse {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string | null;
  user_id: string; 
  published_at: string; 
  updated_at: string; 
  image_url?: string[]; 
  tags?: string[]; 
}
