"use client";

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { useAuth } from './auth-provider';

interface SignOutButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
}

export function SignOutButton({
  children,
  className,
  variant = "ghost",
  size = "default",
  showIcon = true,
}: SignOutButtonProps) {
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
      // Redirect to sign-in page after successful sign out
      router.push("/sign-in");
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleSignOut}
      disabled={isLoading}
    >
      {showIcon && <LogOut className="h-4 w-4 mr-2" />}
      {children || (isLoading ? "Signing out..." : "Sign out")}
    </Button>
  );
}
