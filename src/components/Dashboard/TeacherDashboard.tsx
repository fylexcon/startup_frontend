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

const DashboardContainer = styled(Box)`
  padding: 100px 24px 24px;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
`;

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
  border: 1px solid #e2e8f0;
`;

const ProfileSection = styled(Box)`
  text-align: center;
  padding-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;
`;

const ContentPanel = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StatCard = styled(Card)`
  border-radius: 20px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s;
  height: 100%;
  &:hover {
    transform: translateY(-4px);
    border-color: #cbd5e1;
  }
`;

const NameLink = styled(Link)`
  text-decoration: none;
  color: #1e293b;
  font-weight: 700;
  transition: color 0.2s;
  &:hover {
    color: #6366f1;
  }
`;

const ModernTableContainer = styled(TableContainer)`
  border-radius: 20px !important;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
  background: white;
`;

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
];

const mockGrades = [
  {
    id: 1,
    studentName: "Иван Петров",
    studentId: 1,
    case: "Меланома",
    status: "graded",
    grade: "5",
    date: "20.11.2023",
  },
  {
    id: 2,
    studentName: "Анна Сидорова",
    studentId: 2,
    case: "Карцинома",
    status: "pending",
    grade: "-",
    date: "21.11.2023",
  },
];

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const [tabValue, setTabValue] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGroup, setFilterGroup] = useState("all");

  const filteredStudents = mockStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterGroup === "all" || s.group === filterGroup)
  );

  if (!user) return null;

  return (
    <DashboardContainer>
      <Grid container spacing={4}>
        {/* SOL PANEL */}
        <Grid item xs={12} md={3}>
          <SidebarPanel elevation={0}>
            <ProfileSection>
              <Avatar
                sx={{
                  width: 90,
                  height: 90,
                  margin: "0 auto 16px",
                  bgcolor: "#6366f1",
                  fontSize: 36,
                }}
              >
                {user.firstName[0]}
                {user.lastName[0]}
              </Avatar>
              <Typography variant="h6" fontWeight="bold" color="#1e293b">
                {user.firstName} {user.lastName}
              </Typography>
              <Chip
                label="Преподаватель"
                color="primary"
                size="small"
                sx={{ mt: 1, fontWeight: 600 }}
              />

              <Box
                mt={3}
                textAlign="left"
                sx={{ bgcolor: "#f8fafc", p: 2, borderRadius: 2 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Учреждение: <strong>{user.institution}</strong>
                </Typography>
              </Box>

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
                sx={{ mb: 2, bgcolor: "#f8fafc" }}
              />
              <FormControl fullWidth size="small">
                <InputLabel>Группа</InputLabel>
                <Select
                  value={filterGroup}
                  label="Группа"
                  onChange={(e) => setFilterGroup(e.target.value)}
                >
                  <MenuItem value="all">Все</MenuItem>
                  <MenuItem value="Группа 1">Группа 1</MenuItem>
                  <MenuItem value="Группа 2">Группа 2</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button
              variant="contained"
              startIcon={<Add />}
              fullWidth
              sx={{ bgcolor: "#6366f1", borderRadius: 2, py: 1.5 }}
            >
              Создать задание
            </Button>
          </SidebarPanel>
        </Grid>

        {/* SAĞ PANEL */}
        <Grid item xs={12} md={9}>
          <ContentPanel>
            <Grid container spacing={3}>
              {[
                {
                  label: "Группы",
                  val: "4",
                  icon: <Group />,
                  color: "#3b82f6",
                },
                {
                  label: "Студенты",
                  val: "120",
                  icon: <Person />,
                  color: "#10b981",
                },
                {
                  label: "Задания",
                  val: "12",
                  icon: <Assignment />,
                  color: "#f59e0b",
                },
                {
                  label: "Проверка",
                  val: "8",
                  icon: <AccessTime />,
                  color: "#ef4444",
                },
              ].map((item, i) => (
                <Grid item xs={6} md={3} key={i}>
                  <StatCard>
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 3,
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
                          fontWeight="600"
                          color="text.secondary"
                        >
                          {item.label}
                        </Typography>
                      </Box>
                      <Avatar
                        sx={{ bgcolor: item.color + "20", color: item.color }}
                      >
                        {item.icon}
                      </Avatar>
                    </CardContent>
                  </StatCard>
                </Grid>
              ))}
            </Grid>

            <Paper
              sx={{
                borderRadius: 5,
                overflow: "hidden",
                boxShadow: "none",
                border: "1px solid #e2e8f0",
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

                <TabPanel value="1" sx={{ p: 0 }}>
                  <ModernTableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#f8fafc" }}>
                          <TableCell width={50}></TableCell>
                          <TableCell>ФИО</TableCell>
                          <TableCell>Группа</TableCell>
                          <TableCell>Курс</TableCell>
                          <TableCell>Статус</TableCell>
                          <TableCell align="right">Действия</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredStudents.map((s) => (
                          <TableRow key={s.id} hover>
                            <TableCell>
                              <Avatar
                                sx={{ width: 32, height: 32, fontSize: 14 }}
                              >
                                {s.name[0]}
                              </Avatar>
                            </TableCell>
                            <TableCell>
                              <NameLink to={`/student/${s.id}`}>
                                {s.name}
                              </NameLink>
                            </TableCell>
                            <TableCell>{s.group}</TableCell>
                            <TableCell>{s.course}</TableCell>
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
                  </ModernTableContainer>
                </TabPanel>

                <TabPanel value="2" sx={{ p: 0 }}>
                  <ModernTableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#f8fafc" }}>
                          <TableCell>Студент</TableCell>
                          <TableCell>Кейс</TableCell>
                          <TableCell>Дата сдачи</TableCell>
                          <TableCell>Статус</TableCell>
                          <TableCell>Оценка</TableCell>
                          <TableCell align="right">Действия</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {mockGrades.map((g) => (
                          <TableRow key={g.id} hover>
                            <TableCell>
                              <NameLink to={`/student/${g.studentId}`}>
                                {g.studentName}
                              </NameLink>
                            </TableCell>
                            <TableCell>{g.case}</TableCell>
                            <TableCell>{g.date}</TableCell>
                            <TableCell>
                              <Chip
                                label={
                                  g.status === "graded"
                                    ? "Оценено"
                                    : "На проверке"
                                }
                                color={
                                  g.status === "graded" ? "success" : "warning"
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
                                Оценить
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ModernTableContainer>
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
