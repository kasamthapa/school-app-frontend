import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading)
    return <div className="flex justify-center py-20">Loading...</div>;
  if (!user) return <Navigate to="/admin/login" />;

  return <>{children}</>;
};
