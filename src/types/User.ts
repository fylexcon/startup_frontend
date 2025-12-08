export interface User {
  id: string;
  email: string;
  role: "doc" | "student" | "teacher" | "admin";
  name?: string;
  [key: string]: any;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  // DÜZELTME BURADA: Login artık email ve password alıyor, geriye boolean dönüyor
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading?: boolean;
}

export interface CaseStats {
  [key: string]: number;
}
