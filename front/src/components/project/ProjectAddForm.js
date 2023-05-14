import React, { useState } from "react";
import * as Api from "../../api";
import { Button, TextField, Grid, Card, CardContent, Box } from "@mui/material";

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  const [title, setTitle] = useState("");
  const [start_date, setStart_Date] = useState("");
  const [end_date, setEnd_Date] = useState("");
  const [description, setDescription] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post(`projects`, {
        user_id: portfolioOwnerId,
        title,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        description,
      });

      const createdProject = res.data;
      setProjects((prevProjects) => [...prevProjects, createdProject]);
      setIsAdding(false);
    } catch (error) {
      console.error(error);
      alert("프로젝트 정보 추가에 실패했습니다. 다시 시도해주세요.");
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
                label="프로젝트 명"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="프로젝트 시작일"
                type="date"
                value={start_date}
                onChange={(e) => setStart_Date(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: end_date || today,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="프로젝트 종료일"
                type="date"
                value={end_date}
                onChange={(e) => setEnd_Date(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: today,
                  min: start_date || undefined,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="프로젝트 내용"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
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

export default ProjectAddForm;
