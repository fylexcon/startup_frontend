import React, { useState } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box, Grid, Card, CardContent, Typography, Button, Avatar, Chip, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
  Divider, LinearProgress, TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import {
  Visibility, MenuBook, Assignment, School, PlayCircle, Description,
  Quiz, CheckCircle, Lock, Search, FilterList, Logout, ArrowForward
} from '@mui/icons-material';
import styled from 'styled-components';

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
  box-shadow: 0 4px 20px rgba(0,0,0,0.05) !important;
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

const SectionTitle = styled(Typography)`
  font-weight: 700 !important;
  color: #1e293b;
  margin-bottom: 16px !important;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// İstatistik Kartları
const StatCard = styled(Card)`
  border-radius: 16px !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`;

// Materyal Kartı
const MaterialCard = styled(Card)`
  border-radius: 16px !important;
  border: 1px solid #e2e8f0;
  box-shadow: none !important;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  &:hover {
    border-color: #6366f1;
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.1) !important;
  }
`;

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // STATE
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // MOCK DATA: Assigned Cases
  const [assignedCases] = useState([
    {
      id: '1',
      patientName: 'Обучающий случай №1: Базалиома',
      caseType: 'educational',
      status: 'assigned',
      assignedDate: '2025-10-12',
      completed: false,
      teacher: 'Проф. Сидорова',
      description: 'Изучение инцизионной биопсии кожи',
      difficulty: 'Начальный',
      viewCount: 3,
      maxViews: 10
    },
    {
      id: '2',
      patientName: 'Обучающий случай №2: Меланома',
      caseType: 'educational',
      status: 'completed',
      assignedDate: '2025-10-10',
      completed: true,
      teacher: 'Проф. Сидорова',
      description: 'Анализ эксцизионной биопсии',
      difficulty: 'Средний',
      score: 85,
      viewCount: 7,
      maxViews: 10
    },
    {
      id: '3',
      patientName: 'Обучающий случай №3: Саркома',
      caseType: 'educational',
      status: 'locked',
      assignedDate: null,
      completed: false,
      teacher: 'Проф. Сидорова',
      description: 'Сложный случай операционного материала',
      difficulty: 'Продвинутый',
      prerequisite: 'Завершите случай №2',
      viewCount: 0,
      maxViews: 15
    }
  ]);

  // MOCK DATA: Learning Materials
  const [learningMaterials] = useState([
    {
      id: '1',
      title: 'Основы патогистологии',
      type: 'video',
      duration: '45 мин',
      completed: true,
      progress: 100,
      icon: <PlayCircle sx={{ color: '#ef4444' }} />
    },
    {
      id: '2',
      title: 'Техники биопсии',
      type: 'document',
      pages: 24,
      completed: false,
      progress: 60,
      icon: <Description sx={{ color: '#3b82f6' }} />
    },
    {
      id: '3',
      title: 'WSI навигация и анализ',
      type: 'interactive',
      exercises: 12,
      completed: false,
      progress: 25,
      icon: <Quiz sx={{ color: '#8b5cf6' }} />
    }
  ]);

  const stats = {
    assigned: assignedCases.length,
    completed: assignedCases.filter(c => c.completed).length,
    avgScore: 85,
    hours: 24
  };

  // Helper Functions
  const getDifficultyColor = (diff: string) => {
    switch(diff) {
      case 'Начальный': return 'success';
      case 'Средний': return 'warning';
      case 'Продвинутый': return 'error';
      default: return 'default';
    }
  };

  const handleViewCase = (caseId: string) => {
    const case_ = assignedCases.find(c => c.id === caseId);
    if (case_ && case_.status !== 'locked') {
      navigate(`/canvas?case=${caseId}&mode=student`);
    }
  };

  // Filtering Logic
  const filteredCases = assignedCases.filter(c => {
    const matchesSearch = c.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = filterDifficulty === 'all' || c.difficulty === filterDifficulty;
    const matchesStatus = filterStatus === 'all'
      ? true
      : filterStatus === 'completed' ? c.completed
      : !c.completed; // active

    return matchesSearch && matchesDiff && matchesStatus;
  });

  if (!user) return null;

  return (
    <DashboardContainer>
      <Grid container spacing={3}>

        {/* --- SOL PANEL: PROFİL VE FİLTRELER --- */}
        <Grid item xs={12} md={3}>
          <SidebarPanel elevation={0}>

            {/* Profil */}
            <ProfileSection>
              <Avatar
                sx={{ width: 80, height: 80, margin: '0 auto 16px', bgcolor: '#10b981', fontSize: 32 }}
              >
                {user.firstName[0]}{user.lastName[0]}
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                {user.firstName} {user.lastName}
              </Typography>
              <Chip label="Студент" color="success" size="small" sx={{ mt: 1 }} />

              <Box mt={2} textAlign="left">
                <Typography variant="caption" color="text.secondary" display="block">
                  Учреждение: <strong>{user.institution}</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Группа: <strong>{user.group}</strong>
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
              <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterList fontSize="small" /> Фильтры
              </Typography>

              <TextField
                fullWidth
                size="small"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>
                }}
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Сложность </InputLabel>
                <Select value={filterDifficulty} label="Сложность" onChange={(e) => setFilterDifficulty(e.target.value)}>
                  <MenuItem value="all">Все</MenuItem>
                  <MenuItem value="Начальный">Начальный</MenuItem>
                  <MenuItem value="Средний">Средний</MenuItem>
                  <MenuItem value="Продвинутый">Продвинутый</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Статус</InputLabel>
                <Select value={filterStatus} label="Статус" onChange={(e) => setFilterStatus(e.target.value)}>
                  <MenuItem value="all">Все</MenuItem>
                  <MenuItem value="active">В процессе</MenuItem>
                  <MenuItem value="completed">Завершенные</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Genel İlerleme */}
            <Box>
              <Typography variant="caption" fontWeight="bold">Общий прогресс курса</Typography>
              <LinearProgress variant="determinate" value={65} sx={{ height: 8, borderRadius: 4, mt: 1, mb: 0.5 }} />
              <Typography variant="caption" color="text.secondary">65% завершено</Typography>
            </Box>

          </SidebarPanel>
        </Grid>

        {/* --- SAĞ PANEL: İÇERİK --- */}
        <Grid item xs={12} md={9}>
          <ContentPanel>

            {/* İstatistikler */}
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <StatCard>
                  <CardContent>
                    <Typography variant="h4" fontWeight="bold" color="primary">{stats.assigned}</Typography>
                    <Typography variant="caption" color="text.secondary">Назначено</Typography>
                  </CardContent>
                </StatCard>
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard>
                  <CardContent>
                    <Typography variant="h4" fontWeight="bold" color="success.main">{stats.completed}</Typography>
                    <Typography variant="caption" color="text.secondary">Завершено</Typography>
                  </CardContent>
                </StatCard>
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard>
                  <CardContent>
                    <Typography variant="h4" fontWeight="bold" color="warning.main">{stats.avgScore}</Typography>
                    <Typography variant="caption" color="text.secondary">Ср. балл</Typography>
                  </CardContent>
                </StatCard>
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard>
                  <CardContent>
                    <Typography variant="h4" fontWeight="bold" color="info.main">{stats.hours}</Typography>
                    <Typography variant="caption" color="text.secondary">Часов</Typography>
                  </CardContent>
                </StatCard>
              </Grid>
            </Grid>

            {/* Öğrenim Materyalleri */}
            <Box>
              <SectionTitle variant="h6">
                <School color="primary" /> Учебные материалы
              </SectionTitle>
              <Grid container spacing={2}>
                {learningMaterials.map((material) => (
                  <Grid item xs={12} md={4} key={material.id}>
                    <MaterialCard>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                          <Chip
                            icon={material.icon}
                            label={material.type === 'video' ? 'Видео' : material.type === 'document' ? 'Документ' : 'Тест'}
                            size="small"
                            variant="outlined"
                          />
                          {material.completed && <CheckCircle color="success" fontSize="small" />}
                        </Box>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          {material.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                          {material.type === 'video' ? `Длительность: ${material.duration}` : material.type === 'document' ? `${material.pages} страниц` : `${material.exercises} вопросов`}
                        </Typography>
                        <LinearProgress variant="determinate" value={material.progress} sx={{ height: 6, borderRadius: 3 }} />
                      </CardContent>
                      <Box p={2} pt={0}>
                        <Button
                          fullWidth
                          variant={material.completed ? "outlined" : "contained"}
                          size="small"
                          endIcon={!material.completed && <ArrowForward />}
                        >
                          {material.completed ? 'Повторить' : 'Начать'}
                        </Button>
                      </Box>
                    </MaterialCard>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Atanan Vakalar Tablosu */}
            <Paper sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
              <Box p={2} bgcolor="#fff">
                <SectionTitle variant="h6" sx={{ mb: 0 }}>
                  <Assignment color="primary" /> Назначенные задания ({filteredCases.length})
                </SectionTitle>
              </Box>
              <Divider />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f8fafc' }}>
                      <TableCell>Название случая</TableCell>
                      <TableCell>Преподаватель</TableCell>
                      <TableCell>Сложность</TableCell>
                      <TableCell>Прогресс</TableCell>
                      <TableCell>Статус</TableCell>
                      <TableCell align="right">Действия</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredCases.map((caseItem) => (
                      <TableRow key={caseItem.id} hover>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight="600">{caseItem.patientName}</Typography>
                          <Typography variant="caption" color="text.secondary">{caseItem.description}</Typography>
                        </TableCell>
                        <TableCell>{caseItem.teacher}</TableCell>
                        <TableCell>
                          <Chip
                            label={caseItem.difficulty}
                            color={getDifficultyColor(caseItem.difficulty) as any}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <LinearProgress
                              variant="determinate"
                              value={(caseItem.viewCount / caseItem.maxViews) * 100}
                              sx={{ width: 60, height: 6, borderRadius: 3 }}
                            />
                            <Typography variant="caption">{caseItem.viewCount}/{caseItem.maxViews}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {caseItem.status === 'locked' ? (
                            <Chip icon={<Lock />} label="Закрыто" size="small" />
                          ) : caseItem.completed ? (
                            <Chip icon={<CheckCircle />} label={`Сдал: ${caseItem.score}%`} color="success" size="small" />
                          ) : (
                            <Chip label="В процессе" color="primary" size="small" />
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="primary"
                            disabled={caseItem.status === 'locked'}
                            onClick={() => handleViewCase(caseItem.id)}
                          >
                            <Visibility />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

          </ContentPanel>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default StudentDashboard;
