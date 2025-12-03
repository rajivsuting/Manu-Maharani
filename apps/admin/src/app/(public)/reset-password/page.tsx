import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <ResetPasswordForm />
    </div>
  );
}

export const metadata = {
  title: "Reset Password",
  description: "Set your new password",
};
