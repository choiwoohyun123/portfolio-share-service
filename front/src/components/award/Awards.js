import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import * as Api from "../../api";
import Award from "./Award";
import AwardAddForm from "./AwardAddForm";

function Awards({ portfolioOwnerId, isEditable }) {
  const [awards, setAwards] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get(`awards/${portfolioOwnerId}`)
      .then((res) => setAwards(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, [portfolioOwnerId]);

  return (
    <div className="mb-3 ml-3 mr-3">
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            수상 이력
          </Typography>

          {awards.map((award) => (
            <Award
              key={award.id}
              award={award}
              setAwards={setAwards}
              isEditable={isEditable}
            />
          ))}
          {isAdding && (
            <AwardAddForm
              portfolioOwnerId={portfolioOwnerId}
              setAwards={setAwards}
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

export default Awards;
