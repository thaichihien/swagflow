"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api-client";
import { AUTH_SERVICE_PATH } from "@/lib/route.constant";

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  accessToken: string | null;
  customer: Customer | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshAccessToken()
      .then((token) => {
        console.log("Here");

        setAccessToken(token!);
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const res = await apiClient.post(
        `${AUTH_SERVICE_PATH}/sign-in`,
        credentials,
      );

      const token = res.data.access_token;
      if (token) {
        setAccessToken(token);
      } else {
        console.error("Login failed", res.data);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    setAccessToken(null);
    setCustomer(null);
    //router.push(""); // Redirect to login page
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, customer, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const { data } = await apiClient.get(`${AUTH_SERVICE_PATH}/refresh`);

    // console.log("Refreshed token:", data.access_token);
    //apiClient.defaults.headers.Authorization = `Bearer ${data.access_token}`;
    return data.access_token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
