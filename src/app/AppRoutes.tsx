import { Routes, Route } from 'react-router-dom';
import { HomePage, Login, Register, Profile, ResetPassword, SendEmail } from '../features/index';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<SendEmail />} />
    </Routes>
  );
};

export default AppRoutes;