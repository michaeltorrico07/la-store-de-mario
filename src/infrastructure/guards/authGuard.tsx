import { PrivateRoutes, PublicRoutes } from "../../app/routes";
import { useAppSelector } from "../../infrastructure/redux/hooks"
import { Navigate, Outlet } from 'react-router-dom'

interface AuthGuardProps {
  privateValidation: boolean;
}

export const AuthGuard = ({ privateValidation }: AuthGuardProps) => {
  const user = useAppSelector(state=>state.auth)
  return user.isVerified ? (
    privateValidation ? (
      <Outlet/>
    ) : (<Navigate replace to={PrivateRoutes.PRODUCTS}/>)
  ): (
    <Navigate replace to={PublicRoutes.LOGIN}/>
  )
}
