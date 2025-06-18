import { Routes, Route } from 'react-router-dom';
import { HomePage, Login, Register, Profile, ResetPassword, SendEmail, UseApiTest, CrearProducto } from '../features/index';
import ProductListPage from '../features/products/pages/ProductListPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<SendEmail />} />
      <Route path="/productos" element={<ProductListPage />} />
      <Route path="/otroapitest" element={< CrearProducto />} />

      <Route path="/test/:id" element={< UseApiTest />} />
    </Routes>
  );
};

export default AppRoutes;