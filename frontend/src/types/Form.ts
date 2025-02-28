export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}