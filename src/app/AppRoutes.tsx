import { Routes, Route } from 'react-router-dom'
import { HomePage, Login, Register, Profile, ResetPassword, SendEmail, ProductListContainer, UseApiTest, CrearProducto, OtraApiTest, UpdatearBalatro, KitchenPanel } from '../features/index'
import { DeliveryPanel } from '../features/employees/delivery/pages/DeliveryPanel'
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<SendEmail />} />
      <Route path="/productos" element={<ProductListContainer />} />
      <Route path="/kitchen" element={<KitchenPanel />} />
      <Route path="/delivery" element={<DeliveryPanel />} />
      
      




      <Route path="/otroapitest" element={< OtraApiTest />} />
      <Route path="/crearBalatro" element={< CrearProducto />} />
      <Route path="/unsa" element={< UpdatearBalatro />} />
      <Route path="/test/:id" element={< UseApiTest />} />
    </Routes>
  )
}