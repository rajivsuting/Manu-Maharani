import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-destructive" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground">
              You don&apos;t have permission to access this page. Please contact
              your administrator if you believe this is an error.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Link href="/">
            <Button className="w-full">Go to Dashboard</Button>
          </Link>
          <Link href="/sign-out">
            <Button className="w-full" variant="outline">
              Sign Out
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  description: "Access denied",
  title: "Unauthorized",
};
