import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../infrastructure/redux/hooks"
import { PrivateRoutes } from "../../app/routes";
import type { Roles } from "../../features/auth/roles";

interface RolGuardProps {
  rol: Roles
}

export const RolGuard = ({ rol }: RolGuardProps) => {
  const user = useAppSelector(state => state.auth)
  return user.rol === rol ? <Outlet/> : <Navigate replace to={PrivateRoutes.PRODUCTS}/>
}
