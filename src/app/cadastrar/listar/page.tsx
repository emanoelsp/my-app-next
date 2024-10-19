"use client";

import { firestore } from "../../lib/firebaseconfig";
import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import LogOut from "../../components/logout";

interface Aluno {
    id: string;
    nome: string;
    sobrenome: string;
    datanascimento: string;
    sexo: string;
}

const Listar = () => {
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [editId, setEditId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Omit<Aluno, 'id'>>({
        nome: '',
        sobrenome: '',
        datanascimento: '',
        sexo: '',
    });
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    const fetchAlunos = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, 'alunos'));
            const alunosList: Aluno[] = [];
            querySnapshot.forEach(doc => {
                alunosList.push({ id: doc.id, ...doc.data() } as Aluno);
            });
            setAlunos(alunosList);
        } catch (e) {
            console.error('Erro ao buscar alunos', e);
        }
    };

    useEffect(() => {
        fetchAlunos();
    }, []);

    const handleEdit = (aluno: Aluno) => {
        setFormData({
            nome: aluno.nome,
            sobrenome: aluno.sobrenome,
            datanascimento: aluno.datanascimento,
            sexo: aluno.sexo
        });
        setEditId(aluno.id); // Armazena o ID do aluno que está sendo editado
    };

    const handleUpdate = async (id: string) => {
        const alunoRef = doc(firestore, 'alunos', id);
        try {
            await updateDoc(alunoRef, formData);
            alert('Aluno atualizado com sucesso');
            fetchAlunos();
            setEditId(null); // Sai do modo de edição
        } catch (e) {
            console.error('Erro ao atualizar aluno', e);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja deletar?')) {
            try {
                await deleteDoc(doc(firestore, 'alunos', id));
                alert('Aluno deletado com sucesso');
                fetchAlunos();
            } catch (e) {
                console.error('Erro ao deletar aluno', e);
                alert('Erro ao deletar aluno. Verifique os logs para mais detalhes.');
            }
        }
    };

    return (
        <>
        <LogOut />
            <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-4 mx-auto">
                <h2 className="text-xl font-bold mb-4 text-center">Lista de Alunos</h2>

                <table className="min-w-full border-collapse border border-gray-300 text-center">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Nome</th>
                            <th className="border border-gray-300 p-2">Sobrenome</th>
                            <th className="border border-gray-300 p-2">Data de Nascimento</th>
                            <th className="border border-gray-300 p-2">Sexo</th>
                            <th className="border border-gray-300 p-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alunos.map(aluno => (
                            <tr key={aluno.id}>
                                <td className="border border-gray-300 p-2">
                                    {editId === aluno.id ? (
                                        <input
                                            type="text"
                                            value={formData.nome}
                                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                            className="border border-gray-300 p-1"
                                        />
                                    ) : (
                                        aluno.nome
                                    )}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {editId === aluno.id ? (
                                        <input
                                            type="text"
                                            value={formData.sobrenome}
                                            onChange={(e) => setFormData({ ...formData, sobrenome: e.target.value })}
                                            className="border border-gray-300 p-1"
                                        />
                                    ) : (
                                        aluno.sobrenome
                                    )}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {editId === aluno.id ? (
                                        <input
                                            type="date"
                                            value={formData.datanascimento}
                                            onChange={(e) => setFormData({ ...formData, datanascimento: e.target.value })}
                                            className="border border-gray-300 p-1"
                                        />
                                    ) : (
                                        aluno.datanascimento
                                    )}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {editId === aluno.id ? (
                                        <select
                                            value={formData.sexo}
                                            onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}
                                            className="border border-gray-300 p-1"
                                        >
                                            <option value="">Selecione Sexo</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Feminino">Feminino</option>
                                        </select>
                                    ) : (
                                        aluno.sexo
                                    )}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {editId === aluno.id ? (
                                        <button
                                            onClick={() => handleUpdate(aluno.id)}
                                            className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                                        >
                                            Salvar
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(aluno)}
                                            className="bg-yellow-500 text-white p-1 rounded mr-1 hover:bg-yellow-600"
                                        >
                                            Editar
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(aluno.id)}
                                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                                    >
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Listar;
