import React from "react";
import type { Project } from "@/types/Project";
import "@/styles/projects.css";

type Props = {
    projects: Project[];
};

export const ProjectsTable: React.FC<Props> = ({ projects }) => {
    if (projects.length === 0) {
        return <div className="projects-table__empty">No projects found.</div>;
    }

    return (
        <table className="projects-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Owner name</th>
                    <th>Owner email</th>
                    <th>Created at</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => (
                    <tr key={project.id}>
                        <td>{project.id}</td>
                        <td>{project.name}</td>
                        <td>{project.description || "-"}</td>
                        <td>{project.owner.name}</td>
                        <td>{project.owner.email}</td>
                        <td>{project.createdAt ?? "-"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
