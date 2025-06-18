export interface Notification {
    notification_id: number;
    user_id: string;
    message: string;
    created_at: string;
    is_read: boolean;
}

export interface NotificationCreate {
    message: string;
}

export type NotificationsResponse = Notification[];