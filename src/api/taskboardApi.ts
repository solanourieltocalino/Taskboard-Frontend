import axios from "axios";
import type { Project } from "@/types/Project";
import type { Page } from "@/types/Page";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

// GET /projects/:id
export const getProjectById = async (id: number): Promise<Project> => {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
};

// GET /projects?page=&size=
export const getProjectsPage = async (
    page: number,
    size: number
): Promise<Page<Project>> => {
    const response = await api.get<Page<Project>>("/projects", {
        params: { page, size },
    });
    return response.data;
};
