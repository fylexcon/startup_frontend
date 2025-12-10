import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthContainer,
  BackGroundWrapper,
  FormWrapper,
  LogoFromContainer,
  AuthTitle,
  AuthSubtitle,
  FormContainer,
  StyledTextField,
  StyledButton,
  DontHaveAcc,
  CreateAcc,
} from "./styles";
import {
  Box,
  MenuItem,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  School,
  MedicalServices,
} from "@mui/icons-material";
import Background from "../../../assets/background.jpeg";
import Logo from "../../../assets/logo.png";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Kayıt mantığı buraya gelecek
    console.log("Kayıt Bilgileri:", formData);
    // Şimdilik başarılı varsayıp login sayfasına atıyoruz
    navigate("/auth");
  };

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
          <AuthTitle>Создать аккаунт</AuthTitle>
          <AuthSubtitle>Присоединяйтесь к платформе Caladrius</AuthSubtitle>

          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <StyledTextField
              label="ФИО (Ad Soyad)"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <StyledTextField
              label="Email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <StyledTextField
              select
              label="Роль (Rol)"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <MenuItem value="student">
                <Box display="flex" alignItems="center" gap={1}>
                  <School fontSize="small" /> Студент
                </Box>
              </MenuItem>
              <MenuItem value="doctor">
                <Box display="flex" alignItems="center" gap={1}>
                  <MedicalServices fontSize="small" /> Врач
                </Box>
              </MenuItem>
              <MenuItem value="teacher">
                <Box display="flex" alignItems="center" gap={1}>
                  <Person fontSize="small" /> Преподаватель
                </Box>
              </MenuItem>
            </StyledTextField>

            <StyledTextField
              label="Пароль"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange}
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
              Зарегистрироваться
            </StyledButton>
          </Box>

          <DontHaveAcc>
            <span>Уже есть аккаунт?</span>
            <CreateAcc to="/auth">Войти</CreateAcc>
          </DontHaveAcc>
        </FormContainer>
      </FormWrapper>
    </AuthContainer>
  );
}
