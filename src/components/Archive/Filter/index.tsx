import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  ToggleButtonGroup,
  ToggleButton,
  Autocomplete,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StyledTextField, StyledButton } from "../../Auth/styles";
import { FilterContainer } from "./styles";

const organs = ["Сердце", "Мозг", "Почки", "Нос"];
const diagnosis = ["Меланома", "Невус с диспалазией", "Синий невус"];

export default function FilterModal() {
  const [sex, setSex] = useState("");
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 65]);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [selectionType, setSelectionType] = useState<"single" | "range">("single");

  return (
    <FilterContainer>
      <Typography variant="h6" gutterBottom>
        Фильтры
      </Typography>

      <Box component="form" noValidate sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="sex-label">Пол</InputLabel>
          <Select
            labelId="sex-label"
            value={sex}
            label="Пол"
            onChange={e => setSex(e.target.value as string)}
          >
            <MenuItem value="male">Мужской</MenuItem>
            <MenuItem value="female">Женский</MenuItem>
          </Select>
        </FormControl>

        <Box>
          <Typography>Диапазон возраста</Typography>
          <Slider
            value={ageRange}
            onChange={(_, v) => Array.isArray(v) && setAgeRange(v as [number,number])}
            valueLabelDisplay="auto"
            min={18}
            max={65}
            sx={{ color: "#4500ff" }}
          />
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <StyledTextField
              label="От"
              type="number"
              value={ageRange[0]}
              onChange={e => setAgeRange([Number(e.target.value), ageRange[1]])}
            />
            <StyledTextField
              label="До"
              type="number"
              value={ageRange[1]}
              onChange={e => setAgeRange([ageRange[0], Number(e.target.value)])}
            />
          </Box>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ToggleButtonGroup
            value={selectionType}
            exclusive
            onChange={(_, v) => v && setSelectionType(v)}
            sx={{ alignSelf: "center" }}
          >
            <ToggleButton value="single">Одна дата</ToggleButton>
            <ToggleButton value="range">Диапазон</ToggleButton>
          </ToggleButtonGroup>

          {selectionType === "single" ? (
            <DatePicker
              label="Выберите дату"
              value={date}
              onChange={setDate}
              slotProps={{ textField: { fullWidth: true } }}
            />
          ) : (
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              slotProps={{
                textField: { fullWidth: true, variant: "outlined" }
              }}
            />
          )}
        </LocalizationProvider>

        <Autocomplete
          options={organs}
          renderInput={params => <StyledTextField {...params} label="Органы" />}
        />
        <Autocomplete
          options={diagnosis}
          renderInput={params => <StyledTextField {...params} label="Диагноз" />}
        />

        <StyledButton variant="contained">Применить</StyledButton>
      </Box>
    </FilterContainer>
  );
}
