import { useEffect, useState } from "react";
import { getProjectsPage } from "@/api/taskboardApi";
import type { Project } from "@/types/Project";
import type { Page } from "@/types/Page";

type UseProjectsParams = {
    page: number;
    size: number;
};

type UseProjectsResult = {
    data: Page<Project> | null;
    loading: boolean;
    error: string | null;
};

export const useProjects = ({ page, size }: UseProjectsParams): UseProjectsResult => {
    const [data, setData] = useState<Page<Project> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getProjectsPage(page, size);

                if (!cancelled) {
                    setData(response);
                }
            } catch (err) {
                console.error("Error loading projects page:", err);
                if (!cancelled) {
                    setError("Failed to load projects list.");
                    setData(null);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void load();

        return () => {
            cancelled = true;
        };
    }, [page, size]);

    return { data, loading, error };
};
