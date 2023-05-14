import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid } from "@mui/material";

import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!userState.user) {
      navigate("/login");
      return;
    }
    Api.get("userlist").then((res) => setUsers(res.data));
  }, [userState, navigate]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
            <UserCard user={user} isNetwork />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Network;
