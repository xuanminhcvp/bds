import { ReactNode } from 'react';

export interface Route {
    path: string;
    component: ReactNode;
    exact?: boolean;
    isPrivate?: boolean;
}

export interface QueryParams {
    [key: string]: string | number | boolean;
}

