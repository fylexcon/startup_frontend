import React, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  AuthContainer,
  AuthTitle,
  AuthSubtitle,
  BackGroundWrapper,
  FormWrapper,
  LogoFromContainer,
  FormContainer,
  StyledTextField,
  StyledButton,
  DontHaveAcc,
  CreateAcc,
} from "./styles";
import {
  Box,
  Alert,
  Tooltip,
  IconButton,
  InputAdornment,
  Chip,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  ContentCopy,
  Email,
  Lock,
} from "@mui/icons-material";
import Background from "../../assets/background.jpeg";
import Logo from "../../assets/logo.png";

const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      setError("Неверный email или пароль (Hatalı e-posta veya şifre)");
    }
  };

  // Otomatik doldurma fonksiyonu
  const fillCredentials = (u: string, p: string) => {
    setEmail(u);
    setPassword(p);
  };

  const testUsers = [
    { email: "doc@test.com", pass: "123456", label: "Врач " },
    { email: "student@test.com", pass: "123456", label: "Студент " },
    { email: "teacher@test.com", pass: "123456", label: "Преподаватель " },
  ];

  return (
    <AuthContainer>
      {/* SOL TARAFTAKİ BÜYÜK RESİM */}
      <BackGroundWrapper>
        <img src={Background} alt="Medical Background" />
      </BackGroundWrapper>

      {/* SAĞ TARAFTAKİ FORM */}
      <FormWrapper>
        <LogoFromContainer>
          <img src={Logo} alt="Caladrius Logo" />
        </LogoFromContainer>

        <FormContainer>
          <AuthTitle>Добро пожаловать</AuthTitle>
          <AuthSubtitle>Введите свои данные для входа</AuthSubtitle>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <StyledTextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <StyledTextField
              label="Пароль"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <StyledButton type="submit" variant="contained">
              Войти
            </StyledButton>
          </Box>

          {/* Test Kullanıcıları Yardımcısı */}
          <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #e2e8f0" }}>
            <div
              style={{
                fontSize: "12px",
                color: "#94a3b8",
                marginBottom: "10px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontWeight: "bold",
              }}
            >
              Тестовый доступ :
            </div>
            <Box display="flex" gap={1} flexWrap="wrap">
              {testUsers.map((u, i) => (
                <Tooltip key={i} title={`${u.email} / ${u.pass}`}>
                  <Chip
                    label={u.label}
                    onClick={() => fillCredentials(u.email, u.pass)}
                    icon={<ContentCopy fontSize="small" />}
                    size="small"
                    sx={{ cursor: "pointer", bgcolor: "#f1f5f9" }}
                  />
                </Tooltip>
              ))}
            </Box>
          </Box>

          <DontHaveAcc>
            <span>Нет аккаунта?</span>
            <CreateAcc to="/register">Зарегистрироваться</CreateAcc>
          </DontHaveAcc>
        </FormContainer>
      </FormWrapper>
    </AuthContainer>
  );
};

export default Auth;
