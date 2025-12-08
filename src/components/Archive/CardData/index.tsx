import React from "react";
import { Checkbox } from "@mui/material";
import {
  CardCanvasContainer,
  CardContainer,
  CardInfo,
  CardInfoSubitle,
  CardInfoTitle,
  ChipContainer,
  ClinicTitle,
  ImgAndDescContainer,
  MyImg,
  StyledChip,
} from "./styles";
import { StyledButton } from "../../Auth/styles";
import { useNavigate } from "react-router-dom";

interface CardDataProps {
  src: string;
  title: string;
  subtitle: string;
  chip: string[];
  clinic: string;
  id: number;
  checked?: boolean;
  onToggleChecked?: (id: number, checked: boolean) => void;
}

export const CardData: React.FC<CardDataProps> = ({
  src,
  title,
  subtitle,
  chip,
  clinic,
  id,
  checked = false,
  onToggleChecked,
}) => {
  const navigate = useNavigate();

  const handleClickCanvas = () => {
    navigate("/canvas");
  };

  const handleClickEdit = () => {
    navigate(`/editcard/${id}`);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onToggleChecked) {
      onToggleChecked(id, event.target.checked);
    }
  };

  return (
    <CardContainer>
      <Checkbox checked={checked} onChange={handleCheckboxChange} />
      <ImgAndDescContainer>
        <MyImg src={src} />
        <CardInfo>
          <CardCanvasContainer>
            <CardInfoTitle>{title}</CardInfoTitle>
            <StyledButton
              onClick={handleClickCanvas}
              style={{
                width: "200px",
                backgroundColor: "#d9d9d9",
                color: "#000",
                textAlign: "center",
              }}
            >
              Разметить
            </StyledButton>
            <StyledButton
              onClick={handleClickEdit}
              style={{
                width: "200px",
                backgroundColor: "#758bfb",
                color: "#000",
                textAlign: "center",
              }}
            >
              Редактировать
            </StyledButton>
          </CardCanvasContainer>
          <CardInfoSubitle>{subtitle}</CardInfoSubitle>
          <ChipContainer>
            {chip.map((item, index) => (
              <StyledChip sx={{ borderRadius: "0" }} label={item} key={index} />
            ))}
          </ChipContainer>
          <ClinicTitle>{clinic}</ClinicTitle>
        </CardInfo>
      </ImgAndDescContainer>
    </CardContainer>
  );
};
