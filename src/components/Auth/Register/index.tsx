// src/components/Auth/index.tsx (MEVCUT DOSYANI GÜNCELLE)
import React, { useState } from "react";
import { useAuth } from "../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  AuthContainer,
  AuthTitle,
  BackGroundWrapper,
  FormWrapper,
  LogoFromContainer,
  FormContainer,
  StyledTextField,
  StyledButton,
  DontHaveAcc,
  DontHaveAccTitle,
  CreateAcc,
} from "./styles";
import { Box, Alert } from "@mui/material";
import Background from "../../../assets/background.jpeg";
import Logo from "../../../assets/logo.png";

const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const success = await login(email, password);
    
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Неверный email или пароль");
    }
  };

  // Test kullanıcıları bilgisi
  const testUsers = [
    { email: 'student@test.com', password: '123456', role: 'Студент' },
    { email: 'teacher@test.com', password: '123456', role: 'Преподаватель' },
    { email: 'doc@test.com', password: '123456', role: 'Врач' }
  ];

  return (
    <AuthContainer>
      <BackGroundWrapper>
        <img src={Background} alt="background" />
      </BackGroundWrapper>

      <FormWrapper>
        <LogoFromContainer>
          <img src={Logo} alt="logo" />
        </LogoFromContainer>

        <FormContainer>
          <AuthTitle>Вход в систему</AuthTitle>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <StyledTextField 
              label="Email" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <StyledTextField 
              label="Пароль" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <StyledButton type="submit" variant="contained">Войти</StyledButton>
          </Box>

          {/* Test kullanıcıları */}
          <Box sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <div style={{ fontSize: '14px', marginBottom: '10px', fontWeight: 'bold' }}>Тестовые пользователи:</div>
            {testUsers.map((user, index) => (
              <div key={index} style={{ fontSize: '12px', margin: '5px 0' }}>
                <strong>{user.role}:</strong> {user.email} / {user.password}
              </div>
            ))}
          </Box>

          <DontHaveAcc>
            <DontHaveAccTitle>Нет аккаунта?</DontHaveAccTitle>
            <CreateAcc to="/register">Зарегистрироваться</CreateAcc>
          </DontHaveAcc>
        </FormContainer>
      </FormWrapper>
    </AuthContainer>
  );
};

export default Auth;
