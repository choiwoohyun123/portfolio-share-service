import React, { useState } from "react";
import * as Api from "../../api";
import { Button, TextField, Grid, Card, CardContent, Box } from "@mui/material";

function CertificateAddForm({
  portfolioOwnerId,
  setCertificates,
  setIsAdding,
}) {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [issueDate, setIssueDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post(`certificates`, {
        user_id: portfolioOwnerId,
        name,
        organization,
        issue_date: new Date(issueDate),
      });

      const createdCertificate = res.data;
      setCertificates((prevCertificates) => [
        ...prevCertificates,
        createdCertificate,
      ]);
      setIsAdding(false);
    } catch (error) {
      console.error(error);
      alert("자격증 정보 추가에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Card className="mb-2">
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="자격증명"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="발급기관"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="자격증 발급일"
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: today,
                }}
              />
            </Grid>
            <Grid item xs={12} className="mt-3 text-center">
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
                onClick={() => setIsAdding(false)}
              >
                취소
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CertificateAddForm;
