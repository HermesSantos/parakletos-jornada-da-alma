import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getMe } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

const StudentRoute = () => {
  const [status, setStatus] = useState<"loading" | "authorized" | "unauthorized" | "no_enrollment">(
    "loading",
  );

  useEffect(() => {
    const token = getAuthToken("student");

    if (!token) {
      setStatus("unauthorized");
      return;
    }

    getMe("student")
      .then((user) => {
        if (user.is_admin) {
          setStatus("unauthorized");
          return;
        }
        setStatus("authorized");
      })
      .catch(() => {
        setStatus("unauthorized");
      });
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground font-sans">Carregando área do aluno...</p>
      </div>
    );
  }

  if (status === "unauthorized") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default StudentRoute;
