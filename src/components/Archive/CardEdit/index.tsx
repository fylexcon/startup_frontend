import React, { useState } from "react";
import { TextField, Box, Button, Typography, Paper } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { CardEditContainer } from "./styles";

export default function CreatePdfForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: `Case #${id || "New"}`,
    patientName: "",
    diagnosis: "",
    description: "",
    clinic: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <CardEditContainer>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#333", fontWeight: "bold" }}
        >
          Редактирование заключения {id ? `#${id}` : ""}
        </Typography>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}
        >
          <TextField
            label="Название случая"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="ФИО Пациента"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Диагноз"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Описание"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />

          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate("/archive")}
            >
              Отмена
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/archive")}
            >
              Сохранить изменения
            </Button>
          </Box>
        </Box>
      </Paper>
    </CardEditContainer>
  );
}
