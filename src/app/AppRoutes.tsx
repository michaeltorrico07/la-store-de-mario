import { Routes, Route } from 'react-router-dom'
import { HomePage, Login, Register, Profile, ResetPassword, SendEmail, ProductListContainer, KitchenPanel, DeliveryPanel, Management, ProductDetail } from '../features/index'
import { useAuthContext } from '../features/auth/hooks/useAuthContext'
import { Loading } from '../features/shared'
import { PrivateRoutes, PublicRoutes } from './routes'
import { AuthGuard, RolGuard } from '../infrastructure/guards'
import { Roles } from '../features/auth/roles'

export const AppRoutes = () => {
  const { loading } = useAuthContext()
  if (loading){
    return <Loading />
  }
  return (
    <Routes>
      <Route element = {<AuthGuard privateValidation = { false }/>} >
        <Route path={PublicRoutes.LOGIN} element = {<Login />} />
      </Route>
      
      <Route element = {<AuthGuard privateValidation = { false }/>} >
        <Route path={PublicRoutes.REGISTER} element = {<Register />} />
      </Route>

      <Route element = {<AuthGuard privateValidation = { true }/>} >
        <Route path={PrivateRoutes.PRODUCTS} >
          <Route index element={<ProductListContainer />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>
      </Route>

      <Route element = {<AuthGuard privateValidation = { true }/>} >
        <Route path={PrivateRoutes.PROFILE} element = { <Profile/> } />
      </Route>


      <Route element = {<AuthGuard privateValidation = { true }/>} >
        <Route element = {<RolGuard rol = { Roles.ADMIN }/>} >
          <Route path={PrivateRoutes.KITCHEN} element = { <KitchenPanel/> } />
        </Route>
      </Route>


      <Route element = {<AuthGuard privateValidation = { true }/>} >
        <Route element = {<RolGuard rol = { Roles.ADMIN }/>} >
          <Route path={PrivateRoutes.DELIVERY} element = { <DeliveryPanel/> } />
        </Route>
      </Route>

      <Route element = {<AuthGuard privateValidation = { true }/>} >
        <Route element = {<RolGuard rol = { Roles.ADMIN }/>} >
          <Route path={PrivateRoutes.MANAGEMENT} element = { <Management/> } />
        </Route>
      </Route>


      <Route path="/" element={<HomePage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<SendEmail />} />

    </Routes>
  )
}