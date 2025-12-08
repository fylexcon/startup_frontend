// src/components/Archive/index.tsx
import React, { useState } from "react";
import {
  Box,
  Checkbox,
  TextField,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Typography,
  Grid,
  Card,
  CardContent,
  InputAdornment
} from "@mui/material";
import {
  Visibility,
  Edit,
  Delete,
  CloudUpload,
  Download,
  Share,
  Add,
  Search,
  FileUpload,
  CreateNewFolder,
  FilterList
} from "@mui/icons-material";
import {
  CheckAllContainer,
  CheckAllTitle,
  DataContainer,
  FilterIcon,
  SearchContainer,
  SearchTitle,
  SearchWrapper,
} from "./styles";
import { CardData } from "./CardData";
import card_img_1 from "../../assets/Cardimg_1.jpg";
import card_img_2 from "../../assets/Cardimg_2.jpg";
import FilterModal from "./Filter";
import styled from "styled-components";

// Styled Components
const ArchiveContainer = styled.div`
  position: relative;
  top: 100px;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
`;

const TabContainer = styled(Box)`
  background: white;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const ActionBar = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const StatsCard = styled(Card)`
  background: rgba(255, 255, 255, 0.95) !important;
  border-radius: 15px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
`;

// Расширенные данные карточек с дополнительными полями
export const CardInfo = [
  {
    id: "4098678-9",
    src: card_img_1,
    title: "4098678-9",
    patientName: "Пациент Иванов И.И.",
    subtitle:
      "На СО щеки в ретромолярной области справа и слева с переходом на АО - папулы белого цвета, сливающиеся в кружевной рисунок",
    chip: ["Плоский лишай"],
    clinic: "Минская областная стоматологическая поликлиника",
    date: "2025-10-15",
    status: "completed",
    wsiUploaded: true,
    aiAnalysis: "completed",
    doctor: "Д-р Петров А.В.",
    icd10: "L43.9"
  },
  {
    id: "9098678-9",
    src: card_img_2,
    title: "9098678-9",
    patientName: "Пациент Сидоров П.П.",
    subtitle:
      "в ретромолярной области слева, в области АО НЧ слева, язычной поверхности - образование в пределах здоровых тканей",
    chip: ["Плоский лишай"],
    clinic: "Минская областная стоматологическая поликлиника",
    date: "2025-10-18",
    status: "in_progress",
    wsiUploaded: true,
    aiAnalysis: "pending",
    doctor: "Д-р Волков С.М.",
    icd10: "L43.8"
  },
  {
    id: "1234567-8",
    src: card_img_1,
    title: "1234567-8",
    patientName: "Пациент Козлов М.Н.",
    subtitle: "Биопсия новообразования слизистой оболочки",
    chip: ["Базально-клеточная карцинома"],
    clinic: "Городская больница №5",
    date: "2025-10-20",
    status: "active",
    wsiUploaded: false,
    aiAnalysis: "not_requested",
    doctor: "Д-р Смирнова Е.А.",
    icd10: "C44.3"
  }
];

export default function Archive() {
  const [openFilter, setOpenFilter] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState({ start: "", end: "" });
  const [statusFilter, setStatusFilter] = useState("all");
  const [openWSIDialog, setOpenWSIDialog] = useState(false);
  const [openCreateCase, setOpenCreateCase] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" | "info" });
  const [viewMode, setViewMode] = useState<"cards" | "table">("table");

  const [cases, setCases] = useState(CardInfo);

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllChecked(event.target.checked);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      active: "Активный",
      in_progress: "В процессе",
      completed: "Завершен",
      archived: "Архивирован"
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: "primary",
      in_progress: "warning",
      completed: "success",
      archived: "default"
    };
    return colors[status as keyof typeof colors] || "default";
  };

  const getAIStatusLabel = (status: string) => {
    const labels = {
      pending: "Анализ...",
      completed: "Готов",
      not_requested: "Не запрошен",
      failed: "Ошибка"
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getAIStatusColor = (status: string) => {
    const colors = {
      pending: "warning",
      completed: "success",
      not_requested: "default",
      failed: "error"
    };
    return colors[status as keyof typeof colors] || "default";
  };

  const handleWSIUpload = () => {
    setOpenWSIDialog(true);
  };

  const handleWSIUploadConfirm = () => {
    setSnackbar({ open: true, message: "WSI файл успешно загружен!", severity: "success" });
    setOpenWSIDialog(false);
  };

  const handleCreateCase = () => {
    setOpenCreateCase(true);
  };

  const handleCreateCaseConfirm = () => {
    setSnackbar({ open: true, message: "Новый случай успешно создан!", severity: "success" });
    setOpenCreateCase(false);
  };

  const handleDeleteCase = (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этот случай?")) {
      setCases(cases.filter(c => c.id !== id));
      setSnackbar({ open: true, message: "Случай удален", severity: "info" });
    }
  };

  const handleExportData = () => {
    setSnackbar({ open: true, message: "Экспорт данных начат...", severity: "info" });
  };

  // Фильтрация данных
  const filteredCases = cases.filter(case_ => {
    // По табам
    if (tabValue === 1 && case_.status !== "active") return false;
    if (tabValue === 2 && case_.status !== "in_progress") return false;
    if (tabValue === 3 && case_.status !== "completed") return false;
    if (tabValue === 4 && case_.status !== "archived") return false;

    // По поиску
    if (searchQuery && !(
      case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      case_.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      case_.clinic.toLowerCase().includes(searchQuery.toLowerCase())
    )) return false;

    // По статусу
    if (statusFilter !== "all" && case_.status !== statusFilter) return false;

    // По дате
    if (dateFilter.start && case_.date < dateFilter.start) return false;
    if (dateFilter.end && case_.date > dateFilter.end) return false;

    return true;
  });

  const stats = {
    total: cases.length,
    active: cases.filter(c => c.status === "active").length,
    inProgress: cases.filter(c => c.status === "in_progress").length,
    completed: cases.filter(c => c.status === "completed").length
  };

  return (
    <ArchiveContainer>
      {/* Statistics Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="primary" fontWeight="bold">
                {stats.total}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Всего случаев
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="success.main" fontWeight="bold">
                {stats.active}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Активных
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="warning.main" fontWeight="bold">
                {stats.inProgress}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                В процессе
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="info.main" fontWeight="bold">
                {stats.completed}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Завершено
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>
      </Grid>

      {/* Tabs */}
      <TabContainer>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label={`Все (${cases.length})`} />
          <Tab label={`Активные (${stats.active})`} />
          <Tab label={`В процессе (${stats.inProgress})`} />
          <Tab label={`Завершенные (${stats.completed})`} />
          <Tab label="Архив" />
        </Tabs>
      </TabContainer>

      {/* Action Bar */}
      <ActionBar>
        <Box display="flex" gap={2} alignItems="center" flex={1}>
          {/* Search */}
          <TextField
            placeholder="Поиск по ID, пациенту, клинике..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: 400 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          {/* Date Filter */}
          <TextField
            type="date"
            label="От"
            size="small"
            value={dateFilter.start}
            onChange={(e) => setDateFilter({ ...dateFilter, start: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="date"
            label="До"
            size="small"
            value={dateFilter.end}
            onChange={(e) => setDateFilter({ ...dateFilter, end: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />

          {/* Status Filter */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Статус</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Статус"
            >
              <MenuItem value="all">Все</MenuItem>
              <MenuItem value="active">Активные</MenuItem>
              <MenuItem value="in_progress">В процессе</MenuItem>
              <MenuItem value="completed">Завершенные</MenuItem>
            </Select>
          </FormControl>

          <Tooltip title="Дополнительные фильтры">
            <IconButton onClick={toggleFilter}>
              <FilterList />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Action Buttons */}
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            startIcon={<FileUpload />}
            color="primary"
            onClick={handleWSIUpload}
          >
            Add WSI Files
          </Button>
          <Button
            variant="contained"
            startIcon={<CloudUpload />}
            color="success"
            onClick={handleWSIUpload}
          >
            Add New WSI
          </Button>
          <Button
            variant="contained"
            startIcon={<CreateNewFolder />}
            color="warning"
            onClick={handleCreateCase}
          >
            Create Case
          </Button>
          <Tooltip title="Экспорт данных">
            <IconButton color="info" onClick={handleExportData}>
              <Download />
            </IconButton>
          </Tooltip>
        </Box>
      </ActionBar>

      {/* Table View */}
      <Box sx={{ background: "white", borderRadius: "15px", p: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            Клинические случаи пациентов ({filteredCases.length})
          </Typography>
          <Box>
            <Checkbox checked={allChecked} onChange={handleCheckAll} />
            <Typography component="span" variant="body2">
              Выбрать все
            </Typography>
          </Box>
        </Box>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                <TableCell padding="checkbox">
                  <Checkbox checked={allChecked} onChange={handleCheckAll} />
                </TableCell>
                <TableCell><strong>ID Случая</strong></TableCell>
                <TableCell><strong>Пациент</strong></TableCell>
                <TableCell><strong>Клиника</strong></TableCell>
                <TableCell><strong>Дата</strong></TableCell>
                <TableCell><strong>ICD-10</strong></TableCell>
                <TableCell><strong>WSI</strong></TableCell>
                <TableCell><strong>AI Анализ</strong></TableCell>
                <TableCell><strong>Статус</strong></TableCell>
                <TableCell><strong>Врач</strong></TableCell>
                <TableCell><strong>Действия</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCases.map((case_) => (
                <TableRow key={case_.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox checked={allChecked} />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold" color="primary">
                      {case_.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold">
                      {case_.patientName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {case_.subtitle.substring(0, 50)}...
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">
                      {case_.clinic}
                    </Typography>
                  </TableCell>
                  <TableCell>{case_.date}</TableCell>
                  <TableCell>
                    <Chip label={case_.icd10} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={case_.wsiUploaded ? "Загружен" : "Нет"}
                      size="small"
                      color={case_.wsiUploaded ? "success" : "default"}
                      icon={case_.wsiUploaded ? <CloudUpload /> : undefined}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getAIStatusLabel(case_.aiAnalysis)}
                      size="small"
                      color={getAIStatusColor(case_.aiAnalysis) as any}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(case_.status)}
                      size="small"
                      color={getStatusColor(case_.status) as any}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">{case_.doctor}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={0.5}>
                      <Tooltip title="Просмотр">
                        <IconButton size="small" color="primary">
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Редактировать">
                        <IconButton size="small" color="warning">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Поделиться">
                        <IconButton size="small" color="info">
                          <Share />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Удалить">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteCase(case_.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Legacy Card View (Optional) */}
      {viewMode === "cards" && (
        <DataContainer>
          {openFilter && <FilterModal />}
          {filteredCases.map((item, index) => (
            <CardData {...item} key={index} id={index} checked={allChecked} />
          ))}
        </DataContainer>
      )}

      {/* WSI Upload Dialog */}
      <Dialog open={openWSIDialog} onClose={() => setOpenWSIDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Загрузить WSI файлы</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, textAlign: "center" }}>
            <Button variant="outlined" component="label" startIcon={<CloudUpload />} fullWidth>
              Выберите файлы (.svs, .ndpi, .scn)
              <input type="file" hidden multiple accept=".svs,.ndpi,.scn" />
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block" }}>
              Поддерживаются форматы: SVS, NDPI, SCN
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWSIDialog(false)}>Отмена</Button>
          <Button onClick={handleWSIUploadConfirm} variant="contained">
            Загрузить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Case Dialog */}
      <Dialog open={openCreateCase} onClose={() => setOpenCreateCase(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Создать новый случай</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField fullWidth label="Имя пациента" sx={{ mb: 2 }} />
            <TextField fullWidth label="Клиника" sx={{ mb: 2 }} />
            <TextField fullWidth label="Описание" multiline rows={3} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateCase(false)}>Отмена</Button>
          <Button onClick={handleCreateCaseConfirm} variant="contained">
            Создать
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ArchiveContainer>
  );
}
