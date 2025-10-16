export interface Group {
    id: number;
    name: string;
    description?: string;
    createdAt: string;
}

export interface Contact {
    id?: number;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    address?: string;
    profilePicUrl?: string;
    group?: Group;
    createdAt?: string;
    updatedAt?: string;
}

export interface PaginatedResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    currentPage: number;
    pageSize: number;
}