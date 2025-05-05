export const saveAuth = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  };
  
  export const getRole = () => localStorage.getItem('role');
  export const isAuthenticated = () => !!localStorage.getItem('token');
  export const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };
  