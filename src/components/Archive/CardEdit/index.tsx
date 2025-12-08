import React, { useState } from "react";
import { TextField, Box } from "@mui/material";
import { StyledButton } from "../../Auth/styles";
import { CardEditContainer } from "./styles";
import { interFont } from "../../../fonts/font";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";

interface CardData {
  title: string;
  subtitle: string;
  clinic: string;
  name: string;
  date_of_birth: string;
  sex: string;
  address: string;
  date_of_biomaterial: string;
  how_to_take_material: string;
  date_of_delivery: string;
  time_of_delivery: string;
  date_of_start_gist: string;
  time_of_start_gist: string;
  count_of_organs: string;
  name_of_reactions: string;
  reserch_organ: string;
  localization: string;
  chip: string[];
  macro_desc: string;
  micro_desc: string;
  description_of_macro: string;
  recomendations: string;
  doc: string;
}

interface ConclusionDetailsType {
  [key: string]: string | string[];
  clinic: string;
  name: string;
  title: string;
  date_of_birth: string;
  sex: string;
  address: string;
  date_of_biomaterial: string;
  how_to_take_material: string;
  date_of_delivery: string;
  time_of_delivery: string;
  date_of_start_gist: string;
  time_of_start_gist: string;
  count_of_organs: string;
  name_of_reactions: string;
  reserch_organ: string;
  localization: string;
  chip: string[];
  macro_desc: string;
  micro_desc: string;
  description_of_macro: string;
  subtitle: string;
  recomendations: string;
  doc: string;
}

// Mock data eklendi - boş array yerine
const CardInfo: CardData[] = [
  {
    title: "Патогистологическое заключение №1",
    subtitle: "Биопсия кожи",
    clinic: "Городская больница №1",
    name: "Иванов Иван Иванович",
    date_of_birth: "1985-05-15",
    sex: "Мужской",
    address: "ул. Пушкина, д. 10, кв. 5",
    date_of_biomaterial: "2025-10-10",
    how_to_take_material: "Инцизионная биопсия",
    date_of_delivery: "2025-10-11",
    time_of_delivery: "14:30",
    date_of_start_gist: "2025-10-12",
    time_of_start_gist: "09:00",
    count_of_organs: "1",
    name_of_reactions: "Гематоксилин-эозин",
    reserch_organ: "Кожа",
    localization: "Левая рука",
    chip: ["Базально-клеточная карцинома"],
    macro_desc: "Фрагмент кожи размером 1.5x1.0x0.3 см",
    micro_desc: "Эпидермис с признаками акантоза",
    description_of_macro: "Новообразование с четкими границами",
    recomendations: "Рекомендуется дальнейшее наблюдение",
    doc: "д-р Волков А.В."
  }
];

const ConclusionDetails: ConclusionDetailsType = {
  clinic: "",
  name: "",
  title: "",
  date_of_birth: "",
  sex: "",
  address: "",
  date_of_biomaterial: "",
  how_to_take_material: "",
  date_of_delivery: "",
  time_of_delivery: "",
  date_of_start_gist: "",
  time_of_start_gist: "",
  count_of_organs: "",
  name_of_reactions: "",
  reserch_organ: "",
  localization: "",
  chip: [],
  macro_desc: "",
  micro_desc: "",
  description_of_macro: "",
  subtitle: "",
  recomendations: "",
  doc: "",
};

// DÜZELTILMIŞ assignValues fonksiyonu
const assignValues = (
  source: CardData | undefined, // undefined olabilir
  target: ConclusionDetailsType
): ConclusionDetailsType => {
  const result: ConclusionDetailsType = { ...target };
  
  // HATA KONTROLESİ EKLENDİ
  if (!source || typeof source !== 'object') {
    return result; // Boş template döndür
  }
  
  (Object.keys(result) as Array<keyof CardData>).forEach((key) => {
    // VERİ KONTROLESİ EKLENDİ
    if (source && key in source) {
      if (key === "chip") {
        result[key] = Array.isArray(source[key]) ? source[key] : [];
      } else {
        result[key] = typeof source[key] === "string" ? source[key] : "";
      }
    }
  });
  return result;
};

const CreatePdfForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const cardIndex = id ? parseInt(id) : 0;
  
  // GÜVENLİ ELEMAN SEÇME
  const selectedCard = CardInfo[cardIndex] || undefined;

  const [formData, setFormData] = useState<ConclusionDetailsType>(() => {
    // SAFE INITIALIZATION
    return assignValues(selectedCard, ConclusionDetails);
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    // EN AZ TEMEL ALANLAR DOLU OLSUN
    const requiredFields = ['clinic', 'name', 'title'];
    return requiredFields.every(field => {
      const value = formData[field];
      return Array.isArray(value) ? value.length > 0 : !!value;
    });
  };

  const handleCreatePdf = () => {
    try {
      const doc = new jsPDF();
      doc.addFileToVFS("Inter-Italic-VariableFont_opsz,wght.ttf", interFont);
      doc.addFont("Inter-Italic-VariableFont_opsz,wght.ttf", "Inter", "normal");
      doc.setFont("Inter");
      doc.setFontSize(18);
      doc.text("Заключение", 10, 10);

      let yPosition = 20;
      Object.entries(formData).forEach(([key, value], index) => {
        doc.setFontSize(12);
        const text = Array.isArray(value) ? value.join(", ") : String(value);
        doc.text(`${key}: ${text}`, 10, yPosition + index * 10);
      });

      doc.save("Заключение.pdf");
    } catch (error) {
      console.error("PDF creation error:", error);
    }
  };

  return (
    <CardEditContainer>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          padding: "24px",
          paddingTop: "120px", // Header için boşluk
        }}
      >
        <h1
          style={{
            width: "100%",
            marginBottom: 24,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          Заключение {selectedCard ? `#${cardIndex}` : "(Новый)"}
        </h1>
        
        {/* BİLGİ MESAJI */}
        {!selectedCard && (
          <div style={{ 
            width: "100%", 
            padding: "16px", 
            backgroundColor: "#e3f2fd", 
            borderRadius: "8px",
            marginBottom: "16px"
          }}>
            <p>Новое заключение - заполните все поля</p>
          </div>
        )}
        
        {Object.keys(formData).map((key) => (
          <TextField
            key={key}
            name={key}
            label={key.replace(/_/g, ' ').toUpperCase()}
            value={Array.isArray(formData[key]) ? (formData[key] as string[]).join(', ') : formData[key]}
            onChange={handleChange}
            multiline
            minRows={2}
            sx={{
              flex: "1 1 45%",
              minWidth: 280,
              backgroundColor: "#f9fafb",
              borderRadius: 2,
            }}
          />
        ))}
        <StyledButton
          variant="contained"
          disabled={!isFormValid()}
          onClick={handleCreatePdf}
          sx={{ width: "100%", mt: 3, fontWeight: "bold" }}
        >
          Создать заключение PDF
        </StyledButton>
      </Box>
    </CardEditContainer>
  );
};

export default CreatePdfForm;
