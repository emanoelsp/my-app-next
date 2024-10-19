"use client"

import { signOut } from "firebase/auth"
import { auth } from "../lib/firebaseconfig"
import { useRouter } from "next/navigation"
import { useAuth } from "../hooks/useAuth"

export default function LogOut(){
    const { user } = useAuth();
    const router = useRouter();

    const handleLogOut =async () => {
        try {
            await signOut(auth);
            router.push('/')
        } catch (error) {
            console.error('Falha ao deslogar: ',error)
        }
    }

    return(
        <div className="flex items-center bg-gray-900 text-white gap-4 ">
            <h5> Bem vindo: {user?.email}</h5>
            <button onClick={handleLogOut}
            className="rounded bg-red-500 text-white p-2">
                sair
            </button>
        </div>
    )
}






