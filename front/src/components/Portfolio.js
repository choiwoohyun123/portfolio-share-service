import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid, Box } from "@mui/material";

import { UserStateContext } from "../App";
import * as Api from "../api";
import User from "./user/User";
import Educations from "./education/Educations";
import Awards from "./award/Awards";
import Projects from "./project/Projects";
import Certificates from "./certificate/Certificates";

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);

  const fetchPorfolioOwner = async (ownerId) => {
    const res = await Api.get("users", ownerId);
    const ownerData = res.data;
    setPortfolioOwner(ownerData);
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }

    if (params.userId) {
      const ownerId = params.userId;
      fetchPorfolioOwner(ownerId);
    } else {
      const ownerId = userState.user.id;
      fetchPorfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item md={3} lg={3}>
          <Box mt={2}>
            <User
              portfolioOwnerId={portfolioOwner.id}
              isEditable={portfolioOwner.id === userState.user?.id}
            />
          </Box>
        </Grid>

        <Grid item md={9} lg={9}>
          <Box mt={2}>
            <Educations
              portfolioOwnerId={portfolioOwner.id}
              isEditable={portfolioOwner.id === userState.user?.id}
            />
            <Awards
              portfolioOwnerId={portfolioOwner.id}
              isEditable={portfolioOwner.id === userState.user?.id}
            />
            <Projects
              portfolioOwnerId={portfolioOwner.id}
              isEditable={portfolioOwner.id === userState.user?.id}
            />
            <Certificates
              portfolioOwnerId={portfolioOwner.id}
              isEditable={portfolioOwner.id === userState.user?.id}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Portfolio;
