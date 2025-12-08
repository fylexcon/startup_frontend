import React, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom"; // Link Eklendi
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Divider,
  Alert,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Autocomplete,
  Tooltip,
  Badge,
} from "@mui/material";
import {
  Add,
  PersonAdd,
  Delete,
  CloudUpload,
  Psychology,
  Share,
  Visibility,
  Download,
  Edit,
  AddPhotoAlternate,
  Analytics,
  MedicalServices,
  Science,
  LocalHospital,
  FilterList,
} from "@mui/icons-material";
import styled from "styled-components";

// --- STYLED COMPONENTS ---
const DashboardContainer = styled(Box)`
  padding: 100px 20px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
`;

const StatsCard = styled(Card)`
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(10px);
  border-radius: 15px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
  transition: all 0.3s ease !important;
  &:hover {
    transform: translateY(-4px) !important;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
  }
`;

const UserInfoPanel = styled(Card)`
  background: rgba(255, 255, 255, 0.95) !important;
  padding: 20px !important;
  border-radius: 15px !important;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
  position: sticky;
  top: 120px;
`;

const ActionButton = styled(Button)`
  height: 60px !important;
  font-size: 12px !important;
  transition: all 0.3s ease !important;
  &:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
  }
`;

// Link Stili
const PatientLink = styled(Link)`
  text-decoration: none;
  color: #1976d2;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
    color: #115293;
  }
`;

