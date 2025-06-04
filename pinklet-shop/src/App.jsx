import { Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/Login Page/LoginPage';
import RegisterPage from './Pages/Register Page/RegisterPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* 404 fallback route
      <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}

export default App;
