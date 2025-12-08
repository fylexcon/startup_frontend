import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const AuthContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  padding: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

export const BackGroundWrapper = styled.div`
  flex: 1;
  animation: ${fadeIn} 0.8s both;
  img {
    width: 100%;
    border-radius: 16px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
    object-fit: cover;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const FormWrapper = styled.div`
  flex: 1;
  max-width: 420px;
  margin-left: 3rem;
  animation: ${fadeIn} 0.8s 0.2s both;
  @media (max-width: 768px) {
    margin: 0;
    width: 100%;
  }
`;

export const LogoFromContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  img { width: 100px; transform: rotate(90deg); transition: transform 0.4s; }
`;

export const AuthTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const FormContainer = styled.div`
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 12px 32px rgba(0,0,0,0.08);
`;

export const StyledTextField = styled(TextField)`
  && {
    width: 100%;
    margin-bottom: 1.5rem;
    & .MuiOutlinedInput-root {
      background: #f1f5f9;
      border-radius: 8px;
      fieldset { border-color: transparent; }
      &:hover fieldset { border-color: #cbd5e1; }
      &.Mui-focused fieldset { border-color: #6366f1; }
    }
    & .MuiInputLabel-root {
      color: #64748b;
      &.Mui-focused { color: #6366f1; }
    }
  }
`;

export const StyledButton = styled(Button)`
  && {
    width: 100%;
    padding: 0.75rem;
    font-weight: 600;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    border-radius: 8px;
    box-shadow: 0 8px 20px rgba(99,102,241,0.25);
    transition: transform 0.3s ease;
    &::before {
      content: "";
      position: absolute;
      top: 0; left: -100%;
      width: 100%; height: 100%;
      background: linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent);
      transition: all 0.5s ease;
    }
    &:hover { transform: translateY(-2px); &::before { left: 100%; } }
  }
`;

export const DontHaveAcc = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: #64748b;
  font-size: 0.9rem;
`;

export const DontHaveAccTitle = styled.span`
  font-weight: 500;
`;

export const CreateAcc = styled(Link)`
  margin-left: 0.5rem;
  color: #6366f1;
  font-weight: 600;
  text-decoration: none;
  &:hover { color: #4f46f0; }
`;
