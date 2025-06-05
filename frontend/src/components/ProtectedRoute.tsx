import { Navigate } from 'react-router-dom';
import useRealEstateStore from '../stores';
import { toast } from "sonner";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const token = useRealEstateStore((state) => state.token);

  if (!token) {
    toast.error('Please login to continue')
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;