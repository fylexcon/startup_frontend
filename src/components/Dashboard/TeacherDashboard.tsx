import React, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  School,
  Group,
  Assignment,
  MoreVert,
  Search,
  FilterList,
  Add,
  CheckCircle,
  AccessTime,
  Person,
} from "@mui/icons-material";
import styled from "styled-components";

// --- STYLED COMPONENTS ---
const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  padding-top: 20px;
  padding-bottom: 40px;
`;

const HeaderSection = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const StatsCard = styled(Paper)`
  padding: 20px;
  border-radius: 12px;
  height: 100%;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const UserInfoPanel = styled(Paper)`
  padding: 24px;
  border-radius: 12px;
  height: 100%;
  text-align: center;
  border: 1px solid #e2e8f0;
`;

// İsim Linkleri için Özel Stil
const NameLink = styled(Link)`
  text-decoration: none;
  color: #2563eb;
  font-weight: 600;
  transition: color 0.2s;
  &:hover {
    color: #1e40af;
    text-decoration: underline;
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
  // issueDate (Veriliş Tarihi) eklendi
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

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState("1");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <DashboardContainer>
      <Container maxWidth="xl">
        {/* HEADER */}
        <HeaderSection elevation={0}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  border: "4px solid rgba(255,255,255,0.3)",
                }}
              >
                {user?.firstName?.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" fontWeight="bold">
                Добро пожаловать, {user?.firstName}!
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                Панель преподавателя | {user?.institution}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{
                  bgcolor: "white",
                  color: "#2563eb",
                  "&:hover": { bgcolor: "#f1f5f9" },
                }}
              >
                Создать задание
              </Button>
            </Grid>
          </Grid>
        </HeaderSection>

        <Grid container spacing={3}>
          {/* SOL PANEL */}
          <Grid item xs={12} lg={3}>
            <UserInfoPanel elevation={0}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  margin: "0 auto",
                  mb: 2,
                  bgcolor: "#e0e7ff",
                  color: "#3730a3",
                }}
              >
                <School sx={{ fontSize: 50 }} />
              </Avatar>
              <Typography variant="h6">
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {user?.position}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <List>
                <ListItem>
                  <ListItemText primary="Всего студентов" secondary="120" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Активные группы" secondary="4" />
                </ListItem>
              </List>
            </UserInfoPanel>
          </Grid>

          {/* SAĞ PANEL */}
          <Grid item xs={12} lg={9}>
            {/* İSTATİSTİKLER */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {[
                {
                  icon: <Group sx={{ color: "#2563eb" }} />,
                  label: "Группы",
                  val: "4",
                },
                {
                  icon: <Person sx={{ color: "#10b981" }} />,
                  label: "Студенты",
                  val: "120",
                },
                {
                  icon: <Assignment sx={{ color: "#f59e0b" }} />,
                  label: "Задания",
                  val: "12",
                },
                {
                  icon: <AccessTime sx={{ color: "#ef4444" }} />,
                  label: "На проверке",
                  val: "8",
                },
                {
                  icon: <CheckCircle sx={{ color: "#8b5cf6" }} />,
                  label: "Завершено",
                  val: "85%",
                },
              ].map((stat, i) => (
                <Grid item xs={12} sm={6} md={2.4} key={i}>
                  <StatsCard elevation={0}>
                    <Box display="flex" alignItems="center" mb={1}>
                      {stat.icon}
                      <Typography
                        ml={1}
                        variant="subtitle2"
                        color="textSecondary"
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.val}
                    </Typography>
                  </StatsCard>
                </Grid>
              ))}
            </Grid>

            {/* TABLOLAR */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid #e2e8f0",
                overflow: "hidden",
              }}
            >
              <TabContext value={tabValue}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    bgcolor: "white",
                    px: 2,
                    pt: 2,
                  }}
                >
                  <TabList onChange={(_, v) => setTabValue(v)}>
                    <Tab label="Мои студенты" value="1" />
                    <Tab label="Журнал оценок" value="2" />
                  </TabList>
                </Box>

                {/* TAB 1: ÖĞRENCİ LİSTESİ */}
                <TabPanel value="1" sx={{ p: 0 }}>
                  <TableContainer>
                    <Table>
                      <TableHead sx={{ bgcolor: "#f8fafc" }}>
                        <TableRow>
                          <TableCell width={60}></TableCell>
                          <TableCell>ФИО</TableCell>
                          <TableCell>Группа</TableCell>
                          <TableCell>Курс</TableCell>
                          <TableCell>Факультет</TableCell>
                          {/* SİLİNDİ: Kayıt Tarihi Kaldırıldı */}
                          <TableCell>Статус</TableCell>
                          <TableCell align="right">Действия</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {mockStudents.map((s) => (
                          <TableRow key={s.id} hover>
                            <TableCell>
                              <Avatar>{s.name.charAt(0)}</Avatar>
                            </TableCell>
                            <TableCell>
                              {/* GÜNCELLENDİ: Link */}
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
                              />
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                size="small"
                                onClick={handleMenuClick}
                              >
                                <MoreVert />
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
                          {/* EKLENDİ: Veriliş Tarihi */}
                          <TableCell>Дата выдачи</TableCell>
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
                              {/* GÜNCELLENDİ: Link */}
                              <NameLink to={`/student/${g.studentId}`}>
                                {g.studentName}
                              </NameLink>
                            </TableCell>
                            <TableCell>{g.case}</TableCell>
                            {/* EKLENDİ: Veri Gösterimi */}
                            <TableCell>{g.issueDate}</TableCell>
                            <TableCell>{g.date}</TableCell>
                            <TableCell>
                              <Chip
                                label={
                                  g.status === "graded" ? "Оценено" : "В работе"
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
                              <Button size="small" variant="outlined">
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
          </Grid>
        </Grid>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Редактировать</MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: "error.main" }}>
            Удалить
          </MenuItem>
        </Menu>
      </Container>
    </DashboardContainer>
  );
};

export default TeacherDashboard;
