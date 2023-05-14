import React, { useState } from "react";
import * as Api from "../../api";
import { Button, TextField, Grid, Card, CardContent, Box } from "@mui/material";

function AwardAddForm({ portfolioOwnerId, setAwards, setIsAdding }) {
  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [date, setDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post(`awards`, {
        user_id: portfolioOwnerId,
        title,
        organization,
        date: new Date(date),
      });
      const createdAward = res.data;
      setAwards((prevAwards) => [...prevAwards, createdAward]);
      setIsAdding(false);
    } catch (error) {
      console.error(error);
      alert("수상 이력 추가에 실패했습니다. 다시 시도해주세요.");
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
                label="수상명"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="주최기관"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="수상일자"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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

export default AwardAddForm;
