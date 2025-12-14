import styled from "styled-components";
import { Box, Paper } from "@mui/material";
// Filter icon importunu eğer kullanıyorsanız buraya ekleyin, yoksa kaldırabilirsiniz.
// import filter_icon from '../../assets/filter_icon.svg';

export const ArchiveContainer = styled.div`
  position: relative;
  top: 100px;
  padding: 24px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: calc(100vh - 100px);
`;

export const StatsCard = styled(Paper)`
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
  border-radius: 20px !important;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15) !important;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const TabContainer = styled(Box)`
  background: white;
  border-radius: 16px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

export const ActionBar = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: white;
  border-radius: 16px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const DataContainer = styled(Box)`
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

// CardData ve CardEdit için gerekli stiller
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
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.15);
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
  }
`;

export const CardInfoSubitle = styled.div`
  font-size: 18px;
  line-height: 1.5;
  color: #666880;
`;

export const ChipContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const ImgAndDescContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  margin-left: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-left: 0;
    margin-top: 1.3rem;
  }
`;

export const CardEditContainer = styled.div`
  margin-top: 190px;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  @media (max-width: 768px) {
    width: 95%;
    margin-top: 140px;
    padding-bottom: 40px;
  }
`;
