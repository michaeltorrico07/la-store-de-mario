import { AuthProvider } from "../features/auth/authProvider"
import Routes from "./AppRoutes"

function App() {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  )
}

export default App
