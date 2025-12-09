import React, { useState } from "react";
import { ProjectsTable } from "@/components/ProjectsTable";
import { getProjectById } from "@/api/taskboardApi";
import { useProjects } from "@/hooks/useProjects";
import type { Project } from "@/types/Project";
import "@/styles/projects.css";

const PAGE_SIZE_OPTIONS = [1, 2, 5];

export const ProjectsPage: React.FC = () => {
    // Search by ID state
    const [projectId, setProjectId] = useState<string>("1");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [loadingSelected, setLoadingSelected] = useState<boolean>(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    // Projects list + pagination state
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(1);

    const {
        data,
        loading: listLoading,
        error: listError,
    } = useProjects({ page, size });

    const totalElements = data?.totalElements ?? 0;
    const totalPages = data?.totalPages ?? 0;
    const currentPage = data?.number ?? page;

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

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage + 1 < totalPages) {
            setPage(currentPage + 1);
        }
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = Number(event.target.value);
        setSize(newSize);
        setPage(0); // reset page when page size changes
    };

    return (
        <div className="projects-page">
            <h1 className="projects-page__title">Projects</h1>

            {/* Search by ID */}
            <section className="projects-search">
                <h2 className="projects-section__title">Search project by ID</h2>

                <div className="projects-search__controls">
                    <label htmlFor="projectIdInput">Project ID:</label>
                    <input
                        id="projectIdInput"
                        type="number"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                    />
                    <button type="button" onClick={handleSearchClick}>
                        Search
                    </button>
                </div>

                {searchError && (
                    <div className="projects-error">
                        {searchError}
                    </div>
                )}
            </section>

            {loadingSelected && (
                <div className="projects-loading">Loading project...</div>
            )}

            {selectedProject && !loadingSelected && (
                <section className="projects-details">
                    <h2 className="projects-section__title">Project details</h2>
                    <pre className="projects-details__pre">
                        {JSON.stringify(selectedProject, null, 2)}
                    </pre>
                </section>
            )}

            {/* List + pagination */}
            <section className="projects-list-section">
                <div className="projects-list-header">
                    <h2 className="projects-section__title">Projects list</h2>

                    <div className="projects-list-meta">
                        <span>Total projects: {totalElements}</span>
                        {totalPages > 0 && (
                            <span>
                                Page {currentPage + 1} of {totalPages}
                            </span>
                        )}

                        <label className="projects-page-size">
                            Page size:
                            <select
                                value={size}
                                onChange={handlePageSizeChange}
                            >
                                {PAGE_SIZE_OPTIONS.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>

                {listError && (
                    <div className="projects-error">
                        {listError}
                    </div>
                )}

                {listLoading && (
                    <div className="projects-loading">
                        Loading projects list...
                    </div>
                )}

                {!listLoading && (
                    <>
                        <ProjectsTable projects={data?.content ?? []} />

                        <div className="projects-pagination">
                            <button
                                type="button"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 0 || totalPages === 0}
                            >
                                Previous
                            </button>
                            <span className="projects-pagination__info">
                                Page {totalPages === 0 ? 0 : currentPage + 1} of{" "}
                                {totalPages || 0}
                            </span>
                            <button
                                type="button"
                                onClick={handleNextPage}
                                disabled={
                                    totalPages === 0 ||
                                    currentPage + 1 >= totalPages
                                }
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};
