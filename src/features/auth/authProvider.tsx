import { useEffect, useState } from "react";
import type { User } from "./auth";
import { auth, api } from '../../infrastructure/services/index';
import { AuthContext } from './authContext'
import { onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification, signOut, signInWithEmailAndPassword } from "firebase/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const res = await api.get("/user")
          setUser({
            ...res.data.user,
            id: currentUser.uid,
            email: currentUser.email || "",
            isVerified: currentUser.emailVerified,
          })
        } catch (error) {
          console.error("Error al obtener el usuario", error)
          setUser(null)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const registerUser = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await sendEmailVerification(userCredential.user)
    await LogOutUser()
  }

  const loginUser = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const LogOutUser = async () => {
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loading, registerUser, LogOutUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  )
}
