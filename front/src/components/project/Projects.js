import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import * as Api from "../../api";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";

function Projects({ portfolioOwnerId, isEditable }) {
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get(`projects/${portfolioOwnerId}`)
      .then((res) => setProjects(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, [portfolioOwnerId]);

  return (
    <div className="mb-3 ml-3 mr-3">
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            프로젝트
          </Typography>

          {projects.map((project) => (
            <Project
              key={project.id}
              project={project}
              setProjects={setProjects}
              isEditable={isEditable}
            />
          ))}
          {isAdding && (
            <ProjectAddForm
              portfolioOwnerId={portfolioOwnerId}
              setProjects={setProjects}
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

export default Projects;
