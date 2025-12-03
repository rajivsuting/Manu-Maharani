import { RoleGuard, useRoleCheck } from '@/components/auth/role-guard';
import { requireAdmin } from '@/lib/auth-utils';

// This page requires admin role on the server side
export default async function AdminOnlyPage() {
  // Server-side role check - will redirect if not admin
  const user = await requireAdmin();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Only Page</h1>
      <p className="mb-4">Welcome, {user.name}! You have admin access.</p>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Role-based Content Examples:</h2>

        {/* Only show to admins */}
        <RoleGuard
          requireAdmin
          fallback={<p>This content is only visible to admins</p>}
        >
          <div className="p-4 bg-green-100 border border-green-300 rounded">
            <h3 className="font-semibold text-green-800">Admin Content</h3>
            <p className="text-green-700">
              This content is only visible to users with admin or super_admin
              role.
            </p>
          </div>
        </RoleGuard>

        {/* Only show to super admins */}
        <RoleGuard
          requireSuperAdmin
          fallback={<p>This content is only visible to super admins</p>}
        >
          <div className="p-4 bg-red-100 border border-red-300 rounded">
            <h3 className="font-semibold text-red-800">Super Admin Content</h3>
            <p className="text-red-700">
              This content is only visible to super admins.
            </p>
          </div>
        </RoleGuard>

        {/* Show different content based on specific role */}
        <RoleGuard
          requiredRole="admin"
          fallback={<p>This is only for regular admins</p>}
        >
          <div className="p-4 bg-blue-100 border border-blue-300 rounded">
            <h3 className="font-semibold text-blue-800">
              Regular Admin Content
            </h3>
            <p className="text-blue-700">
              This content is only visible to regular admins (not super admins).
            </p>
          </div>
        </RoleGuard>

        {/* Client-side role checking example */}
        <ClientSideRoleExample />
      </div>
    </div>
  );
}

// Client-side component showing how to use the useRoleCheck hook
function ClientSideRoleExample() {
  const { hasRole, isAdmin, isSuperAdmin, userRole } = useRoleCheck();

  return (
    <div className="p-4 bg-gray-100 border border-gray-300 rounded">
      <h3 className="font-semibold text-gray-800 mb-2">
        Client-side Role Information
      </h3>
      <div className="space-y-1 text-sm">
        <p>
          <strong>Current Role:</strong> {userRole || "None"}
        </p>
        <p>
          <strong>Is Admin:</strong> {isAdmin() ? "Yes" : "No"}
        </p>
        <p>
          <strong>Is Super Admin:</strong> {isSuperAdmin() ? "Yes" : "No"}
        </p>
        <p>
          <strong>Has User Role:</strong> {hasRole("user") ? "Yes" : "No"}
        </p>
        <p>
          <strong>Has Admin Role:</strong> {hasRole("admin") ? "Yes" : "No"}
        </p>
        <p>
          <strong>Has Super Admin Role:</strong>{" "}
          {hasRole("super_admin") ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
}
