import { useEffect, useState } from "react";
import { auth, api } from '../../infrastructure/services/index';
import { AuthContext } from './authContext'
import { onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification, signOut, signInWithEmailAndPassword, confirmPasswordReset, sendPasswordResetEmail, EmailAuthProvider, reauthenticateWithCredential, updatePassword, type UserCredential } from "firebase/auth";
import { useAppDispatch, useAppSelector } from '../../infrastructure/redux/hooks'
import { createAuth, resetAuth } from './slice'
import type { User } from "./auth";

export type AuthContextType = {
  loading: boolean
  user: User
  registerUser: (email: string, password: string) => Promise<string>;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
  LogOutUser: () => Promise<void>;
  ResetPassword: (oobCode: string, newPassword: string) => Promise<boolean>;
  sendResetPasswordEmail: (email: string) => Promise<boolean>;
  reauthenticateUser: (password: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const res = await api.get(`/user`)
          dispatch(createAuth({
            ...res.data.data,
            id: currentUser.uid,
            isVerified: currentUser.emailVerified,
            isLoggedin: true
          }))
        } catch (error) {
          console.error("Error al obtener el usuario", error)
          dispatch(resetAuth())
        }
      } else {
        dispatch(resetAuth())
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [dispatch])

  const registerUser = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await sendEmailVerification(userCredential.user)
    await LogOutUser()
    const id = userCredential.user.uid
    return id
  }

  const loginUser = async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    return credential
  }

  const ResetPassword = async (oobCode: string, newPassword: string) => {
    await confirmPasswordReset(auth, oobCode, newPassword)
    return true
  }

  const sendResetPasswordEmail = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
    return true
  }

  const LogOutUser = async () => {
    await signOut(auth)
    dispatch(resetAuth())
  }

  const reauthenticateUser = async (password: string) =>{

    if (!user) throw new Error("No user is currently authenticated");
    const credential = EmailAuthProvider.credential(user.email, password);

    if (!auth.currentUser) throw new Error("No user is currently authenticated");
    await reauthenticateWithCredential(auth.currentUser, credential);
  }

  const changePassword = async (newPassword: string) =>{
    if (!user) throw new Error("No user is currently authenticated");
    if (!auth.currentUser) throw new Error("No user is currently authenticated");

    await updatePassword(auth.currentUser, newPassword);
  }

  return (
    <AuthContext.Provider value={{loading: loading && !user.id, user, registerUser, LogOutUser, loginUser, ResetPassword, sendResetPasswordEmail, reauthenticateUser, changePassword }}>
      {children}
    </AuthContext.Provider>
  )
}
