import React, { useState } from "react";
import { Button, TextField, Card, CardContent, Grid } from "@mui/material";
import * as Api from "../../api";

function ProjectEditForm({ project, setIsEditing, setProjects }) {
  const [title, setTitle] = useState(project.title);
  const [start_date, setStart_Date] = useState(project.start_date);
  const [end_date, setEnd_Date] = useState(project.end_date);
  const [description, setDescription] = useState(project.description);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.put(`projects/${project.id}`, {
        id: project.id,
        title,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        description,
      });

      const updateProject = res.data;

      setProjects((prevProjects) =>
        prevProjects.map((e) => (e.id === project.id ? updateProject : e))
      );
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("프로젝트 수정에 실패했습니다. 다시 시도해주세요.");
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
                label="프로젝트 명"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="프로젝트 시작일"
                type="date"
                value={start_date}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: today, // 시작일은 오늘 이후로 지정되지 않도록 수정
                }}
                onChange={(e) => {
                  if (
                    end_date &&
                    new Date(e.target.value) > new Date(end_date)
                  ) {
                    // 종료일이 지정되어 있고, 선택한 시작일이 종료일 이후이면 종료일과 같게 수정
                    setEnd_Date(e.target.value);
                  }
                  setStart_Date(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="프로젝트 종료일"
                type="date"
                value={end_date}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: today,
                  min: start_date || undefined,
                }}
                onChange={(e) => {
                  if (
                    start_date &&
                    new Date(e.target.value) < new Date(start_date)
                  ) {
                    setStart_Date(e.target.value);
                  }
                  setEnd_Date(e.target.value);
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

export default ProjectEditForm;
