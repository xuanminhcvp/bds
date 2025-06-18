export interface UserAdmin {
    id: string;
    email: string;
    name?: string;
    phone?: string;
    avatar?: string;
    is_superuser: boolean;
    is_locked: boolean;
    created_at: string;
}

export interface UserManagement {
    id: string;
    email: string;
    name?: string;
    phone?: string;
    avatar?: string;
    is_superuser: boolean;
    is_locked: boolean;
    created_at: string;
    updated_at: string;
    wallet?: number;
}

export interface AllUserManagement {
    data: UserManagement[];
    count: number;
}