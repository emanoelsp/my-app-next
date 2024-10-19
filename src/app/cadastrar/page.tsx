"use client";

import { firestore } from "../lib/firebaseconfig";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import LogOut from "../components/logout";

interface Aluno {
    nome: string;
    sobrenome: string;
    datanascimento: string;
    sexo: string;
}

const Cadastro = () => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        console.log("User:", user);
        console.log("Loading:", loading);
        
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    const [formData, setFormData] = useState<Aluno>({
        nome: "",
        sobrenome: "",
        datanascimento: "",
        sexo: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name as keyof Aluno]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addDoc(collection(firestore, "alunos"), formData);
            alert("Dados cadastrados com sucesso");
            clearForm();
        } catch (e) {
            console.error("Erro ao cadastrar aluno", e);
        }
    };

    const clearForm = () => {
        setFormData({
            nome: "",
            sobrenome: "",
            datanascimento: "",
            sexo: "",
        });
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <LogOut />
            <div className="min-h-screen w-full flex items-center justify-center bg-gray-400 p-8">
                <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4 text-center">Cadastro de Aluno</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="sobrenome">Sobrenome</label>
                        <input
                            type="text"
                            id="sobrenome"
                            name="sobrenome"
                            value={formData.sobrenome}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="datanascimento">Data de Nascimento</label>
                        <input
                            type="date"
                            id="datanascimento"
                            name="datanascimento"
                            value={formData.datanascimento}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Sexo</label>
                        <select
                            name="sexo"
                            value={formData.sexo}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="">Selecione</option>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                            Salvar
                        </button>
                        <button
                            type="button"
                            onClick={clearForm}
                            className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
                        >
                            Limpar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Cadastro;
