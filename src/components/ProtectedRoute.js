import { Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

function ProtectedRoute({ children }) {
  const { keycloak } = useKeycloak();

  if (!keycloak.authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

