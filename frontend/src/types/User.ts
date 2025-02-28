export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string; 
}

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    AGENT = 'AGENT',
}

export interface UserApiResponse {
    success: boolean;
    data: User;
    message?: string;
}

