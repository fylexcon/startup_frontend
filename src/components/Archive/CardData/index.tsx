import React from "react";
import { Checkbox, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  CardCanvasContainer,
  CardContainer,
  CardInfo,
  CardInfoSubitle,
  CardInfoTitle,
  ChipContainer,
  ImgAndDescContainer,
  MyImg,
} from "./styles"; // styles.ts ile aynı dizindeyse

interface CardDataProps {
  src: string;
  title: string;
  subtitle: string;
  chip: string[];
  clinic: string;
  id: number | string;
  checked?: boolean;
  onToggleChecked?: (id: number | string, checked: boolean) => void;
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

  return (
    <CardContainer>
      <Checkbox
        checked={checked}
        onChange={(e) =>
          onToggleChecked && onToggleChecked(id, e.target.checked)
        }
      />
      <ImgAndDescContainer>
        <MyImg src={src} />
        <CardInfo>
          <CardCanvasContainer>
            <CardInfoTitle>{title}</CardInfoTitle>
            <button
              onClick={() => navigate("/canvas")}
              style={{
                padding: "10px 20px",
                background: "#d9d9d9",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Разметить
            </button>
            <button
              onClick={() => navigate(`/editcard/${id}`)}
              style={{
                padding: "10px 20px",
                background: "#758bfb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Редактировать
            </button>
          </CardCanvasContainer>
          <CardInfoSubitle>{subtitle}</CardInfoSubitle>
          <ChipContainer>
            {chip.map((item, index) => (
              <Chip
                key={index}
                label={item}
                color="primary"
                variant="outlined"
              />
            ))}
          </ChipContainer>
        </CardInfo>
      </ImgAndDescContainer>
    </CardContainer>
  );
};
