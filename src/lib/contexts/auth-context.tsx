import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  code?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  register: (name: string, email: string) => Promise<boolean>;
  requestCode: (email: string) => Promise<boolean>;
  verifyCode: (email: string, code: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const _getLocalStorage = (key: string): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  };
  const _setLocalStorage = (key: string, value: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  };

  const _removeLocalStorage = (key: string): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  };

  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedToken = _getLocalStorage("access_token");
        const storedUser = _getLocalStorage("user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          } catch (error) {
            console.error("Erro ao analisar os dados do usuário:", error);
            _removeLocalStorage("access_token");
            _removeLocalStorage("user");
          }
        } else {
          console.log("Nenhum dado de usuário encontrado no localStorage");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  });

  const register = async (name: string, email: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });
      if (res.ok) return true;
      return false;
    } catch (error) {
      console.error("Error creating user:", error);
      return false;
    }
  };

  const requestCode = async (email: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/user/request-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) return true;
      return false;
    } catch (error) {
      console.error("Error requesting code:", error);
      return false;
    }
  };

  const verifyCode = async (email: string, code: string): Promise<void> => {
    try {
      const res = await fetch("/api/user/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        _setLocalStorage("access_token", data.token);
        _setLocalStorage("user", JSON.stringify(data.user));
        push("/dashboard");
      } else {
        console.error("Código inválido ou expirado.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    _removeLocalStorage("access_token");
    _removeLocalStorage("user");
    push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        register,
        requestCode,
        verifyCode,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}