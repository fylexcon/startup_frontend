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
  Divider,
  Alert,
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
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  PersonAdd,
  CloudUpload,
  Visibility,
  Psychology,
  Analytics,
  FilterList,
  Search,
  Edit,
  Logout,
  Description,
} from "@mui/icons-material";
import styled from "styled-components";

// --- STYLED COMPONENTS ---
const DashboardContainer = styled(Box)`
  padding: 100px 20px 20px;
  background-color: #f8fafc;
  min-height: 100vh;
`;

// Sol Panel (Filtreler ve Profil)
const SidebarPanel = styled(Paper)`
  padding: 20px;
  height: 100%;
  background: white;
  border-radius: 16px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
`;

const ProfileCard = styled(Box)`
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;
`;

const FilterSection = styled(Box)`
  margin-bottom: 24px;
`;

// Sağ Panel (İçerik)
const ContentPanel = styled(Box)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  min-height: 80vh;
`;

const CaseCard = styled(Card)`
  margin-bottom: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: none !important;
  transition: all 0.2s;
  &:hover {
    border-color: #6366f1;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1) !important;
  }
`;

// Link Stili
const PatientLink = styled(Link)`
  text-decoration: none;
  color: #1e293b;
  font-weight: 600;
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

  // MOCK DATA (Vakalar)
  const [cases, setCases] = useState([
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

  return (
    <DashboardContainer>
      <Grid container spacing={3}>
        {/* --- SOL PANEL: PROFİL VE FİLTRELER (Pic 4 Referans Alındı) --- */}
        <Grid item xs={12} md={3}>
          <SidebarPanel elevation={0}>
            {/* Profil Bölümü */}
            <ProfileCard>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  margin: "0 auto 12px",
                  bgcolor: "#6366f1",
                  fontSize: 24,
                }}
              >
                {user?.firstName?.[0] || "D"}
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                Д-р {user?.lastName || "Волков"}
              </Typography>
              <Chip
                label="Патологоанатом"
                size="small"
                color="primary"
                sx={{ mt: 1, mb: 2 }}
              />

              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<Logout />}
                onClick={logout}
                fullWidth
              >
                Выйти
              </Button>
            </ProfileCard>

            {/* Filtreler Bölümü */}
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <FilterList fontSize="small" /> Фильтры
            </Typography>

            <FilterSection>
              <TextField
                fullWidth
                size="small"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
            </FilterSection>

            <FilterSection>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Возраст
              </Typography>
              <Slider
                value={ageRange}
                onChange={handleAgeChange}
                valueLabelDisplay="auto"
                min={0}
                max={100}
                sx={{ color: "#6366f1" }}
              />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="caption">{ageRange[0]}</Typography>
                <Typography variant="caption">{ageRange[1]}</Typography>
              </Box>
            </FilterSection>

            <FilterSection>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Дата приема
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </FilterSection>

            <FilterSection>
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Орган (Organ)</InputLabel>
                <Select
                  value={selectedOrgan}
                  label="Орган"
                  onChange={(e) => setSelectedOrgan(e.target.value)}
                >
                  <MenuItem value="all">Все</MenuItem>
                  <MenuItem value="skin">Кожа (Deri)</MenuItem>
                  <MenuItem value="liver">Печень (Karaciğer)</MenuItem>
                  <MenuItem value="lung">Легкие (Akciğer)</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Диагноз (Tanı)</InputLabel>
                <Select
                  value={selectedDiagnosis}
                  label="Диагноз"
                  onChange={(e) => setSelectedDiagnosis(e.target.value)}
                >
                  <MenuItem value="all">Все</MenuItem>
                  <MenuItem value="melanoma">Меланома</MenuItem>
                  <MenuItem value="carcinoma">Карцинома</MenuItem>
                </Select>
              </FormControl>
            </FilterSection>

            <Button
              variant="contained"
              fullWidth
              sx={{ bgcolor: "#6366f1", mt: 2 }}
            >
              Применить
            </Button>
          </SidebarPanel>
        </Grid>

        {/* --- SAĞ PANEL: VAKA LİSTESİ VE DETAYLAR --- */}
        <Grid item xs={12} md={9}>
          <ContentPanel>
            {/* Üst Aksiyon Butonları */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={4}
            >
              <Typography variant="h5" fontWeight="bold" color="text.primary">
                Клинические случаи (
              </Typography>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  startIcon={<PersonAdd />}
                  onClick={() => setOpenDialog(true)}
                  sx={{ bgcolor: "#6366f1" }}
                >
                  Добавить случай
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  disabled={selectedCases.length === 0}
                >
                  Удалить ({selectedCases.length})
                </Button>
              </Box>
            </Box>

            {/* Arama Barı */}
            <TextField
              fullWidth
              placeholder="Поиск по номеру случая, имени пациента..."
              InputProps={{
                endAdornment: (
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "#cbd5e1", color: "black" }}
                  >
                    Search
                  </Button>
                ),
              }}
              sx={{ mb: 4 }}
            />

            {/* Vaka Listesi (Cards) */}
            <Grid container spacing={2}>
              {cases.map((caseItem) => (
                <Grid item xs={12} key={caseItem.id}>
                  <CaseCard>
                    <CardContent>
                      <Grid container alignItems="center" spacing={2}>
                        {/* Checkbox */}
                        <Grid item xs={1}>
                          <Checkbox
                            checked={selectedCases.includes(caseItem.id)}
                            onChange={() => handleSelectCase(caseItem.id)}
                          />
                        </Grid>

                        {/* Vaka Bilgileri */}
                        <Grid item xs={8}>
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={2}
                            mb={1}
                          >
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              color="#6366f1"
                            >
                              {caseItem.id}
                            </Typography>
                            <Chip
                              label={caseItem.diagnosis}
                              size="small"
                              sx={{ bgcolor: "#e0e7ff", color: "#4338ca" }}
                            />
                          </Box>

                          <Typography variant="body1" gutterBottom>
                            {caseItem.description}
                          </Typography>

                          <Box display="flex" gap={3} mt={1}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              <strong>Пациент:</strong>{" "}
                              <PatientLink to={`/patient/${caseItem.id}`}>
                                {caseItem.patient}
                              </PatientLink>
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              <strong>Дата:</strong> {caseItem.date}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              <strong>Орган:</strong> {caseItem.organ}
                            </Typography>
                          </Box>
                        </Grid>

                        {/* Aksiyonlar */}
                        <Grid item xs={3} sx={{ textAlign: "right" }}>
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
                              >
                                WSI Просмотр
                              </Button>
                            )}
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<Psychology />}
                              color="warning"
                            >
                              ИИ Анализ
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </CaseCard>
                </Grid>
              ))}
            </Grid>
          </ContentPanel>
        </Grid>
      </Grid>

      {/* Yeni Vaka Ekleme Dialogu */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Новый клинический случай</DialogTitle>
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
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Отмена</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContainer>
  );
};

export default DoctorDashboard;
