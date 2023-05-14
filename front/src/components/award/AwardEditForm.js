import React, { useState } from "react";
import { Button, TextField, Card, CardContent, Grid } from "@mui/material";
import * as Api from "../../api";

function AwardEditForm({ award, setIsEditing, setAwards }) {
  const [title, setTitle] = useState(award.title);
  const [organization, setOrganization] = useState(award.organization);
  const [date, setDate] = useState(award.date);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.put(`awards/${award.id}`, {
        id: award.id,
        title,
        organization,
        date: new Date(date),
      });

      const updateAward = res.data;

      setAwards((prevAwards) =>
        prevAwards.map((e) => (e.id === award.id ? updateAward : e))
      );
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("수상이력 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Card className="mb-2">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                fullWidth
                variant="outlined"
                label="수상명"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                variant="outlined"
                label="주최기관"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                variant="outlined"
                label="수상일자"
                type="date"
                value={date}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: today,
                }}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>

            <Grid item container justifyContent="center">
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

export default AwardEditForm;
