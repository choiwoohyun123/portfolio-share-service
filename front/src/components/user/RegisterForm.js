import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import * as Api from "../../api";

function RegisterForm() {
  const navigate = useNavigate();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState("");
  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post("user/register", {
        email,
        password,
        name,
      });

      // 로그인 페이지로 이동함.
      navigate("/login");
    } catch (err) {
      console.log("회원가입에 실패하였습니다.", err);
      alert("이미 가입한 이메일입니다.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          회원가입
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="이메일 주소"
            type="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!isEmailValid && email !== ""}
            helperText={
              !isEmailValid && email !== ""
                ? "이메일 형식이 올바르지 않습니다."
                : ""
            }
            margin="normal"
          />

          <TextField
            fullWidth
            label="비밀번호"
            type="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!isPasswordValid && password !== ""}
            helperText={
              !isPasswordValid && password !== ""
                ? "비밀번호는 4글자 이상으로 설정해 주세요."
                : ""
            }
            margin="normal"
          />

          <TextField
            fullWidth
            label="비밀번호 재확인"
            type="password"
            autoComplete="off"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!isPasswordSame && confirmPassword !== ""}
            helperText={
              !isPasswordSame && confirmPassword !== ""
                ? "비밀번호가 일치하지 않습니다."
                : ""
            }
            margin="normal"
          />

          <TextField
            fullWidth
            label="이름"
            type="text"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!isNameValid && name !== ""}
            helperText={
              !isNameValid && name !== ""
                ? "이름은 2글자 이상으로 설정해 주세요."
                : ""
            }
            margin="normal"
          />

          <Box textAlign="center" marginTop={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isFormValid}
              sx={{ mt: 1, width: "100%" }}
            >
              회원가입
            </Button>
          </Box>

          <Box textAlign="center" marginTop={1}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/login")}
              sx={{ mt: 1, width: "100%" }}
            >
              로그인하기
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default RegisterForm;
