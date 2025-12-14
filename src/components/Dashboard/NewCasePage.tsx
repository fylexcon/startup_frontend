import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import {
  Save,
  Close,
  Person,
  CalendarToday,
  Biotech,
} from "@mui/icons-material";

const NewCasePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        pt: 12,
        pb: 4,
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Header & Actions */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            Создание нового случая
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Стандартный протокол патологии (Minsk Protocol)
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Close />}
            onClick={() => navigate("/archive")}
            sx={{ bgcolor: "white" }}
          >
            Отмена
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Save />}
            sx={{ boxShadow: 2 }}
          >
            Сохранить
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* SOL KOLON */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Kart 1 */}
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Person color="primary" />
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="primary.main"
                >
                  Информация о пациенте
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="ФИО Пациента"
                  placeholder="Напр: Лиходиевский И. Л."
                  fullWidth
                  size="small"
                />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    label="Идентификационный №"
                    placeholder="7087765A..."
                    fullWidth
                    size="small"
                  />
                  <TextField
                    type="date"
                    label="Дата рождения"
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
                <FormControl fullWidth size="small">
                  <InputLabel>Пол</InputLabel>
                  <Select label="Пол" defaultValue="male">
                    <MenuItem value="male">Мужской</MenuItem>
                    <MenuItem value="female">Женский</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Адрес проживания"
                  multiline
                  rows={2}
                  fullWidth
                  size="small"
                />
              </Box>
            </Paper>

            {/* Kart 2 */}
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <CalendarToday color="primary" />
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="primary.main"
                >
                  Клинические данные
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    type="date"
                    label="Дата забора"
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    type="datetime-local"
                    label="Дата доставки"
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
                <FormControl fullWidth size="small">
                  <InputLabel>Способ получения</InputLabel>
                  <Select label="Способ получения" defaultValue="ops">
                    <MenuItem value="ops">Операционная биопсия</MenuItem>
                    <MenuItem value="fna">Игольчатая биопсия (FNA)</MenuItem>
                    <MenuItem value="exc">Эксцизионная биопсия</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    type="datetime-local"
                    label="Начало обработки"
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    type="number"
                    label="Кол-во фрагментов"
                    defaultValue={1}
                    fullWidth
                    size="small"
                  />
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>

        {/* SAĞ KOLON */}
        <Grid item xs={12} lg={8}>
          <Paper
            sx={{
              p: 4,
              height: "100%",
              borderRadius: 3,
              bgcolor: "rgba(255,255,255,0.9)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
              <Biotech color="primary" fontSize="large" />
              <Typography variant="h6" fontWeight="bold" color="primary.main">
                Патологические данные
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ mb: 1 }}
                >
                  14. Макроскопическое описание
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Напр: 5 фрагментов ткани неправильной формы, бурого цвета..."
                  sx={{ bgcolor: "#f9fafb" }}
                />
              </Box>

              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ mb: 1 }}
                >
                  15. Микроскопическое описание
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  placeholder="В срезах определяются..."
                  sx={{ bgcolor: "#f9fafb" }}
                />
              </Box>

              <Box
                sx={{
                  bgcolor: "#e3f2fd",
                  p: 3,
                  borderRadius: 2,
                  border: "1px solid #90caf9",
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  color="primary.dark"
                  sx={{ mb: 1 }}
                >
                  16. Патогистологическое заключение
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Напр: Кистогранулема..."
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                />
              </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Дата отчета
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  --.--.2025
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="caption" color="text.secondary">
                  Врач-патологоанатом
                </Typography>
                <Typography
                  variant="h6"
                  fontFamily="serif"
                  sx={{ fontStyle: "italic", color: "#1e3a8a" }}
                >
                  Д-р Гржибовских Д. А.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewCasePage;
