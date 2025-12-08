// src/components/Dashboard/StudentDashboard.tsx
import React, { useState } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
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
  Alert
} from '@mui/material';
import {
  Visibility,
  MenuBook,
  Assignment,
  School,
  Psychology,
  QuestionMark,
  CheckCircle,
  AccessTime,
  Lock
} from '@mui/icons-material';
import styled from 'styled-components';

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

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Mock assigned cases for student
  const [assignedCases] = useState([
    {
      id: '1',
      patientName: 'Обучающий случай №1',
      caseType: 'educational',
      biopsyMethod: 'incisional',
      status: 'assigned',
      assignedDate: '2025-10-12',
      completed: false,
      teacher: 'Проф. Мария Сидорова',
      description: 'Изучение инцизионной биопсии кожи',
      difficulty: 'Начальный',
      viewCount: 3,
      maxViews: 10
    },
    {
      id: '2', 
      patientName: 'Обучающий случай №2',
      caseType: 'educational',
      biopsyMethod: 'excisional',
      status: 'completed',
      assignedDate: '2025-10-10',
      completed: true,
      teacher: 'Проф. Мария Сидорова',
      description: 'Анализ эксцизионной биопсии',
      difficulty: 'Средний',
      score: 85,
      viewCount: 7,
      maxViews: 10
    },
    {
      id: '3',
      patientName: 'Обучающий случай №3',
      caseType: 'educational',
      biopsyMethod: 'operative',
      status: 'locked',
      assignedDate: null,
      completed: false,
      teacher: 'Проф. Мария Сидорова',
      description: 'Сложный случай операционного материала',
      difficulty: 'Продвинутый',
      prerequisite: 'Завершите случай №2',
      viewCount: 0,
      maxViews: 15
    }
  ]);

  // Learning materials
  const [learningMaterials] = useState([
    {
      id: '1',
      title: 'Основы патогистологии',
      type: 'video',
      duration: '45 мин',
      completed: true,
      progress: 100
    },
    {
      id: '2',
      title: 'Техники биопсии',
      type: 'document', 
      pages: 24,
      completed: false,
      progress: 60
    },
    {
      id: '3',
      title: 'WSI навигация и анализ',
      type: 'interactive',
      exercises: 12,
      completed: false,
      progress: 25
    }
  ]);

  const stats = {
    assignedCases: assignedCases.length,
    completedCases: assignedCases.filter(c => c.completed).length,
    averageScore: 85,
    studyHours: 24
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Начальный': 'success',
      'Средний': 'warning', 
      'Продвинутый': 'error'
    };
    return colors[difficulty as keyof typeof colors] || 'default';
  };

  const handleViewCase = (caseId: string) => {
    const case_ = assignedCases.find(c => c.id === caseId);
    if (case_ && case_.status !== 'locked') {
      navigate(`/canvas?case=${caseId}&mode=student`);
    }
  };

  if (!user) return null;

  return (
    <DashboardContainer>
      <Grid container spacing={3}>
        {/* User Info Panel */}
        <Grid item xs={12} lg={3}>
          <UserInfoPanel>
            <Avatar
              sx={{ 
                width: 100, 
                height: 100, 
                margin: '0 auto 15px',
                border: '4px solid #4caf50'
              }}
              src={user.avatar || '/assets/student-avatar.jpg'}
            >
              {user.firstName[0]}{user.lastName[0]}
            </Avatar>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {user.firstName} {user.lastName}
            </Typography>
            <Chip 
              label="СТУДЕНТ" 
              color="success" 
              size="small"
              sx={{ mb: 2, fontWeight: 'bold' }}
            />
            
            <Box sx={{ textAlign: 'left', mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Учреждение:</strong><br/>
                {user.institution}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Курс:</strong> {user.course}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Группа:</strong> {user.group}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Факультет:</strong><br/>
                {user.faculty}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Email:</strong><br/>
                {user.email}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ textAlign: 'left', mb: 2 }}>
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                Прогресс обучения:
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={60} 
                sx={{ mb: 1, height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" color="text.secondary">
                60% завершено
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button variant="outlined" size="small" startIcon={<MenuBook />}>
                Учебные материалы
              </Button>
              <Button variant="outlined" size="small" startIcon={<QuestionMark />}>
                Помощь
              </Button>
              <Button 
                variant="contained" 
                color="error" 
                onClick={logout}
                size="small"
              >
                Выйти
              </Button>
            </Box>
          </UserInfoPanel>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} lg={9}>
          {/* Welcome Alert */}
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Добро пожаловать в систему обучения!</strong><br/>
              Вы можете изучать назначенные случаи, просматривать WSI изображения и изучать учебные материалы.
            </Typography>
          </Alert>

          {/* Statistics Row */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {stats.assignedCases}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    назначенных случаев
                  </Typography>
                </CardContent>
              </StatsCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h4" color="success.main" fontWeight="bold">
                    {stats.completedCases}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    завершено
                  </Typography>
                </CardContent>
              </StatsCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h4" color="warning.main" fontWeight="bold">
                    {stats.averageScore}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    средний балл
                  </Typography>
                </CardContent>
              </StatsCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h4" color="info.main" fontWeight="bold">
                    {stats.studyHours}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    часов изучения
                  </Typography>
                </CardContent>
              </StatsCard>
            </Grid>
          </Grid>

          {/* Learning Materials */}
          <StatsCard sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Учебные материалы
              </Typography>
              <Grid container spacing={2}>
                {learningMaterials.map((material) => (
                  <Grid item xs={12} md={4} key={material.id}>
                    <Paper sx={{ p: 2, height: '100%' }}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <School sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="subtitle2" fontWeight="bold">
                          {material.title}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" gutterBottom>
                        {material.type === 'video' && `Видео • ${material.duration}`}
                        {material.type === 'document' && `Документ • ${material.pages} стр.`}
                        {material.type === 'interactive' && `Интерактив • ${material.exercises} упражн.`}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={material.progress} 
                        sx={{ my: 1 }}
                      />
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption">
                          {material.progress}%
                        </Typography>
                        <Button 
                          size="small" 
                          variant={material.completed ? 'outlined' : 'contained'}
                          startIcon={material.completed ? <CheckCircle /> : <MenuBook />}
                        >
                          {material.completed ? 'Пройдено' : 'Изучать'}
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </StatsCard>

          {/* Assigned Cases */}
          <StatsCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Назначенные случаи для изучения ({assignedCases.length})
              </Typography>
              
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                      <TableCell><strong>Случай</strong></TableCell>
                      <TableCell><strong>Описание</strong></TableCell>
                      <TableCell><strong>Преподаватель</strong></TableCell>
                      <TableCell><strong>Сложность</strong></TableCell>
                      <TableCell><strong>Просмотры</strong></TableCell>
                      <TableCell><strong>Статус</strong></TableCell>
                      <TableCell><strong>Результат</strong></TableCell>
                      <TableCell><strong>Действия</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assignedCases.map((case_) => (
                      <TableRow key={case_.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            {case_.patientName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {case_.assignedDate ? `Назначено: ${case_.assignedDate}` : 'Не назначено'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" color="text.secondary">
                            {case_.description}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {case_.teacher}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={case_.difficulty}
                            color={getDifficultyColor(case_.difficulty) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {case_.viewCount}/{case_.maxViews}
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={(case_.viewCount / case_.maxViews) * 100}
                            sx={{ width: 60, height: 4 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {case_.status === 'assigned' && (
                              <Chip 
                                label="Назначен" 
                                color="primary" 
                                size="small" 
                                icon={<Assignment />}
                              />
                            )}
                            {case_.status === 'completed' && (
                              <Chip 
                                label="Завершен" 
                                color="success" 
                                size="small" 
                                icon={<CheckCircle />}
                              />
                            )}
                            {case_.status === 'locked' && (
                              <Chip 
                                label="Заблокирован" 
                                color="default" 
                                size="small" 
                                icon={<Lock />}
                              />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          {case_.completed && case_.score && (
                            <Chip 
                              label={`${case_.score}%`}
                              color={case_.score >= 80 ? 'success' : case_.score >= 60 ? 'warning' : 'error'}
                              size="small"
                            />
                          )}
                          {case_.status === 'locked' && case_.prerequisite && (
                            <Typography variant="caption" color="text.secondary">
                              {case_.prerequisite}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={() => handleViewCase(case_.id)}
                              disabled={case_.status === 'locked'}
                              title={case_.status === 'locked' ? case_.prerequisite : 'Просмотр случая'}
                            >
                              {case_.status === 'locked' ? <Lock /> : <Visibility />}
                            </IconButton>
                            {case_.completed && (
                              <IconButton size="small" color="info">
                                <Assignment />
                              </IconButton>
                            )}
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
    </DashboardContainer>
  );
};

export default StudentDashboard;
