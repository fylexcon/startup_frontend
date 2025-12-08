import React from "react";
import {
  AuthContainer,
  BackGroundWrapper,
  FormWrapper,
  LogoFromContainer,
  AuthTitle,
  FormContainer,
  StyledTextField,
  StyledButton,
  DontHaveAcc,
  DontHaveAccTitle,
  CreateAcc,
} from "./styles";
import Background from "../../assets/background.jpeg";
import Logo from "../../assets/logo.png";

export default function Auth() {
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
          <AuthTitle>Рады видеть Вас снова</AuthTitle>

          <StyledTextField label="Логин" required />
          <StyledTextField label="Пароль" type="password" required />
          <StyledButton variant="contained">Войти</StyledButton>

          <DontHaveAcc>
            <DontHaveAccTitle>Нет аккаунта?</DontHaveAccTitle>
            <CreateAcc to="/register">Создайте его</CreateAcc>
          </DontHaveAcc>
        </FormContainer>
      </FormWrapper>
    </AuthContainer>
  );
}
