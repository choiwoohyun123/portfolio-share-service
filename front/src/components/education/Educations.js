import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import * as Api from "../../api";
import Education from "./Education";
import EducationAddForm from "./EducationAddForm";

function Educations({ portfolioOwnerId, isEditable }) {
  // useState로 educations, isAdding 상태 생성
  const [educations, setEducations] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "educations/id" GET 요청, response의 data -> educations 세팅
    Api.get(`educations/${portfolioOwnerId}`)
      .then((res) => setEducations(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, [portfolioOwnerId]);

  return (
    <div className="mb-3 ml-3 mr-3">
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            학력
          </Typography>

          {educations.map((education) => (
            <Education
              key={education.id}
              education={education}
              setEducations={setEducations}
              isEditable={isEditable}
            />
          ))}
          {isAdding && (
            <EducationAddForm
              portfolioOwnerId={portfolioOwnerId}
              setEducations={setEducations}
              setIsAdding={setIsAdding}
            />
          )}
          {isEditable && (
            <Box mt={2} display="flex" justifyContent="center">
              <Button
                onClick={() => setIsAdding(true)}
                variant="contained"
                color="primary"
              >
                +
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Educations;
