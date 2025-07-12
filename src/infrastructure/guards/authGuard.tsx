import { PrivateRoutes, PublicRoutes } from "../../app/routes";
import { useAppSelector } from "../../infrastructure/redux/hooks"
import { Navigate, Outlet } from 'react-router-dom'

interface AuthGuardProps {
  privateValidation: boolean;
}

export const AuthGuard = ({ privateValidation }: AuthGuardProps) => {
  const user = useAppSelector(state=>state.auth)

  if (privateValidation && !user.isLoggedin) {
    return <Navigate replace to={PublicRoutes.LOGIN}/>;
  }

  if (privateValidation && !user.isVerified) {
    return <Navigate replace to={PublicRoutes.LOGIN}/>;
  }

  if (!privateValidation && user.isLoggedin && user.isVerified) {
    return <Navigate replace to={PrivateRoutes.PRODUCTS}/>;
  }

  return <Outlet/>;
}