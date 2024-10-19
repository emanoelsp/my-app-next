export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center bg-gray-400">
                <p> &copy; {new Date().getFullYear()} Meu projeto NEXT JS. Todos direitos reservado</p>
                <div className="mt-2">
                    <p> Acesse os termos de uso </p>
                    <p> Políticas de segurança</p>
                </div>
            </div>
      </footer>
    );
  }