import React, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  InputAdornment,
  Checkbox,
} from "@mui/material";
import {
  PersonAdd,
  CloudUpload,
  Visibility,
  Psychology,
  FilterList,
  Search,
  Logout,
  MedicalServices,
  Biotech,
  Description,
} from "@mui/icons-material";
import styled from "styled-components";

// --- STYLED COMPONENTS ---
const DashboardContainer = styled(Box)`
  padding: 100px 24px 24px;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
`;

// Sol Panel (Sabit)
const SidebarPanel = styled(Paper)`
  padding: 24px;
  height: calc(100vh - 140px);
  background: white;
  border-radius: 20px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: 120px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 3px;
  }
`;

const ProfileSection = styled(Box)`
  text-align: center;
  padding-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;
`;

// Sağ Panel (Scrollable İçerik)
const ContentPanel = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CaseCard = styled(Card)`
  border-radius: 16px !important;
  border: 1px solid #e2e8f0;
  box-shadow: none !important;
  transition: all 0.2s;

  &:hover {
    border-color: #6366f1;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.08) !important;
  }
`;

const PatientLink = styled(Link)`
  text-decoration: none;
  color: #1e293b;
  font-weight: 700;
  font-size: 16px;
  &:hover {
    color: #6366f1;
  }
`;

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  // FİLTRE STATE'LERİ
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<number[]>([18, 85]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedOrgan, setSelectedOrgan] = useState("all");
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("all");

  // MOCK DATA
  const [cases] = useState([
    {
      id: "4098678",
      patient: "Иванов И.И.",
      age: 45,
      gender: "М",
      diagnosis: "Базально-клеточная карцинома",
      organ: "skin",
      description: "Опухоль в ретромолярной области справа...",
      date: "2025-10-12",
      status: "active",
      wsi: true,
    },
    {
      id: "4098679",
      patient: "Петрова А.В.",
      age: 32,
      gender: "Ж",
      diagnosis: "Меланома",
      organ: "skin",
      description: "Пигментное образование на спине...",
      date: "2025-10-10",
      status: "completed",
      wsi: true,
    },
    {
      id: "4098680",
      patient: "Сидоров П.П.",
      age: 60,
      gender: "М",
      diagnosis: "Невус",
      organ: "liver",
      description: "Подозрение на метастазы...",
      date: "2025-10-11",
      status: "active",
      wsi: false,
    },
  ]);

  const handleAgeChange = (event: Event, newValue: number | number[]) => {
    setAgeRange(newValue as number[]);
  };

  const handleSelectCase = (id: string) => {
    if (selectedCases.includes(id)) {
      setSelectedCases(selectedCases.filter((cId) => cId !== id));
    } else {
      setSelectedCases([...selectedCases, id]);
    }
  };

  // Filtreleme Mantığı
  const filteredCases = cases.filter(
    (c) =>
      c.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.includes(searchQuery)
  );

  if (!user) return null;

  return (
    <DashboardContainer>
      <Grid container spacing={4}>
        {/* SOL PANEL (FİLTRELER) */}
        <Grid item xs={12} md={3}>
          <SidebarPanel elevation={0}>
            {/* Profil */}
            <ProfileSection>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  margin: "0 auto 16px",
                  bgcolor: "#6366f1",
                  fontSize: 32,
                }}
              >
                {user.firstName[0]}
                {user.lastName[0]}
              </Avatar>
              <Typography variant="h6" fontWeight="bold" color="#1e293b">
                Д-р {user.lastName}
              </Typography>
              <Chip
                label="Патологоанатом"
                color="primary"
                size="small"
                icon={<MedicalServices style={{ color: "white", width: 16 }} />}
                sx={{ mt: 1, fontWeight: 600 }}
              />
              <Button
                variant="outlined"
                color="error"
                size="small"
                fullWidth
                startIcon={<Logout />}
                onClick={logout}
                sx={{ mt: 3, borderRadius: 2 }}
              >
                Выйти
              </Button>
            </ProfileSection>

            {/* Filtreler */}
            <Typography
              variant="subtitle2"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontWeight: 700,
                color: "#64748b",
              }}
            >
              <FilterList fontSize="small" /> Фильтры
            </Typography>

            <Box>
              <TextField
                fullWidth
                size="small"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3, bgcolor: "#f8fafc" }}
              />

              <Typography
                variant="caption"
                fontWeight="bold"
                gutterBottom
                display="block"
              >
                Возраст (Yaş)
              </Typography>
              <Slider
                value={ageRange}
                onChange={handleAgeChange}
                valueLabelDisplay="auto"
                min={0}
                max={100}
                sx={{ color: "#6366f1", mb: 1 }}
              />
              <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography variant="caption" color="text.secondary">
                  {ageRange[0]} лет
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {ageRange[1]} лет
                </Typography>
              </Box>

              <TextField
                fullWidth
                size="small"
                type="date"
                label="Дата приема"
                InputLabelProps={{ shrink: true }}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                sx={{ mb: 3 }}
              />

              <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                <InputLabel>Орган</InputLabel>
                <Select
                  value={selectedOrgan}
                  label="Орган"
                  onChange={(e) => setSelectedOrgan(e.target.value)}
                >
                  <MenuItem value="all">Все</MenuItem>
                  <MenuItem value="skin">Кожа</MenuItem>
                  <MenuItem value="liver">Печень</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                fullWidth
                sx={{ bgcolor: "#6366f1", borderRadius: 2, py: 1 }}
              >
                Применить
              </Button>
            </Box>
          </SidebarPanel>
        </Grid>

        {/* SAĞ PANEL (İÇERİK) */}
        <Grid item xs={12} md={9}>
          <ContentPanel>
            {/* Üst Başlık ve Butonlar */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" fontWeight="800" color="#1e293b">
                Клинические случаи ({filteredCases.length})
              </Typography>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  startIcon={<PersonAdd />}
                  onClick={() => setOpenDialog(true)}
                  sx={{
                    bgcolor: "#6366f1",
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
                  ДОБАВИТЬ СЛУЧАЙ
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  disabled={selectedCases.length === 0}
                  sx={{ borderRadius: 2, fontWeight: 600 }}
                >
                  УДАЛИТЬ ({selectedCases.length})
                </Button>
              </Box>
            </Box>

            {/* Vaka Kartları Listesi */}
            <Box display="flex" flexDirection="column" gap={2}>
              {filteredCases.map((caseItem) => (
                <CaseCard key={caseItem.id}>
                  <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
                    <Grid container alignItems="center" spacing={2}>
                      {/* Checkbox */}
                      <Grid item xs="auto">
                        <Checkbox
                          checked={selectedCases.includes(caseItem.id)}
                          onChange={() => handleSelectCase(caseItem.id)}
                          sx={{ "&.Mui-checked": { color: "#6366f1" } }}
                        />
                      </Grid>

                      {/* Bilgiler */}
                      <Grid item xs>
                        <Box display="flex" alignItems="center" gap={2} mb={1}>
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="#6366f1"
                            sx={{ fontFamily: "monospace" }}
                          >
                            {caseItem.id}
                          </Typography>
                          <Chip
                            label={caseItem.diagnosis}
                            size="small"
                            sx={{
                              bgcolor: "#e0e7ff",
                              color: "#4338ca",
                              fontWeight: 600,
                            }}
                          />
                        </Box>

                        <Typography
                          variant="body1"
                          fontWeight="500"
                          sx={{ mb: 1 }}
                        >
                          {caseItem.description}
                        </Typography>

                        <Box display="flex" gap={4} alignItems="center">
                          <Typography variant="body2" color="text.secondary">
                            Пациент:{" "}
                            <PatientLink to={`/patient/${caseItem.id}`}>
                              {caseItem.patient}
                            </PatientLink>
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Дата: <strong>{caseItem.date}</strong>
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Орган: <strong>{caseItem.organ}</strong>
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Aksiyonlar */}
                      <Grid item xs="auto">
                        <Box display="flex" flexDirection="column" gap={1}>
                          {caseItem.wsi && (
                            <Button
                              variant="contained"
                              size="small"
                              color="success"
                              startIcon={<Visibility />}
                              onClick={() =>
                                navigate(`/canvas?case=${caseItem.id}`)
                              }
                              sx={{
                                borderRadius: 2,
                                fontWeight: 600,
                                bgcolor: "#10b981",
                                boxShadow: "none",
                              }}
                            >
                              WSI ПРОСМОТР
                            </Button>
                          )}
                          <Button
                            variant="outlined"
                            size="small"
                            color="warning"
                            startIcon={<Psychology />}
                            sx={{ borderRadius: 2, fontWeight: 600 }}
                          >
                            ИИ АНАЛИЗ
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CaseCard>
              ))}
            </Box>
          </ContentPanel>
        </Grid>
      </Grid>

      {/* Yeni Vaka Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          Новый клинический случай
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Имя пациента"
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
          />
          <TextField
            margin="dense"
            label="Диагноз (Предварительный)"
            fullWidth
            variant="outlined"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Тип случая</InputLabel>
            <Select defaultValue="paid" label="Тип случая">
              <MenuItem value="paid">Платное</MenuItem>
              <MenuItem value="insurance">Страховка</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ fontWeight: 600, color: "#64748b" }}
          >
            ОТМЕНА
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(false)}
            sx={{ bgcolor: "#6366f1", fontWeight: 600 }}
          >
            СОХРАНИТЬ
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContainer>
  );
};

export default DoctorDashboard;
