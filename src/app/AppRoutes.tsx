import { Routes, Route } from 'react-router-dom';
import { HomePage, Login, Register, Profile } from '../features/index';
// import Login from './pages/login';
// import Register from './pages/register';
// import { Perfil } from './pages/Perfil';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;