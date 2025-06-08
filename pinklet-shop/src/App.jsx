import { Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/Login Page/LoginPage';
import RegisterPage from './Pages/Register Page/RegisterPage';
import './App.css';
import ConfirmMailPage from './Pages/Confirm Mail/ConfirmMailPage';
import ForgetPasswordPage from './Pages/Forget Password Page/ForgetPasswordPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/confirm-email" element={<ConfirmMailPage />} />
      <Route path="/forgetPw" element={<ForgetPasswordPage />} />

      {/* 404 fallback route
      <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}

export default App;
