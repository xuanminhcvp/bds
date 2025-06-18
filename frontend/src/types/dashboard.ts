export interface DashboardStats {
  newPosts: number;
  totalViews: number;
  activePosts: number;
}

export interface Notification {
  id: string;
  message: string;
  type: 'new_post' | 'expired' | 'message';
  timestamp: string;
}

export interface ViewData {
  date: string;
  views: number;
}
