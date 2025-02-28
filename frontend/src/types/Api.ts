export interface UserApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface ApiError {
    status: number;
    message: string;
    errors?: { [key: string]: string};  
}

export interface PaginationParams {
    page: number;
    limit: number;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
}




