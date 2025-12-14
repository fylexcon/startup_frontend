import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  CardContent,
  InputAdornment,
} from "@mui/material";
import {
  Visibility,
  Edit,
  Delete,
  CloudUpload,
  Download,
  Search,
  FileUpload,
  CreateNewFolder,
  FilterList,
} from "@mui/icons-material";

// Stil Dosyaları
import {
  ArchiveContainer,
  StatsCard,
  TabContainer,
  ActionBar,
  DataContainer,
} from "./styles";

// Bileşenler ve Veri
import FilterModal from "./Filter";
import { MOCK_CASES } from "./data"; // Veri dosyasını import ediyoruz

export default function Archive() {
  const navigate = useNavigate();

  // State Tanımları
  const [openFilter, setOpenFilter] = useState(false);
  const [openWSIDialog, setOpenWSIDialog] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info",
  });

  const [cases, setCases] = useState(MOCK_CASES);

  // --- Handlers ---

  const handleCreateCase = () => navigate("/new-case");
  const toggleFilter = () => setOpenFilter(true);

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAllChecked(e.target.checked);
  const handleTabChange = (_: React.SyntheticEvent, val: number) =>
    setTabValue(val);

  const handleWSIUploadConfirm = () => {
    setSnackbar({
      open: true,
      message: "WSI файл успешно загружен!",
      severity: "success",
    });
    setOpenWSIDialog(false);
  };

  const handleDeleteCase = (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этот случай?")) {
      setCases(cases.filter((c) => c.id !== id));
      setSnackbar({ open: true, message: "Случай удален", severity: "info" });
    }
  };

  const handleExportData = () => {
    setSnackbar({
      open: true,
      message: "Экспорт данных начат...",
      severity: "info",
    });
  };

  // --- Helpers ---

  const getStatusLabel = (status: string) =>
    ({
      active: "Активный",
      in_progress: "В процессе",
      completed: "Завершен",
      archived: "Архивирован",
    }[status] || status);

  const getStatusColor = (status: string): any =>
    ({
      active: "primary",
      in_progress: "warning",
      completed: "success",
      archived: "default",
    }[status] || "default");

  const getAIStatusLabel = (status: string) =>
    ({
      pending: "Анализ...",
      completed: "Готов",
      not_requested: "Не запрошен",
      failed: "Ошибка",
    }[status] || status);

  const getAIStatusColor = (status: string): any =>
    ({
      pending: "warning",
      completed: "success",
      not_requested: "default",
      failed: "error",
    }[status] || "default");

  // --- Filter Logic ---
  const filteredCases = cases.filter((case_) => {
    if (tabValue === 1 && case_.status !== "active") return false;
    if (tabValue === 2 && case_.status !== "in_progress") return false;
    if (tabValue === 3 && case_.status !== "completed") return false;

    if (
      searchQuery &&
      !(
        case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        case_.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        case_.clinic.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
      return false;

    if (statusFilter !== "all" && case_.status !== statusFilter) return false;
    return true;
  });

  const stats = {
    total: cases.length,
    active: cases.filter((c) => c.status === "active").length,
    inProgress: cases.filter((c) => c.status === "in_progress").length,
    completed: cases.filter((c) => c.status === "completed").length,
  };

  return (
    <ArchiveContainer>
      {/* İstatistikler */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {[
          { l: "Всего случаев", v: stats.total, c: "primary.main" },
          { l: "Активных", v: stats.active, c: "success.main" },
          { l: "В процессе", v: stats.inProgress, c: "warning.main" },
          { l: "Завершено", v: stats.completed, c: "info.main" },
        ].map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <StatsCard>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  sx={{ color: s.c, fontWeight: "bold" }}
                >
                  {s.v}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {s.l}
                </Typography>
              </CardContent>
            </StatsCard>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
      <TabContainer>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label={`Все (${cases.length})`} />
          <Tab label={`Активные (${stats.active})`} />
          <Tab label={`В процессе (${stats.inProgress})`} />
          <Tab label={`Завершенные (${stats.completed})`} />
        </Tabs>
      </TabContainer>

      {/* Action Bar */}
      <ActionBar>
        <Box display="flex" gap={2} alignItems="center" flex={1}>
          <TextField
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: { xs: "100%", md: 400 }, bgcolor: "#f5f5f5" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
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
          <Tooltip title="Фильтры">
            <IconButton
              onClick={toggleFilter}
              sx={{ bgcolor: openFilter ? "primary.light" : "transparent" }}
            >
              <FilterList />
            </IconButton>
          </Tooltip>
        </Box>
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            startIcon={<FileUpload />}
            onClick={() => setOpenWSIDialog(true)}
          >
            WSI
          </Button>
          <Button
            variant="contained"
            startIcon={<CreateNewFolder />}
            color="warning"
            onClick={handleCreateCase}
            sx={{ color: "white" }}
          >
            Создать случай
          </Button>
          <Tooltip title="Экспорт данных">
            <IconButton color="primary" onClick={handleExportData}>
              <Download />
            </IconButton>
          </Tooltip>
        </Box>
      </ActionBar>

      {/* Table */}
      <DataContainer>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Список случаев ({filteredCases.length})
        </Typography>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f9fafb" }}>
                <TableCell padding="checkbox">
                  <Checkbox checked={allChecked} onChange={handleCheckAll} />
                </TableCell>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Пациент</strong>
                </TableCell>
                <TableCell>
                  <strong>Клиника</strong>
                </TableCell>
                <TableCell>
                  <strong>Дата</strong>
                </TableCell>
                <TableCell>
                  <strong>ICD-10</strong>
                </TableCell>
                <TableCell>
                  <strong>WSI</strong>
                </TableCell>
                <TableCell>
                  <strong>AI</strong>
                </TableCell>
                <TableCell>
                  <strong>Статус</strong>
                </TableCell>
                <TableCell>
                  <strong>Врач</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Действия</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCases.map((c) => (
                <TableRow key={c.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox checked={allChecked} />
                  </TableCell>
                  <TableCell sx={{ color: "primary.main", fontWeight: "bold" }}>
                    {c.id}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold">
                      {c.patientName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {c.subtitle.substring(0, 30)}...
                    </Typography>
                  </TableCell>
                  <TableCell>{c.clinic}</TableCell>
                  <TableCell>{c.date}</TableCell>
                  <TableCell>
                    <Chip label={c.icd10} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={c.wsiUploaded ? "Да" : "Нет"}
                      size="small"
                      color={c.wsiUploaded ? "success" : "default"}
                      icon={c.wsiUploaded ? <CloudUpload /> : undefined}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getAIStatusLabel(c.aiAnalysis)}
                      size="small"
                      color={getAIStatusColor(c.aiAnalysis)}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(c.status)}
                      size="small"
                      color={getStatusColor(c.status)}
                    />
                  </TableCell>
                  <TableCell>{c.doctor}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Просмотр">
                      <IconButton size="small" color="primary">
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Редактировать">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/editcard/${c.id}`)}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteCase(c.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DataContainer>

      {/* Modals */}
      <FilterModal open={openFilter} onClose={() => setOpenFilter(false)} />

      <Dialog
        open={openWSIDialog}
        onClose={() => setOpenWSIDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Загрузка WSI</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              pt: 2,
              textAlign: "center",
              border: "2px dashed #ccc",
              borderRadius: 2,
              py: 4,
            }}
          >
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUpload />}
            >
              Выберите файлы
              <input type="file" hidden multiple />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWSIDialog(false)}>Отмена</Button>
          <Button onClick={handleWSIUploadConfirm} variant="contained">
            Загрузить
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </ArchiveContainer>
  );
}
