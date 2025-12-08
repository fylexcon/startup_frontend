import styled from "styled-components";
import { Chip } from "@mui/material";

export const CardContainer = styled.div`
  width: 100%;
  min-height: 256px;
  display: flex;
  align-items: center;
  margin-top: 3rem;
  padding-bottom: 2rem;
  background: #fff;
  border-radius: 28px;
  box-shadow: 0 12px 32px rgba(99, 102, 241, 0.12);
  transition: box-shadow 0.4s ease;
  &:hover {
    box-shadow: 0 24px 48px rgba(99, 102, 241, 0.22);
  }
  @media (max-width: 768px) {
    flex-direction: column;
    min-height: auto;
    padding: 1.5rem;
  }
`;

export const MyImg = styled.img`
  width: 256px;
  height: 256px;
  border-radius: 28px;
  object-fit: cover;
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.08);
  @media (max-width: 768px) {
    width: 100%;
    max-width: 180px;
    height: auto;
  }
`;

export const ImgAndDescContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-left: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-left: 0;
    margin-top: 1.3rem;
  }
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`;

export const CardCanvasContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const CardInfoTitle = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: #4b4b6a;
  min-width: 140px;
  @media (max-width: 768px) {
    font-size: 24px;
    text-align: center;
    min-width: auto;
  }
`;

export const CardInfoSubitle = styled.div`
  font-size: 18px;
  line-height: 1.5;
  color: #666880;
  max-width: 95%;
  @media (max-width: 768px) {
    font-size: 16px;
    max-width: 100%;
  }
`;

export const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const StyledChip = styled(Chip)`
  min-width: 130px;
  height: 44px;
  background-color: #d9d9d9;
  border-radius: 16px !important;
  font-weight: 600;
  color: #4b4b6a;
  justify-content: center;
`;

export const ClinicTitle = styled.div`
  font-size: 18px;
  color: #828282;
  font-weight: 400;
  margin-top: auto;
  @media (max-width: 768px) {
    font-size: 16px;
    text-align: center;
  }
`;
