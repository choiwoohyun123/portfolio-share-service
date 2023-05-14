import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import * as Api from "../../api";

function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding }) {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [degree, setDegree] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post(`educations`, {
        user_id: portfolioOwnerId,
        school,
        major,
        degree,
      });

      const createdEducation = res.data;
      setEducations((prevEducations) => [...prevEducations, createdEducation]);
      setIsAdding(false);
    } catch (error) {
      console.error(error);
      alert("학력 정보 추가에 실패했습니다. 다시 시도해주세요.");
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
                label="학교 이름을 입력하세요."
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                variant="outlined"
                label="전공"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
              />
            </Grid>

            <Grid item>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                >
                  <FormControlLabel
                    value="재학 중"
                    control={<Radio />}
                    label="재학 중"
                  />
                  <FormControlLabel
                    value="학사 졸업"
                    control={<Radio />}
                    label="학사 졸업"
                  />
                  <FormControlLabel
                    value="석사 졸업"
                    control={<Radio />}
                    label="석사 졸업"
                  />
                  <FormControlLabel
                    value="박사 졸업"
                    control={<Radio />}
                    label="박사 졸업"
                  />
                </RadioGroup>
              </FormControl>
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
                onClick={() => setIsAdding(false)}
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

export default EducationAddForm;
