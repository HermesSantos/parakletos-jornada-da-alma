import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getMe } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

const AdminRoute = () => {
  const [status, setStatus] = useState<"loading" | "authorized" | "unauthorized">("loading");

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      setStatus("unauthorized");
      return;
    }

    getMe()
      .then((user) => {
        setStatus(user.is_admin ? "authorized" : "unauthorized");
      })
      .catch(() => {
        setStatus("unauthorized");
      });
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground font-sans">Carregando painel...</p>
      </div>
    );
  }

  if (status === "unauthorized") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
