export interface UserQueryParams {
    page?: number;
    limit?: number;
    order?: {
        sort?: number;
    };
    email?: string;
    phone?: number;
    username?: string;
    name?: string;
    surname?: string;
    roles?: string;
}