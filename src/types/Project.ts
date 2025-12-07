import type { AppUser } from "@/types/AppUser";

export type Project = {
    id: number;
    name: string;
    description: string;
    createdAt?: string; // ISO-8601 string, nullable in backend
    owner: AppUser;
};
