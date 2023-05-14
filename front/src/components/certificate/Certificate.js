import React, { useState } from "react";
import CertificateCard from "./CertificateCard";
import CertificateEditForm from "./CertificateEditForm";

function Certificate({ certificate, setCertificates, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          certificate={certificate}
          setCertificates={setCertificates}
        />
      ) : (
        <CertificateCard
          certificate={certificate}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setCertificates={setCertificates}
        />
      )}
    </>
  );
}

export default Certificate;
