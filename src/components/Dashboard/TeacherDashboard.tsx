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
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tab,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Group,
  Assignment,
  MoreVert,
  Search,
  FilterList,
  Add,
  CheckCircle,
  AccessTime,
  Person,
  Logout,
  School,
} from "@mui/icons-material";
import styled from "styled-components";

// --- STYLED COMPONENTS ---
const DashboardContainer = styled(Box)`
  padding: 100px 20px 20px;
  background-color: #f8fafc;
  min-height: 100vh;
`;

// Sol Panel (Profil ve Filtreler)
const SidebarPanel = styled(Paper)`
  padding: 24px;
  height: 100%;
  background: white;
  border-radius: 16px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ProfileSection = styled(Box)`
  text-align: center;
  padding-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;
`;

// Sağ Panel (İçerik)
const ContentPanel = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// İstatistik Kartları
const StatCard = styled(Card)`
  border-radius: 16px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`;

// İsim Linkleri için Özel Stil
const NameLink = styled(Link)`
  text-decoration: none;
  color: #1e293b;
  font-weight: 600;
  transition: color 0.2s;
  &:hover {
    color: #6366f1;
  }
`;

// --- MOCK DATA ---
const mockStudents = [
  {
    id: 1,
    name: "Иван Петров",
    group: "Группа 1",
    course: "4 курс",
    faculty: "Лечебный",
    status: "active",
  },
  {
    id: 2,
    name: "Анна Сидорова",
    group: "Группа 1",
    course: "4 курс",
    faculty: "Лечебный",
    status: "active",
  },
  {
    id: 3,
    name: "Дмитрий Иванов",
    group: "Группа 2",
    course: "4 курс",
    faculty: "Лечебный",
    status: "inactive",
  },
  {
    id: 4,
    name: "Елена Козлова",
    group: "Группа 2",
    course: "4 курс",
    faculty: "Лечебный",
    status: "active",
  },
  {
    id: 5,
    name: "Сергей Морозов",
    group: "Группа 3",
    course: "4 курс",
    faculty: "Лечебный",
    status: "active",
  },
];

const mockGrades = [
  {
    id: 1,
    studentName: "Иван Петров",
    studentId: 1,
    case: "Случай #123 - Меланома",
    status: "graded",
    grade: "5",
    date: "20.11.2023",
    issueDate: "01.11.2023",
  },
  {
    id: 2,
    studentName: "Анна Сидорова",
    studentId: 2,
    case: "Случай #124 - Карцинома",
    status: "pending",
    grade: "-",
    date: "21.11.2023",
    issueDate: "02.11.2023",
  },
  {
    id: 3,
    studentName: "Дмитрий Иванов",
    studentId: 3,
    case: "Случай #123 - Меланома",
    status: "submitted",
    grade: "-",
    date: "22.11.2023",
    issueDate: "03.11.2023",
  },
];

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const [tabValue, setTabValue] = useState("1");

  // FILTRE STATE'LERİ
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGroup, setFilterGroup] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // FİLTRELEME MANTIĞI
  const filteredStudents = mockStudents.filter((s) => {
    const matchSearch = s.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchGroup = filterGroup === "all" || s.group === filterGroup;
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    return matchSearch && matchGroup && matchStatus;
  });

  const filteredGrades = mockGrades.filter((g) => {
    return g.studentName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <DashboardContainer>
      <Grid container spacing={3}>
        {/* --- SOL PANEL: PROFİL VE FİLTRELER --- */}
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
                {user?.firstName?.[0] || "T"}
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                {user?.firstName} {user?.lastName}
              </Typography>
              <Chip
                label="Преподаватель"
                color="primary"
                size="small"
                sx={{ mt: 1 }}
              />

              <Box mt={2} textAlign="left">
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Учреждение: <strong>{user?.institution}</strong>
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Позиция: <strong>{user?.position}</strong>
                </Typography>
              </Box>

              <Button
                variant="outlined"
                color="error"
                size="small"
                fullWidth
                startIcon={<Logout />}
                onClick={logout}
                sx={{ mt: 3 }}
              >
                Выйти
              </Button>
            </ProfileSection>

            {/* Filtreler */}
            <Box>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <FilterList fontSize="small" /> Фильтры
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
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Группа (Grup)</InputLabel>
                <Select
                  value={filterGroup}
                  label="Группа"
                  onChange={(e) => setFilterGroup(e.target.value)}
                >
                  <MenuItem value="all">Все</MenuItem>
                  <MenuItem value="Группа 1">Группа 1</MenuItem>
                  <MenuItem value="Группа 2">Группа 2</MenuItem>
                  <MenuItem value="Группа 3">Группа 3</MenuItem>
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
                  <MenuItem value="active">Активен</MenuItem>
                  <MenuItem value="inactive">Неактивен</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Hızlı İşlem */}
            <Button
              variant="contained"
              startIcon={<Add />}
              fullWidth
              sx={{ bgcolor: "#6366f1", mt: 2 }}
            >
              Создать задание
            </Button>
          </SidebarPanel>
        </Grid>

        {/* --- SAĞ PANEL: İÇERİK --- */}
        <Grid item xs={12} md={9}>
          <ContentPanel>
            {/* İstatistikler */}
            <Grid container spacing={2}>
              <Grid item xs={6} md={2.4}>
                <StatCard>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Group color="primary" fontSize="small" />
                      <Typography variant="caption" color="text.secondary">
                        Группы
                      </Typography>
                    </Box>
                    <Typography variant="h5" fontWeight="bold">
                      4
                    </Typography>
                  </CardContent>
                </StatCard>
              </Grid>
              <Grid item xs={6} md={2.4}>
                <StatCard>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Person color="success" fontSize="small" />
                      <Typography variant="caption" color="text.secondary">
                        Студенты
                      </Typography>
                    </Box>
                    <Typography variant="h5" fontWeight="bold">
                      120
                    </Typography>
                  </CardContent>
                </StatCard>
              </Grid>
              <Grid item xs={6} md={2.4}>
                <StatCard>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Assignment color="warning" fontSize="small" />
                      <Typography variant="caption" color="text.secondary">
                        Задания
                      </Typography>
                    </Box>
                    <Typography variant="h5" fontWeight="bold">
                      12
                    </Typography>
                  </CardContent>
                </StatCard>
              </Grid>
              <Grid item xs={6} md={2.4}>
                <StatCard>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <AccessTime color="error" fontSize="small" />
                      <Typography variant="caption" color="text.secondary">
                        Проверка
                      </Typography>
                    </Box>
                    <Typography variant="h5" fontWeight="bold">
                      8
                    </Typography>
                  </CardContent>
                </StatCard>
              </Grid>
              <Grid item xs={6} md={2.4}>
                <StatCard>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <CheckCircle sx={{ color: "#8b5cf6" }} fontSize="small" />
                      <Typography variant="caption" color="text.secondary">
                        Завершено
                      </Typography>
                    </Box>
                    <Typography variant="h5" fontWeight="bold">
                      85%
                    </Typography>
                  </CardContent>
                </StatCard>
              </Grid>
            </Grid>

            {/* TABLOLAR */}
            <Paper
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid #e2e8f0",
                boxShadow: "none",
              }}
            >
              <TabContext value={tabValue}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    bgcolor: "#fff",
                    px: 2,
                  }}
                >
                  <TabList
                    onChange={(_, v) => setTabValue(v)}
                    textColor="primary"
                    indicatorColor="primary"
                  >
                    <Tab
                      label="Мои студенты"
                      value="1"
                      icon={<School fontSize="small" />}
                      iconPosition="start"
                    />
                    <Tab
                      label="Журнал оценок"
                      value="2"
                      icon={<Assignment fontSize="small" />}
                      iconPosition="start"
                    />
                  </TabList>
                </Box>

                {/* TAB 1: ÖĞRENCİ LİSTESİ */}
                <TabPanel value="1" sx={{ p: 0 }}>
                  <TableContainer>
                    <Table>
                      <TableHead sx={{ bgcolor: "#f8fafc" }}>
                        <TableRow>
                          <TableCell width={50}></TableCell>
                          <TableCell>ФИО</TableCell>
                          <TableCell>Группа</TableCell>
                          <TableCell>Курс</TableCell>
                          <TableCell>Факультет</TableCell>
                          <TableCell>Статус</TableCell>
                          <TableCell align="right">Действия</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredStudents.map((s) => (
                          <TableRow key={s.id} hover>
                            <TableCell>
                              <Avatar
                                sx={{
                                  width: 32,
                                  height: 32,
                                  fontSize: 14,
                                  bgcolor: "#e2e8f0",
                                  color: "#475569",
                                }}
                              >
                                {s.name.charAt(0)}
                              </Avatar>
                            </TableCell>
                            <TableCell>
                              <NameLink to={`/student/${s.id}`}>
                                {s.name}
                              </NameLink>
                            </TableCell>
                            <TableCell>{s.group}</TableCell>
                            <TableCell>{s.course}</TableCell>
                            <TableCell>{s.faculty}</TableCell>
                            <TableCell>
                              <Chip
                                label={
                                  s.status === "active"
                                    ? "Активен"
                                    : "Неактивен"
                                }
                                color={
                                  s.status === "active" ? "success" : "default"
                                }
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell align="right">
                              <IconButton size="small">
                                <MoreVert fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>

                {/* TAB 2: NOTLAR LİSTESİ */}
                <TabPanel value="2" sx={{ p: 0 }}>
                  <TableContainer>
                    <Table>
                      <TableHead sx={{ bgcolor: "#f8fafc" }}>
                        <TableRow>
                          <TableCell>Студент</TableCell>
                          <TableCell>Кейс</TableCell>
                          <TableCell>Дата выдачи</TableCell>
                          <TableCell>Дата сдачи</TableCell>
                          <TableCell>Статус</TableCell>
                          <TableCell>Оценка</TableCell>
                          <TableCell align="right">Действия</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredGrades.map((g) => (
                          <TableRow key={g.id} hover>
                            <TableCell>
                              <NameLink to={`/student/${g.studentId}`}>
                                {g.studentName}
                              </NameLink>
                            </TableCell>
                            <TableCell>{g.case}</TableCell>
                            <TableCell>{g.issueDate}</TableCell>
                            <TableCell>{g.date}</TableCell>
                            <TableCell>
                              <Chip
                                label={
                                  g.status === "graded"
                                    ? "Оценено"
                                    : g.status === "submitted"
                                    ? "Сдано"
                                    : "В работе"
                                }
                                color={
                                  g.status === "graded"
                                    ? "success"
                                    : g.status === "submitted"
                                    ? "warning"
                                    : "default"
                                }
                                size="small"
                              />
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              {g.grade}
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                size="small"
                                variant="outlined"
                                sx={{ borderRadius: 2 }}
                              >
                                {g.status === "graded" ? "Изменить" : "Оценить"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
              </TabContext>
            </Paper>
          </ContentPanel>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default TeacherDashboard;
