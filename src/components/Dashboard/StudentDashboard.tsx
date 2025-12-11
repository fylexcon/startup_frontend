import React, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
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
  LinearProgress,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Visibility,
  MenuBook,
  Assignment,
  School,
  PlayCircle,
  Description,
  Quiz,
  CheckCircle,
  Lock,
  Search,
  FilterList,
  Logout,
  ArrowForward,
  Notifications,
  AccessTime,
} from "@mui/icons-material";
import styled from "styled-components";

// --- STYLED COMPONENTS ---
const DashboardContainer = styled(Box)`
  padding: 100px 24px 24px;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
`;

// Sol Panel (Profil ve Filtreler) - Sabit kalacak
const SidebarPanel = styled(Paper)`
  padding: 24px;
  height: calc(100vh - 140px); /* Ekran boyuna göre ayarla */
  background: white;
  border-radius: 20px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: 120px;
  overflow-y: auto; /* İçerik taşarsa scroll */
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

// Sağ Panel (İçerik) - Scroll edilebilir alan
const ContentPanel = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const SectionTitle = styled(Typography)`
  font-weight: 800 !important;
  color: #1e293b;
  margin-bottom: 20px !important;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.25rem !important;
`;

// İstatistik Kartları
const StatCard = styled(Card)`
  border-radius: 20px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08) !important;
    border-color: #cbd5e1;
  }
`;

// Materyal Kartı
const MaterialCard = styled(Card)`
  border-radius: 20px !important;
  border: 1px solid #e2e8f0;
  box-shadow: none !important;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  background: white;

  &:hover {
    border-color: #6366f1;
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.1) !important;
  }
`;

// Tablo Konteyner
const ModernTableContainer = styled(TableContainer)`
  border-radius: 20px !important;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
  background: white;
  overflow: hidden;
