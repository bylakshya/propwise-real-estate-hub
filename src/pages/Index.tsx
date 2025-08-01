
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Building } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (!user?.role) {
        navigate("/role-selection");
      } else if (user.role === "broker") {
        navigate("/broker/dashboard");
      } else if (user.role === "builder" || user.role === "admin" || user.role === "sales_manager" || user.role === "accountant") {
        navigate("/builder/dashboard");
      }
    } else if (isAuthenticated === false) {
      navigate("/auth");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Building className="h-12 w-12 text-primary animate-pulse" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Shardeya
          </h1>
        </div>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    </div>
  );
};

export default Index;
