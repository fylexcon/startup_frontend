// src/Contexts/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "../types/User";

// --- TEST KULLANICILARI (MOCK DATA) ---
// Bu kullanıcı bilgileriyle giriş yaparak farklı ekranları test edebilirsin.
const mockUsers: Record<string, { password: string; user: User }> = {
  "student@test.com": {
    password: "123456",
    user: {
      id: "1",
      email: "student@test.com",
      firstName: "Иван", // İsimler Rusça kalabilir veya değiştirebilirsin
      lastName: "Петров",
      role: "student",
      institution: "Московский медицинский университет",
      course: "4 курс",
      group: "Группа 2",
      faculty: "Лечебный факультет",
    },
  },
  "teacher@test.com": {
    password: "123456",
    user: {
      id: "2",
      email: "teacher@test.com",
      firstName: "Проф. Мария",
      lastName: "Сидорова",
      role: "teacher",
      institution: "Московский медицинский университет",
      department: "Кафедра патологии",
      position: "Профессор",
    },
  },
  "doc@test.com": {
    password: "123456",
    user: {
      id: "3",
      email: "doc@test.com",
      firstName: "Д-р Алексей",
      lastName: "Волков",
      role: "doc",
      institution: "Городская больница №1",
      department: "Патологическая анатомия",
      position: "Врач-патологоанатом",
    },
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Yükleniyor durumu eklendi

  useEffect(() => {
    // Sayfa yenilendiğinde kullanıcıyı hatırla
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Kullanıcı verisi okunamadı", e);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Gerçek API yerine mockUsers listesinden kontrol ediyoruz
    const userCredentials = mockUsers[email];

    if (userCredentials && userCredentials.password === password) {
      setUser(userCredentials.user);
      localStorage.setItem("currentUser", JSON.stringify(userCredentials.user));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
