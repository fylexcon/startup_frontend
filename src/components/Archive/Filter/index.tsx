import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import { Close, FilterList } from "@mui/icons-material";

const organs = ["Сердце", "Мозг", "Почки", "Печень", "Легкие", "Кожа"];
const diagnosis = ["Меланома", "Невус", "Карцинома", "Киста", "Воспаление"];

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
}

export default function FilterModal({ open, onClose }: FilterModalProps) {
  const [sex, setSex] = useState("");
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 65]);
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string | null>(
    null
  );

  const handleApply = () => {
    onClose();
  };

  const handleReset = () => {
    setSex("");
    setAgeRange([18, 65]);
    setSelectedOrgan(null);
    setSelectedDiagnosis(null);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "20px", padding: "10px" },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <FilterList color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Расширенные фильтры
          </Typography>
        </Box>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3} sx={{ pt: 1 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Пол пациента</InputLabel>
              <Select
                value={sex}
                label="Пол пациента"
                onChange={(e) => setSex(e.target.value)}
              >
                <MenuItem value="">
                  <em>Не выбрано</em>
                </MenuItem>
                <MenuItem value="male">Мужской</MenuItem>
                <MenuItem value="female">Женский</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              options={organs}
              value={selectedOrgan}
              onChange={(_, newValue) => setSelectedOrgan(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Орган / Ткань" size="small" />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ px: 2, py: 1, bgcolor: "#f5f5f5", borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Возрастной диапазон: {ageRange[0]} - {ageRange[1]} лет
              </Typography>
              <Slider
                value={ageRange}
                onChange={(_, v) =>
                  Array.isArray(v) && setAgeRange(v as [number, number])
                }
                valueLabelDisplay="auto"
                min={0}
                max={100}
                sx={{ color: "#4500ff" }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="date"
              label="Дата (От)"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="date"
              label="Дата (До)"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              options={diagnosis}
              value={selectedDiagnosis}
              onChange={(_, newValue) => setSelectedDiagnosis(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Предварительный диагноз"
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleReset} color="error" variant="text">
          Сбросить
        </Button>
        <Button
          onClick={handleApply}
          variant="contained"
          color="primary"
          sx={{ px: 4, borderRadius: 2 }}
        >
          Применить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
