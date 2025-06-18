import api from './api';
import { NotificationCreate, NotificationsResponse } from '../../types/notification';

export const fetchNotificationsAPI = async () => {
  return await api.get<NotificationsResponse>('/notification/me');
};

export const createNotificationAPI = async (notification: NotificationCreate) => {
  return await api.post('/notification/', notification);
};

export const markNotificationAsReadAPI = async (notificationId: number) => {
  return await api.put(`/notification/${notificationId}/read/`);
}