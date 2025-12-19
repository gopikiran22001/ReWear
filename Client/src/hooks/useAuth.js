import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "@/config/api";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Check if we have a user in localStorage
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const navigate = useNavigate();

  // Handle navigation after state updates
  useEffect(() => {
    if (pendingNavigation) {
      const { path, replace } = pendingNavigation;
      navigate(path, { replace });
      setPendingNavigation(null);
    }
  }, [pendingNavigation, navigate]);

  // Handle user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      sessionStorage.clear();
    }
  }, [user]);

  // Fetch full user details
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.USER.PROFILE, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.USER.LOGIN, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store basic user data from login
      setUser(data.user);

      // Fetch full user details
      await fetchUserDetails();

      // Queue navigation
      setPendingNavigation({
        path: "/dashboard",
        replace: true,
      });

      return { error: null };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, firstName, lastName) => {
    try {
      setLoading(true);
      const response = await fetch(
        API_ENDPOINTS.USER.REGISTER,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            firstName,
            lastName,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // After successful registration, automatically sign in
      return signIn(email, password);
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.USER.LOGOUT, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Clear local state first
      setUser(null);
      localStorage.removeItem("user");
      sessionStorage.clear();

      // Queue navigation to home page
      setPendingNavigation({
        path: "/",
        replace: true,
      });

      return { error: null };
    } catch (error) {
      // Even if server logout fails, clear local state and redirect
      setUser(null);
      localStorage.removeItem("user");
      sessionStorage.clear();
      setPendingNavigation({
        path: "/",
        replace: true,
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get headers for authenticated requests
  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        loading,
        isAuthenticated: !!user,
        getAuthHeaders,
        fetchUserDetails, // Expose this for manual refresh of user data
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
