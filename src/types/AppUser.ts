export type AppUser = {
    id: number;
    name: string;
    email: string;
    createdAt?: string; // ISO-8601 string, nullable in backend
};
