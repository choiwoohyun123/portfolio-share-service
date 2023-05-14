import * as Api from "../../api";
import formatDate from "../../util/formatDate";
import { Card, CardContent, Typography, Grid, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

function AwardCard({ award, isEditable, setIsEditing, setAwards }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Api.delete(`awards/${award.id}`);
      setAwards((prevAwards) => prevAwards.filter((e) => e.id !== award.id));
    } catch (error) {
      console.error(error);
      alert("수상이력 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Card className="mb-2">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={isEditable ? 9 : 12}>
            <Typography variant="h6">{award.title}</Typography>
            <Typography variant="subtitle1">
              주최기관 : {award.organization}
            </Typography>
            <Typography variant="subtitle1">
              수상일 : {formatDate(award.date)}
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

export default AwardCard;