`;

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // STATE
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // MOCK DATA: Assigned Cases
  const [assignedCases] = useState([
    {
      id: "1",
      patientName: "Случай #101: Базалиома",
      caseType: "educational",
      status: "assigned",
      assignedDate: "2025-10-12",
      completed: false,
      teacher: "Проф. Сидорова",
      description: "Изучение инцизионной биопсии кожи",
      difficulty: "Начальный",
      viewCount: 3,
      maxViews: 10,
    },
    {
      id: "2",
      patientName: "Случай #102: Меланома",
      caseType: "educational",
      status: "completed",
      assignedDate: "2025-10-10",
      completed: true,
      teacher: "Проф. Сидорова",
      description: "Анализ эксцизионной биопсии",
      difficulty: "Средний",
      score: 85,
      viewCount: 7,
      maxViews: 10,
    },
    {
      id: "3",
      patientName: "Случай #103: Саркома",
      caseType: "educational",
      status: "locked",
      assignedDate: null,
      completed: false,
      teacher: "Проф. Сидорова",
      description: "Сложный случай операционного материала",
      difficulty: "Продвинутый",
      prerequisite: "Завершите случай №2",
      viewCount: 0,
      maxViews: 15,
    },
    {
      id: "4",
      patientName: "Случай #104: Карцинома",
      caseType: "educational",
      status: "assigned",
      assignedDate: "2025-10-15",
      completed: false,
      teacher: "Д-р Волков",
      description: "Гистологический анализ тканей легкого",
      difficulty: "Средний",
      viewCount: 1,
      maxViews: 10,
    },
  ]);

  // MOCK DATA: Learning Materials
  const [learningMaterials] = useState([
    {
      id: "1",
      title: "Основы патогистологии",
      type: "video",
      duration: "45 мин",
      completed: true,
      progress: 100,
      icon: <PlayCircle sx={{ color: "#ef4444" }} />,
    },
    {
      id: "2",
      title: "Техники биопсии",
      type: "document",
      pages: 24,
      completed: false,
      progress: 60,
      icon: <Description sx={{ color: "#3b82f6" }} />,
    },
    {
      id: "3",
      title: "WSI навигация и анализ",
      type: "interactive",
      exercises: 12,
      completed: false,
      progress: 25,
      icon: <Quiz sx={{ color: "#8b5cf6" }} />,
    },
  ]);

  const stats = {
    assigned: assignedCases.length,
    completed: assignedCases.filter((c) => c.completed).length,
    avgScore: 85,
    hours: 24,
  };

  // Helper Functions
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Начальный":
        return "success";
      case "Средний":
        return "warning";
      case "Продвинутый":
        return "error";
      default:
        return "default";
    }
  };

  const handleViewCase = (caseId: string) => {
    const case_ = assignedCases.find((c) => c.id === caseId);
    if (case_ && case_.status !== "locked") {
      navigate(`/canvas?case=${caseId}&mode=student`);
    }
  };

  // Filtering Logic
  const filteredCases = assignedCases.filter((c) => {
    const matchesSearch = c.patientName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDiff =
      filterDifficulty === "all" || c.difficulty === filterDifficulty;
    const matchesStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "completed"
        ? c.completed
        : !c.completed; // active

    return matchesSearch && matchesDiff && matchesStatus;
  });

  if (!user) return null;

  return (
    <DashboardContainer>
      <Grid container spacing={4}>
        {/* --- SOL PANEL: PROFİL VE FİLTRELER (SABİT) --- */}
        <Grid item xs={12} md={3}>
          <SidebarPanel elevation={0}>
            {/* Profil */}
            <ProfileSection>
              <Avatar
                sx={{
                  width: 90,
                  height: 90,
                  margin: "0 auto 16px",
                  bgcolor: "#10b981",
                  fontSize: 36,
                  border: "4px solid #d1fae5",
                }}
              >
                {user.firstName[0]}
                {user.lastName[0]}
              </Avatar>
              <Typography variant="h6" fontWeight="bold" color="#1e293b">
                {user.firstName} {user.lastName}
              </Typography>
              <Chip
                label="Студент"
                color="success"
                size="small"
                sx={{ mt: 1, fontWeight: 600 }}
              />

              <Box
                mt={3}
                textAlign="left"
                sx={{ bgcolor: "#f8fafc", p: 2, borderRadius: 2 }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  display="flex"
                  alignItems="center"
                  gap={1}
                  mb={1}
                >
                  <School fontSize="small" /> {user.institution}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Assignment fontSize="small" /> Группа:{" "}
                  <strong>{user.group}</strong>
                </Typography>
              </Box>

              <Button
                variant="outlined"
                color="error"
                size="small"
                fullWidth
                startIcon={<Logout />}
                onClick={logout}
                sx={{
                  mt: 3,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Выйти
              </Button>
            </ProfileSection>

            {/* Filtreler */}
            <Box>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontWeight: 700,
                  color: "#64748b",
                }}
              >
                <FilterList fontSize="small" /> Фильтры (Filtreler)
              </Typography>

              <TextField
                fullWidth
                size="small"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2, bgcolor: "#f8fafc" }}
              />

              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Сложность (Zorluk)</InputLabel>
                <Select
                  value={filterDifficulty}
                  label="Сложность"
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                >
                  <MenuItem value="all">Все</MenuItem>
                  <MenuItem value="Начальный">Начальный</MenuItem>
                  <MenuItem value="Средний">Средний</MenuItem>
                  <MenuItem value="Продвинутый">Продвинутый</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Статус</InputLabel>
                <Select
                  value={filterStatus}
                  label="Статус"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">Все</MenuItem>
                  <MenuItem value="active">В процессе</MenuItem>
                  <MenuItem value="completed">Завершенные</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Genel İlerleme */}
            <Box>
              <Typography variant="caption" fontWeight="bold" color="#64748b">
                Общий прогресс курса
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <LinearProgress
                  variant="determinate"
                  value={65}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    flex: 1,
                    bgcolor: "#e2e8f0",
                    "& .MuiLinearProgress-bar": { bgcolor: "#10b981" },
                  }}
                />
                <Typography variant="caption" fontWeight="bold" color="#10b981">
                  65%
                </Typography>
              </Box>
            </Box>
          </SidebarPanel>
        </Grid>

        {/* --- SAĞ PANEL: İÇERİK (SCROLLABLE) --- */}
        <Grid item xs={12} md={9}>
          <ContentPanel>
            {/* İstatistikler */}
            <Grid container spacing={3}>
              {[
                {
                  label: "Назначено",
                  val: stats.assigned,
                  color: "#3b82f6",
                  icon: <Assignment />,
                },
                {
                  label: "Завершено",
                  val: stats.completed,
                  color: "#10b981",
                  icon: <CheckCircle />,
                },
                {
                  label: "Ср. балл",
                  val: stats.avgScore,
                  color: "#f59e0b",
                  icon: <School />,
                },
                {
                  label: "Часов",
                  val: stats.hours,
                  color: "#6366f1",
                  icon: <AccessTime />,
                },
              ].map((item, i) => (
                <Grid item xs={6} md={3} key={i}>
                  <StatCard>
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: "20px !important",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h4"
                          fontWeight="800"
                          sx={{ color: item.color }}
                        >
                          {item.val}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontWeight="500"
                        >
                          {item.label}
                        </Typography>
                      </Box>
                      <Avatar
                        sx={{
                          bgcolor: item.color + "20",
                          color: item.color,
                          width: 48,
                          height: 48,
                        }}
                      >
                        {item.icon}
                      </Avatar>
                    </CardContent>
                  </StatCard>
                </Grid>
              ))}
            </Grid>

            {/* Öğrenim Materyalleri */}
            <Box>
              <SectionTitle variant="h6">
                <MenuBook color="primary" /> Учебные материалы (Eğitim
                Materyalleri)
              </SectionTitle>
              <Grid container spacing={3}>
                {learningMaterials.map((material) => (
                  <Grid item xs={12} md={4} key={material.id}>
                    <MaterialCard>
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          mb={2}
                        >
                          <Chip
                            icon={material.icon}
                            label={
                              material.type === "video"
                                ? "Видео"
                                : material.type === "document"
                                ? "Документ"
                                : "Тест"
                            }
                            size="small"
                            sx={{
                              bgcolor: "#f1f5f9",
                              fontWeight: 600,
                              border: "1px solid #e2e8f0",
                            }}
                          />
                          {material.completed && (
                            <CheckCircle color="success" fontSize="small" />
                          )}
                        </Box>
                        <Typography
                          variant="subtitle1"
                          fontWeight="700"
                          gutterBottom
                          color="#1e293b"
                        >
                          {material.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                          mb={2}
                        >
                          {material.type === "video"
                            ? `Длительность: ${material.duration}`
                            : material.type === "document"
                            ? `${material.pages} страниц`
                            : `${material.exercises} вопросов`}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={material.progress}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "#e2e8f0",
                          }}
                        />
                      </CardContent>
                      <Box p={3} pt={0}>
                        <Button
                          fullWidth
                          variant={
                            material.completed ? "outlined" : "contained"
                          }
                          size="medium"
                          endIcon={!material.completed && <ArrowForward />}
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            boxShadow: "none",
                          }}
                        >
                          {material.completed ? "Повторить" : "Начать"}
                        </Button>
                      </Box>
                    </MaterialCard>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Atanan Vakalar Tablosu */}
            <Box>
              <SectionTitle variant="h6">
                <Assignment color="primary" /> Назначенные задания (
                {filteredCases.length})
              </SectionTitle>
              <ModernTableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#f8fafc" }}>
                      <TableCell sx={{ fontWeight: 600, color: "#64748b" }}>
                        Название случая
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#64748b" }}>
                        Преподаватель
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#64748b" }}>
                        Сложность
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#64748b" }}>
                        Прогресс
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#64748b" }}>
                        Статус
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontWeight: 600, color: "#64748b" }}
                      >
                        Действия
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredCases.map((caseItem) => (
                      <TableRow
                        key={caseItem.id}
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          <Typography
                            variant="subtitle2"
                            fontWeight="700"
                            color="#1e293b"
                          >
                            {caseItem.patientName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {caseItem.description}
                          </Typography>
                        </TableCell>
                        <TableCell>{caseItem.teacher}</TableCell>
                        <TableCell>
                          <Chip
                            label={caseItem.difficulty}
                            color={
                              getDifficultyColor(caseItem.difficulty) as any
                            }
                            size="small"
                            variant="outlined"
                            sx={{ fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <LinearProgress
                              variant="determinate"
                              value={
                                (caseItem.viewCount / caseItem.maxViews) * 100
                              }
                              sx={{
                                width: 60,
                                height: 6,
                                borderRadius: 3,
                                bgcolor: "#e2e8f0",
                              }}
                            />
                            <Typography
                              variant="caption"
                              fontWeight="600"
                              color="text.secondary"
                            >
                              {caseItem.viewCount}/{caseItem.maxViews}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {caseItem.status === "locked" ? (
                            <Chip
                              icon={<Lock fontSize="small" />}
                              label="Закрыто"
                              size="small"
                              sx={{ bgcolor: "#f1f5f9", color: "#64748b" }}
                            />
                          ) : caseItem.completed ? (
                            <Chip
                              icon={<CheckCircle fontSize="small" />}
                              label={`Сдал: ${caseItem.score}%`}
                              color="success"
                              size="small"
                            />
                          ) : (
                            <Chip
                              label="В процессе"
                              color="primary"
                              size="small"
                            />
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="primary"
                            disabled={caseItem.status === "locked"}
                            onClick={() => handleViewCase(caseItem.id)}
                            sx={{
                              bgcolor:
                                caseItem.status === "locked"
                                  ? "transparent"
                                  : "#eff6ff",
                              "&:hover": { bgcolor: "#dbeafe" },
                            }}
                          >
                            {caseItem.status === "locked" ? (
                              <Lock fontSize="small" />
                            ) : (
                              <Visibility fontSize="small" />
                            )}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ModernTableContainer>
            </Box>
          </ContentPanel>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default StudentDashboard;
