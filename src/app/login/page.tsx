"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/cadastrar');
        } catch (err) {
            const errorMessage = (err instanceof Error) ? err.message : "Erro ao autenticar";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGithubLogin = async () => {
        const result = await signIn('github', { redirect: false });
        if (result?.error) {
            setError(result.error);
        } else {
            router.push('/cadastrar'); // Redireciona após o GitHub
        }
    };

    return (
        <>
            <div className="flex items-center justify-center">
                <form onSubmit={handleSubmit} className="bg-gray-300 p-8 rounded shadow-md">
                    <h2 className="text-3xl mx-4 text-center"> SISTEMA DE LOGIN</h2>
                    {error && <p className="text-red-500 p-4 text-center">{error}</p>}
                    <div className="mt-4 text-center">
                        <label className="block text-sm"> Digite seu email: </label>
                        <input type="email" id="email" required placeholder="Digite seu email"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            className="mt-4 block w-full p-2 rounded" />
                        <label className="block text-sm mt-4"> Digite sua senha: </label>
                        <input type="password" id="password" required placeholder="Digite sua senha"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            className="mt-4 block w-full p-2 rounded" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full my-6 bg-blue-300 text-white p-3 rounded">
                        {loading ? "Carregando..." : "Entrar"}
                    </button>
                </form>
            </div>
            <div className="flex items-center justify-center mt-2">
                <button 
                onClick={handleGithubLogin}
                className="flex bg-gray-900 text-white p-2 rounded hover:bg-gray-700 transition duration-200">
                    <FaGithub className="h-5 w-5 mr-2" />
                    Login com GitHub
                </button>
            </div>
        </>
    );
}
