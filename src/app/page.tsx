import Imagem from "./components/imagem";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <section className="h-screen flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold mb-10">Página Inicial</h1>
          <p className="border-2 border-blue-900 p-8 text-2xl">Acesso a página inicial</p>
      </section>
      <section className="container text-center my-10">
        <h2 className="text-xl font-bold mb-10"> INFORMAÇÕES </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-200 text-black p-6 rounded-lg shadow-2xl">
            <h3 className="text-xl font-bold mb-10"> TEXTO 1 </h3>
            <p> Parágrafo 1 </p>
          </div>
          <div className="bg-blue-200 text-black p-6 rounded-lg shadow-2xl">
            <h3 className="text-xl font-bold mb-10"> TEXTO 2 </h3>
            <p> Parágrafo 2 </p>
          </div>
          <div className="bg-blue-200 text-black p-6 rounded-lg shadow-2xl">
            <h3 className="text-xl font-bold mb-10"> TEXTO 3 </h3>
            <p> Parágrafo 3 </p>
          </div>
        </div>
      </section>
      <Imagem></Imagem>
    </main>
  );
}