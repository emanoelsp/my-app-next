import Link from "next/link";

export default function Profiles() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold mb-10">CENTRAL DO USUÁRIO</h1>
      <p className="border-2 border-blue-900 p-8 text-2xl">
        Gerenciamento de usuários
      </p>
      <div className="flex flex-col mt-10 gap-6">
        <Link href={{  pathname: "/profiles/1",
            query: { texto: "Texto para o Usuário 1" }
          }} className="bg-gray-300 rounded-lg p-2 hover:underline">
          Usuário 1
        </Link>
        <Link href={{  pathname: "/profiles/user2",
            query: { texto: "Texto para o Usuário 2" }
          }} className="bg-gray-300 rounded-lg p-2 hover:underline">
          Usuário 2
        </Link>
        <Link href={{  pathname: "/profiles/user3",
            query: { texto: "Texto para o Usuário 3" }
          }} className="bg-gray-300 rounded-lg p-2 hover:underline">
          Usuário 3
        </Link>
      </div>
    </div>
  );
}
