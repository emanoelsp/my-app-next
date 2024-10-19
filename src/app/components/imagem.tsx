export default function Imagem() {
    return (
        <section className="bg-cover bg-center h-screen w-screen bg-[url('./images/imagem1.jpg')]">
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-white">
                <h2 className="text-xl font-bold mb-10 bg-red-600 bg-opacity-60"> SOBRE </h2>
                <p className="text-lg mb-8 bg-red-600 bg-opacity-60"> Tudo sobre o nosso site </p>
                <a href="#" className="bg-blue-500 text-white px-6 py-3 rounded-lg">
                  CLIQUE AQUI E SAIBA MAIS
                </a>
              </div>
            </div>
        </section>
    );
}
  