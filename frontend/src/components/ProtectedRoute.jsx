import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  // Если токена нет — отправляем на логин
  if (!token) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;
