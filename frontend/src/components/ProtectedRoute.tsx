import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

interface ProtectedRouteProps {
  element: React.ReactNode;
  redirectTo: string; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, redirectTo }) => {
    const { isLoggedIn } = useAuth(); 
    
    if (!isLoggedIn) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{element}</>;
};

export default ProtectedRoute;
