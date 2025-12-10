import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const AuthContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  padding: 2rem;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

export const BackGroundWrapper = styled.div`
  flex: 1;
  max-width: 50%;
  height: 85vh;
  animation: ${fadeIn} 0.8s both;

  img {
    width: 100%;
    height: 100%;
    border-radius: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    object-fit: cover;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const FormWrapper = styled.div`
  flex: 1;
  max-width: 450px;
  margin-left: 4rem;
  animation: ${fadeIn} 0.8s 0.2s both;

  @media (max-width: 900px) {
    margin: 0;
    width: 100%;
    max-width: 100%;
  }
`;

export const LogoFromContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  img {
    height: 60px;
    width: auto;
    transition: transform 0.4s;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
`;

export const AuthTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-align: center;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const AuthSubtitle = styled.p`
  text-align: center;
  color: #64748b;
  margin-bottom: 2rem;
  font-size: 0.95rem;
`;

export const StyledTextField = styled(TextField)`
  && {
    width: 100%;
    margin-bottom: 1.25rem;

    & .MuiOutlinedInput-root {
      background: #f8fafc;
      border-radius: 12px;
      fieldset {
        border-color: #e2e8f0;
      }
      &:hover fieldset {
        border-color: #cbd5e1;
      }
      &.Mui-focused fieldset {
        border-color: #6366f1;
        border-width: 2px;
      }
    }
    & .MuiInputLabel-root {
      color: #64748b;
      &.Mui-focused {
        color: #6366f1;
      }
    }
  }
`;

export const StyledButton = styled(Button)`
  && {
    width: 100%;
    padding: 1rem;
    font-weight: 700;
    font-size: 1rem;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.25);
    transition: transform 0.3s ease;
    margin-top: 1rem;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 25px rgba(99, 102, 241, 0.35);
    }
  }
`;

export const DontHaveAcc = styled.div`
  margin-top: 2rem;
  text-align: center;
  color: #64748b;
  font-size: 0.95rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const DontHaveAccTitle = styled.span`
  font-weight: 500;
`;

export const CreateAcc = styled(Link)`
  color: #6366f1;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #4f46e5;
    text-decoration: underline;
  }
`;
