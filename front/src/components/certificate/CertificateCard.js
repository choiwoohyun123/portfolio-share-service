import { Card, CardContent, Typography, Grid, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import * as Api from "../../api";
import formatDate from "../../util/formatDate";

function CertificateCard({
  certificate,
  isEditable,
  setIsEditing,
  setCertificates,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Api.delete(`certificates/${certificate.id}`);
      setCertificates((prevCertificates) =>
        prevCertificates.filter((e) => e.id !== certificate.id)
      );
    } catch (error) {
      console.error(error);
      alert("자격증정보 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Card className="mb-2">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={isEditable ? 9 : 12}>
            <Typography variant="h6">{certificate.name}</Typography>
            <Typography variant="subtitle1">
              기관명 : {certificate.organization}
            </Typography>
            <Typography variant="subtitle1">
              발급일 : {formatDate(certificate.issue_date)}
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

export default CertificateCard;
