import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";

function Project({ project, setProjects, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          project={project}
          setProjects={setProjects}
        />
      ) : (
        <ProjectCard
          project={project}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setProjects={setProjects}
        />
      )}
    </>
  );
}

export default Project;
