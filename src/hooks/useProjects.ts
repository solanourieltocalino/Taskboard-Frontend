import { useCallback, useEffect, useState } from "react";
import { getProjectsPage } from "@/api/taskboardApi";
import type { Project } from "@/types/Project";

type UseProjectsOptions = {
    initialPage?: number;
    initialSize?: number;
};

type UseProjectsResult = {
    projects: Project[];
    page: number;
    size: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
    reload: () => void;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
};

export const useProjects = (
    options: UseProjectsOptions = {}
): UseProjectsResult => {
    const { initialPage = 0, initialSize = 10 } = options;

    const [projects, setProjects] = useState<Project[]>([]);
    const [page, setPage] = useState<number>(initialPage);
    const [size, setSize] = useState<number>(initialSize);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadPage = useCallback(
        async (targetPage: number, targetSize: number) => {
            try {
                setLoading(true);
                setError(null);

                const response = await getProjectsPage(targetPage, targetSize);

                setProjects(response.content);
                setTotalPages(response.totalPages);
                setPage(response.number); // backend page number
                setSize(response.size);
            } catch (err) {
                console.error("Error loading projects page:", err);
                setError("Failed to load projects list.");
                setProjects([]);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        void loadPage(initialPage, initialSize);
    }, [initialPage, initialSize, loadPage]);

    const reload = () => {
        void loadPage(page, size);
    };

    const goToNextPage = () => {
        if (page + 1 >= totalPages) return;
        void loadPage(page + 1, size);
    };

    const goToPreviousPage = () => {
        if (page === 0) return;
        void loadPage(page - 1, size);
    };

    return {
        projects,
        page,
        size,
        totalPages,
        loading,
        error,
        reload,
        goToNextPage,
        goToPreviousPage,
    };
};
