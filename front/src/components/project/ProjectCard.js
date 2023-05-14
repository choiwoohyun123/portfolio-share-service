import { Card, CardContent, Typography, Grid, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import * as Api from "../../api";
import formatDate from "../../util/formatDate";

function ProjectCard({ project, isEditable, setIsEditing, setProjects }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Api.delete(`projects/${project.id}`);
      setProjects((prevProjects) =>
        prevProjects.filter((p) => p.id !== project.id)
      );
    } catch (error) {
      console.error(error);
      alert("프로젝트정보 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Card className="mb-2">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={isEditable ? 9 : 12}>
            <Typography variant="h6">{project.title}</Typography>
            <Typography variant="subtitle1">
              시작일 : {formatDate(project.start_date)}
              <br />
              종료일 : {formatDate(project.end_date)}
              <br />
            </Typography>
            <Typography variant="subtitle1">
              프로젝트 내용 :
              <br />
              <span style={{ whiteSpace: "pre-line" }}>
                {project.description}
              </span>
            </Typography>
          </Grid>
          {isEditable && (
            <Grid
              item
              xs={3}
              container
              alignItems="center"
              justifyContent="flex-end"
            >
              <IconButton color="primary" onClick={() => setIsEditing(true)}>
                <Edit />
              </IconButton>
              <IconButton color="secondary" onClick={handleSubmit}>
                <Delete />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