// Mock Data
const ICD10_CODES = [
  { code: "C44.3", description: "Базально-клеточная карцинома кожи" },
  {
    code: "C50.9",
    description: "Злокачественное новообразование молочной железы",
  },
  { code: "D22.9", description: "Меланоцитарный невус" },
  { code: "L40.0", description: "Псориаз обыкновенный" },
  {
    code: "D48.5",
    description: "Новообразование неопределенного характера кожи",
  },
];

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [openICD10Dialog, setOpenICD10Dialog] = useState(false);
  const [openLabDialog, setOpenLabDialog] = useState(false);
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info",
  });

  const [newCase, setNewCase] = useState({
    patientName: "",
    caseType: "",
    biopsyMethod: "",
    description: "",
    icd10Code: "",
  });
  const [labResults, setLabResults] = useState({
    caseId: "",
    testType: "",
    results: "",
    recommendations: "",
  });

  const [cases, setCases] = useState([
    {
      id: "1",
      patientName: "Пациент Иванов И.И.",
      caseType: "paid",
      biopsyMethod: "incisional",
      status: "active",
      createdDate: "2025-10-12",
      aiAnalysis: "pending",
      wsiUploaded: true,
      description: "Подозрение на злокачественное новообразование",
      icd10Code: "C44.3",
      labResults: null,
      priority: "high",
    },
    {
      id: "2",
      patientName: "Пациента Петрова А.В.",
      caseType: "insurance",
      biopsyMethod: "excisional",
      status: "completed",
      createdDate: "2025-10-10",
      aiAnalysis: "completed",
      wsiUploaded: true,
      description: "Контрольная биопсия после лечения",
      icd10Code: "D22.9",
      labResults: "Гистология: Доброкачественное новообразование",
      priority: "normal",
    },
    {
      id: "3",
      patientName: "Пациент Сидоров П.П.",
      caseType: "express",
      biopsyMethod: "operative",
      status: "active",
      createdDate: "2025-10-11",
      aiAnalysis: "not_requested",
      wsiUploaded: false,
      description: "Экстренное исследование",
      icd10Code: "",
      labResults: null,
      priority: "urgent",
    },
  ]);

  const stats = {
    requestsSent: 1,
    totalRequests: 23,
    completedRequests: 2,
    pendingAI: 1,
    activeWSI: 2,
    urgentCases: cases.filter((c) => c.priority === "urgent").length,
  };

  // Yardımcı Fonksiyonlar (Renk ve Label)
  const getCaseTypeLabel = (type: string) =>
    ({
      paid: "Платное",
      insurance: "Страховка",
      foreign: "Иностр. гражд.",
      permit: "Вид на жительство",
      express: "Экспресс",
      budget: "Бюджет",
    }[type] || type);
  const getAIStatusColor = (status: string) =>
    ({
      pending: "warning",
      completed: "success",
      not_requested: "default",
      failed: "error",
    }[status] || "default");
  const getAIStatusLabel = (status: string) =>
    ({
      pending: "Анализ...",
      completed: "Готов",
      not_requested: "Не запрошен",
      failed: "Ошибка",
    }[status] || status);
  const getPriorityColor = (priority: string) =>
    ({ urgent: "error", high: "warning", normal: "info" }[priority] ||
    "default");

  const handleAddCase = () => {
    const newCaseData = {
      id: (cases.length + 1).toString(),
      ...newCase,
      status: "active",
      createdDate: new Date().toISOString().split("T")[0],
      aiAnalysis: "not_requested",
      wsiUploaded: false,
      labResults: null,
      priority: "normal",
    };
    setCases([...cases, newCaseData]);
    setNewCase({
      patientName: "",
      caseType: "",
      biopsyMethod: "",
      description: "",
      icd10Code: "",
    });
    setOpenDialog(false);
    setSnackbar({
      open: true,
      message: "Случай успешно добавлен!",
      severity: "success",
    });
  };

  const handleRequestAI = (caseId: string) => {
    setCases(
      cases.map((c) => (c.id === caseId ? { ...c, aiAnalysis: "pending" } : c))
    );
    setSnackbar({
      open: true,
      message: "AI анализ запущен...",
      severity: "info",
    });
    setTimeout(() => {
      setCases((prev) =>
        prev.map((c) =>
          c.id === caseId ? { ...c, aiAnalysis: "completed" } : c
        )
      );
      setSnackbar({
        open: true,
        message: "AI анализ завершен!",
        severity: "success",
      });
    }, 3000);
  };

  const filteredCases =
    filterStatus === "all"
      ? cases
      : cases.filter((c) => c.status === filterStatus);

  if (!user) return null;

  return (
    <DashboardContainer>
      <Grid container spacing={3}>
        {/* SOL PROFİL PANELİ */}
        <Grid item xs={12} lg={3}>
          <UserInfoPanel>
            <Badge badgeContent={stats.urgentCases} color="error">
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  margin: "0 auto 15px",
                  border: "4px solid #6366f1",
                }}
              >
                {user.firstName[0]}
                {user.lastName[0]}
              </Avatar>
            </Badge>
            <Typography variant="h6" fontWeight="bold">
              {user.firstName} {user.lastName}
            </Typography>
            <Chip
              label="ВРАЧ-ПАТОЛОГОАНАТОМ"
              color="error"
              size="small"
              sx={{ mb: 2, fontWeight: "bold" }}
            />
            <Box sx={{ textAlign: "left", mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Учреждение:</strong>
                <br />
                {user.institution}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Отделение:</strong>
                <br />
                {user.department}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Email:</strong>
                <br />
                {user.email}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Button
              variant="contained"
              color="error"
              onClick={logout}
              size="small"
              fullWidth
            >
              Выйти
            </Button>
          </UserInfoPanel>
        </Grid>

        {/* SAĞ İÇERİK PANELİ */}
        <Grid item xs={12} lg={9}>
          {/* HIZLI İŞLEMLER */}
          <StatsCard sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Быстрые действия
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <ActionButton
                    variant="contained"
                    startIcon={<PersonAdd />}
                    fullWidth
                    color="primary"
                    onClick={() => setOpenDialog(true)}
                  >
                    Добавить
                    <br />
                    случай
                  </ActionButton>
                </Grid>
                <Grid item xs={6} md={3}>
                  <ActionButton
                    variant="contained"
                    startIcon={<CloudUpload />}
                    fullWidth
                    color="success"
                    onClick={() => navigate("/canvas")}
                  >
                    Загрузить
                    <br />
                    WSI
                  </ActionButton>
                </Grid>
                <Grid item xs={6} md={3}>
                  <ActionButton
                    variant="contained"
                    startIcon={<Science />}
                    fullWidth
                    color="warning"
                  >
                    Патогистологическое
                    <br />
                    исследование
                  </ActionButton>
                </Grid>
                <Grid item xs={6} md={3}>
                  <ActionButton
                    variant="contained"
                    startIcon={<Analytics />}
                    fullWidth
                    color="info"
                    onClick={() => navigate("/archive")}
                  >
                    Архив
                    <br />
                    пациентов
                  </ActionButton>
                </Grid>
              </Grid>
            </CardContent>
          </StatsCard>

          {/* VAKA TABLOSU */}
          <StatsCard>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6">
                  Клинические случаи ({filteredCases.length})
                </Typography>
                <Box display="flex" gap={2}>
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Фильтр</InputLabel>
                    <Select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      label="Фильтр"
                    >
                      <MenuItem value="all">Все</MenuItem>
                      <MenuItem value="active">Активные</MenuItem>
                      <MenuItem value="completed">Завершенные</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    startIcon={<PersonAdd />}
                    onClick={() => setOpenDialog(true)}
                  >
                    Добавить случай
                  </Button>
                </Box>
              </Box>

              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                      <TableCell>
                        <strong>Приоритет</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Пациент</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Описание</strong>
                      </TableCell>
                      <TableCell>
                        <strong>ICD-10</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Тип</strong>
                      </TableCell>
                      <TableCell>
                        <strong>WSI</strong>
                      </TableCell>
                      <TableCell>
                        <strong>ИИ Анализ</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Статус</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Действия</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredCases.map((case_) => (
                      <TableRow key={case_.id} hover>
                        <TableCell>
                          <Chip
                            label={
                              case_.priority === "urgent" ? "Срочно" : "Обычно"
                            }
                            color={getPriorityColor(case_.priority) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {/* GÜNCELLENDİ: HASTA İSMİ LİNK YAPILDI */}
                          <PatientLink to={`/patient/${case_.id}`}>
                            {case_.patientName}
                          </PatientLink>
                          <Typography
                            variant="caption"
                            display="block"
                            color="text.secondary"
                          >
                            {case_.createdDate}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption">
                            {case_.description}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={case_.icd10Code || "-"}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getCaseTypeLabel(case_.caseType)}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={case_.wsiUploaded ? "Загружен" : "Нет"}
                            color={case_.wsiUploaded ? "success" : "default"}
                            size="small"
                            icon={<CloudUpload />}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getAIStatusLabel(case_.aiAnalysis)}
                            color={getAIStatusColor(case_.aiAnalysis) as any}
                            size="small"
                          />
                          {case_.aiAnalysis === "pending" && (
                            <LinearProgress
                              sx={{ width: 40, height: 4, mt: 0.5 }}
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={
                              case_.status === "active"
                                ? "Активный"
                                : "Завершен"
                            }
                            color={
                              case_.status === "active" ? "primary" : "default"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Box display="flex">
                            <Tooltip title="WSI">
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() =>
                                  navigate(`/canvas?case=${case_.id}`)
                                }
                                disabled={!case_.wsiUploaded}
                              >
                                <Visibility />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="AI">
                              <IconButton
                                size="small"
                                color="warning"
                                onClick={() => handleRequestAI(case_.id)}
                                disabled={case_.aiAnalysis === "pending"}
                              >
                                <Psychology />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </StatsCard>
        </Grid>
      </Grid>

      {/* DIALOGLAR (Kısalttım, orijinal mantık aynı) */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Добавить новый случай</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Имя пациента"
            value={newCase.patientName}
            onChange={(e) =>
              setNewCase({ ...newCase, patientName: e.target.value })
            }
            sx={{ mt: 2, mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Тип</InputLabel>
            <Select
              value={newCase.caseType}
              label="Тип"
              onChange={(e) =>
                setNewCase({ ...newCase, caseType: e.target.value })
              }
            >
              <MenuItem value="paid">Платное</MenuItem>
              <MenuItem value="insurance">Страховка</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Отмена</Button>
          <Button onClick={handleAddCase} variant="contained">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </DashboardContainer>
  );
};

export default DoctorDashboard;
