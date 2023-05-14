import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import * as Api from "../../api";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";

function Certificates({ portfolioOwnerId, isEditable }) {
  const [certificates, setCertificates] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get(`certificates/${portfolioOwnerId}`)
      .then((res) => setCertificates(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, [portfolioOwnerId]);

  return (
    <div className="mb-3 ml-3 mr-3">
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            자격증
          </Typography>

          {certificates.map((certificate) => (
            <Certificate
              key={certificate.id}
              certificate={certificate}
              setCertificates={setCertificates}
              isEditable={isEditable}
            />
          ))}
          {isAdding && (
            <CertificateAddForm
              portfolioOwnerId={portfolioOwnerId}
              setCertificates={setCertificates}
              setIsAdding={setIsAdding}
            />
          )}
          {isEditable && (
            <Box mt={2} display="flex" justifyContent="center">
              <Button
                onClick={() => setIsAdding(true)}
                variant="contained"
                color="primary"
              >
                +
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Certificates;
