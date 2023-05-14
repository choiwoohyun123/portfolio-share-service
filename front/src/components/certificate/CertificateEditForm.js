import React, { useState } from "react";
import { Button, TextField, Card, CardContent, Grid } from "@mui/material";
import * as Api from "../../api";

function CertificateEditForm({ certificate, setIsEditing, setCertificates }) {
  const [name, setName] = useState(certificate.name);
  const [organization, setOrganization] = useState(certificate.organization);
  const [issueDate, setIssueDate] = useState(certificate.issue_date);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.put(`certificates/${certificate.id}`, {
        id: certificate.id,
        name,
        organization,
        issue_date: new Date(issueDate),
      });

      const updateCertificate = res.data;

      setCertificates((prevCertificates) =>
        prevCertificates.map((e) =>
          e.id === certificate.id ? updateCertificate : e
        )
      );
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("자격증정보 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Card className="mb-2">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="자격증명"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="발급기관"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="자격증 발급일"
                type="date"
                value={issueDate}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: today, // 시작일은 오늘 이후로 지정되지 않도록 수정
                }}
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="me-3"
              >
                확인
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setIsEditing(false)}
              >
                취소
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

export default CertificateEditForm;
