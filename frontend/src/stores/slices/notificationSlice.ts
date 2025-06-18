import { StateCreator } from 'zustand';
import { Notification } from '../../types/notification';
import { fetchNotificationsAPI, createNotificationAPI, markNotificationAsReadAPI } from '../services/notificationService';

export interface NotificationSlice {
    notifications: Notification[];
    isLoadingNotification: boolean;
    errorNotification: string | null;
    fetchNotifications: () => Promise<void>;
    createNotification: (message: string) => Promise<void>;
    markNotificationAsRead: (notificationId: number) => Promise<void>;
    markAllAsRead: () => Promise<void>;
}

const notificationSlice: StateCreator<NotificationSlice> = (set, get) => ({
    notifications: [],
    isLoadingNotification: false,
    errorNotification: null,
    fetchNotifications: async () => {
        set({ isLoadingNotification: true, errorNotification: null });
        try {
            const response = await fetchNotificationsAPI();
            console.log('Fetched notifications:', response.data);
            set({ notifications: response.data  , isLoadingNotification: false });
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to fetch notifications';
            set({ isLoadingNotification: false, errorNotification: message });
        }
    },

    createNotification: async (message) => {
        set({ isLoadingNotification: true, errorNotification: null });
        try {
            await createNotificationAPI({ message });
            await get().fetchNotifications(); 
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to create notification';
            set({ isLoadingNotification: false, errorNotification: message });
        }
    },
    markNotificationAsRead: async (notificationId) => {
        set({ isLoadingNotification: true, errorNotification: null });
        try {
            await markNotificationAsReadAPI(notificationId);
            
            set((state) => ({
                notifications: state.notifications.map((notif) =>
                notif.notification_id === notificationId ? { 
                    ...notif, 
                    is_read: true } : notif
            ),
            isLoadingNotification: false,
        }));
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to mark notification as read';
            set({ isLoadingNotification: false, errorNotification: message });
        }
    },
    markAllAsRead: async () => {
        set({ isLoadingNotification: true, errorNotification: null });
        try {
            const response = await fetchNotificationsAPI();
            const unreadNotifications = response.data.filter((notif: Notification) => !notif.is_read);
            await Promise.all(unreadNotifications.map((notif: Notification) => markNotificationAsReadAPI(notif.notification_id)));
            set((state) => ({
                notifications: state.notifications.map((notif) => ({ ...notif, is_read: true })),
                isLoadingNotification: false,
            }));
        } catch (error: any) {
            const message = error.response?.data?.message || 'Failed to mark all notifications as read';
            set({ isLoadingNotification: false, errorNotification: message });
        }
    },
});

export default notificationSlice;