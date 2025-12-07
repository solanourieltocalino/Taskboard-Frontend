import React, { useState } from "react";
import { ProjectsTable } from "@/components/ProjectsTable";
import { getProjectById } from "@/api/taskboardApi";
import { useProjects } from "@/hooks/useProjects";
import type { Project } from "@/types/Project";

export const ProjectsPage: React.FC = () => {
    const [projectId, setProjectId] = useState<string>("1");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [loadingSelected, setLoadingSelected] = useState<boolean>(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    const {
        projects,
        page,
        totalPages,
        loading: listLoading,
        error: listError,
        goToNextPage,
        goToPreviousPage,
    } = useProjects({ initialPage: 0, initialSize: 1 });

    const handleSearchClick = async () => {
        const numericId = Number(projectId);

        if (Number.isNaN(numericId) || numericId <= 0) {
            setSearchError("Please enter a valid numeric project ID.");
            setSelectedProject(null);
            return;
        }

        try {
            setLoadingSelected(true);
            setSearchError(null);
            const project = await getProjectById(numericId);
            setSelectedProject(project);
        } catch (err) {
            console.error("Error fetching project:", err);
            setSearchError("Failed to load project. Please check the ID.");
            setSelectedProject(null);
        } finally {
            setLoadingSelected(false);
        }
    };

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Projects</h1>

            {/* Search by ID */}
            <section style={{ marginBottom: "1.5rem" }}>
                <h2>Search project by ID</h2>
                <label htmlFor="projectIdInput" style={{ marginRight: "0.5rem" }}>
                    Project ID:
                </label>
                <input
                    id="projectIdInput"
                    type="number"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    style={{ marginRight: "0.5rem" }}
                />
                <button onClick={handleSearchClick}>Search</button>

                {searchError && (
                    <div style={{ color: "red", marginTop: "0.5rem" }}>
                        {searchError}
                    </div>
                )}
            </section>

            {loadingSelected && <div>Loading project...</div>}

            {selectedProject && !loadingSelected && (
                <section style={{ marginBottom: "2rem" }}>
                    <h2>Project details</h2>
                    <pre>{JSON.stringify(selectedProject, null, 2)}</pre>
                </section>
            )}

            {/* List + pagination */}
            <section>
                <h2>Projects list</h2>

                {listError && (
                    <div style={{ color: "red", marginBottom: "0.5rem" }}>
                        {listError}
                    </div>
                )}

                {listLoading && <div>Loading projects list...</div>}

                {!listLoading && (
                    <>
                        <ProjectsTable projects={projects} />

                        <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                            <button onClick={goToPreviousPage} disabled={page === 0}>
                                Previous
                            </button>
                            <span>
                                Page {page + 1} of {totalPages || 1}
                            </span>
                            <button onClick={goToNextPage} disabled={totalPages === 0 || page + 1 >= totalPages}>
                                Next
                            </button>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};
