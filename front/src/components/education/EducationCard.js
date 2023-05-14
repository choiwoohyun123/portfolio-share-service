import { Card, CardContent, Typography, Grid, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import * as Api from "../../api";

function EducationCard({ education, isEditable, setIsEditing, setEducations }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Api.delete(`educations/${education.id}`);
      setEducations((prevEducations) =>
        prevEducations.filter((e) => e.id !== education.id)
      );
    } catch (error) {
      console.error(error);
      alert("학력정보 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Card className="mb-2">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={isEditable ? 9 : 12}>
            <Typography variant="h6">{education.school}</Typography>
            <Typography variant="subtitle1">
              {education.major} ({education.degree})
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

export default EducationCard;
