"use client";

import { createContext, useContext, useEffect, useState } from 'react';

import { authClient } from '@repo/auth';

interface AuthContextType {
  isLoading: boolean;
  resendVerificationEmail: () => Promise<any>;
  resetPassword: (token: string, password: string) => Promise<any>;
  sendPasswordResetEmail: (email: string) => Promise<any>;
  session: any | null;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  signUp: (data: {
    email: string;
    firstName?: string;
    lastName?: string;
    name: string;
    password: string;
  }) => Promise<any>;
  updateUser: (data: any) => Promise<any>;
  user: any | null;
  verifyEmail: (token: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const sessionData = await authClient.getSession();
        if (sessionData?.data?.session && sessionData?.data?.user) {
          setSession(sessionData.data.session);
          setUser(sessionData.data.user);
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    // Note: onSessionChange is not available in better-auth client
    // Session changes are handled through getSession calls
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.data?.user) {
        setUser(result.data.user);
        // Fetch session separately
        const sessionData = await authClient.getSession();
        if (sessionData?.data?.session) {
          setSession(sessionData.data.session);
        }
      }

      return result;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (data: {
    email: string;
    firstName?: string;
    lastName?: string;
    name: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      const result = await authClient.signUp.email(data);
      return result;
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await authClient.signOut();
      setSession(null);
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (data: any) => {
    try {
      const result = await authClient.updateUser(data);
      if (result.data) {
        setUser(result.data);
      }
      return result;
    } catch (error) {
      console.error("Update user error:", error);
      throw error;
    }
  };

  const sendPasswordResetEmail = async (email: string) => {
    try {
      const result = await authClient.forgetPassword({ email });
      return result;
    } catch (error) {
      console.error("Password reset error:", error);
      throw error;
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      const result = await authClient.resetPassword({
        newPassword: password,
        token,
      });
      return result;
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      const result = await authClient.verifyEmail({
        query: { token },
      });
      if (result.data) {
        setUser(result.data);
      }
      return result;
    } catch (error) {
      console.error("Email verification error:", error);
      throw error;
    }
  };

  const resendVerificationEmail = async () => {
    try {
      const result = await authClient.sendVerificationEmail({
        email: user?.email || "",
      });
      return result;
    } catch (error) {
      console.error("Resend verification error:", error);
      throw error;
    }
  };

  const value = {
    isLoading,
    resendVerificationEmail,
    resetPassword,
    sendPasswordResetEmail,
    session,
    signIn,
    signOut,
    signUp,
    updateUser,
    user,
    verifyEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
