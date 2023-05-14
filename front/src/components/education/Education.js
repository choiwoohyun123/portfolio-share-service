import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

function Education({ education, setEducations, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          education={education}
          setEducations={setEducations}
        />
      ) : (
        <EducationCard
          education={education}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setEducations={setEducations}
        />
      )}
    </>
  );
}

export default Education;
