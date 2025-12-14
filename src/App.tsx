import React from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Projects from "./components/Projects";
import Auth from "./components/Auth";
import Main from "./components/Main";
import PathAi from "./components/Projects/Path AI";
import HistArch from "./components/Projects/HistArch";
import DocAI from "./components/Projects/Doc AI";
import DermaSlide from "./components/Products/DermaSlide";
import DentalPath from "./components/Products/DentalPath";
import Covid19 from "./components/Products/Covid-19";
import BreastCancer from "./components/Products/BreastCancer";
import Archive from "./components/Archive";
import AboutCompany from "./components/AboutCompany";
import Contacts from "./components/Contacts";
import Register from "./components/Auth/Register";
import Canvas from "./components/Canvas";
import CreatePdfForm from "./components/Archive/CardEdit";
import { AuthProvider, useAuth } from "./Contexts/AuthContext";
import DoctorDashboard from "./components/Dashboard/DoctorDashboard";
import NewCasePage from "./components/Dashboard/NewCasePage"; // Import edildiğinden emin olun
import StudentDashboard from "./components/Dashboard/StudentDashboard";
import TeacherDashboard from "./components/Dashboard/TeacherDashboard";

// Role-based Dashboard Component
const Dashboard = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" />;

  switch (user.role) {
    case "doc":
      return <DoctorDashboard />;
    case "student":
      return <StudentDashboard />;
    case "teacher":
      return <TeacherDashboard />;
    default:
      return <Navigate to="/auth" />;
  }
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};

function App() {
  return (
    <AuthProvider>
      <div>
        <HashRouter>
          <Header />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Main />} />
            <Route path="/products" element={<Products />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutCompany />} />
            <Route path="/contacts" element={<Contacts />} />

            {/* Protected routes - Role-based Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* YENİ ROTA: Doktor Yeni Hasta/Vaka Ekleme Sayfası */}
            {/* Picture 2'deki özelliklerin olduğu sayfa */}
            <Route
              path="new-case"
              element={
                <ProtectedRoute>
                  <NewCasePage />
                </ProtectedRoute>
              }
            />

            {/* Protected routes - Existing pages */}
            <Route
              path="/main"
              element={
                <ProtectedRoute>
                  <Main />
                </ProtectedRoute>
              }
            />
            <Route
              path="/canvas"
              element={
                <ProtectedRoute>
                  <Canvas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/archive"
              element={
                <ProtectedRoute>
                  <Archive />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editcard/:id"
              element={
                <ProtectedRoute>
                  <CreatePdfForm />
                </ProtectedRoute>
              }
            />

            {/* Product routes */}
            <Route path="/dermaSlide" element={<DermaSlide />} />
            <Route path="/breastCr" element={<BreastCancer />} />
            <Route path="/dentalPath" element={<DentalPath />} />
            <Route path="/covid-19" element={<Covid19 />} />

            {/* Project routes */}
            <Route path="/pathAI" element={<PathAi />} />
            <Route path="/histArch" element={<HistArch />} />
            <Route path="/docAI" element={<DocAI />} />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </HashRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
