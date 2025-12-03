"use client";
import React from 'react';
import { Toaster } from 'sonner';

import { ActiveThemeProvider } from '../active-theme';
import { AuthProvider } from '../auth/auth-provider';

export default function Providers({
  activeThemeValue,
  children,
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </ActiveThemeProvider>
    </>
  );
}
