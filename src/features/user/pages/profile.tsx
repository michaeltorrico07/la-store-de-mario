import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../auth/hooks/useAuthContext"
import { useEffect } from "react"

export const Profile = () => {
  const { user, loading, LogOutUser } = useAuthContext()
  const navigate = useNavigate()

  useEffect(()=> {
  if (!loading && !user) {
    navigate("/login")
  }
  },[loading, user, navigate])

  const logOut = () => {
    LogOutUser()
    navigate("/login")
  }
  return (
    <div>
      <div>Hola, a Perfil {user?.email}</div>
      <button onClick={logOut}>Sign Out</button>
    </div>
  )
}
