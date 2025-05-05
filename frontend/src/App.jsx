import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AddItem from './pages/AddBook';
import BookList from './pages/BookList';
import DeleteBook from './pages/DeleteBook';
import ProtectedRoute from './components/ProtectedRoute';
import UserManagement from './pages/UserManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/add" element={<ProtectedRoute><AddItem /></ProtectedRoute>} />
        <Route path="/books" element={<ProtectedRoute><BookList /></ProtectedRoute>} />
        <Route path="/delete-book" element={<ProtectedRoute><DeleteBook /></ProtectedRoute>} />
        <Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
