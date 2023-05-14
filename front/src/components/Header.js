import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { UserStateContext, DispatchContext } from "../App";

function Header() {
  const navigate = useNavigate();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  const isLogin = !!userState.user;

  const logout = () => {
    sessionStorage.removeItem("userToken");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      style={{ backgroundColor: "#fff" }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            포트폴리오 공유 서비스
          </Typography>
          <Box>
            <Button color="inherit" onClick={() => navigate("/")}>
              나의 페이지
            </Button>
            <Button color="inherit" onClick={() => navigate("/network")}>
              네트워크
            </Button>
            {isLogin && (
              <Button color="inherit" onClick={logout}>
                로그아웃
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
