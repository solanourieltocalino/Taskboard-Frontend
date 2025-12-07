import React from "react";
import type { Project } from "@/types/Project";

type Props = {
    projects: Project[];
};

export const ProjectsTable: React.FC<Props> = ({ projects }) => {
    if (projects.length === 0) {
        return <div>No projects found.</div>;
    }

    return (
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
                <tr>
                    <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>ID</th>
                    <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                        Name
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                        Owner
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                        Created at
                    </th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => (
                    <tr key={project.id}>
                        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                            {project.id}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                            {project.name}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                            {project.owner.name}
                        </td>
                        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                            {project.createdAt ?? "-"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
