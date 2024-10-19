
export default async function ProfilePage({ params }: { params: { nickname: string } }) {
    const { nickname } = params;
    try {
        const res = await fetch(`https://api.adviceslip.com/advice/${nickname}`);
        if (!res.ok) {
            throw new Error(`Erro ao buscar dados: ${res.status}`);
        }
        const data = await res.json();
        return (
            <div>
                <h1>Perfil de {nickname}</h1>
                <p>Dados: {JSON.stringify(data)}</p>
            </div>
        );
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return (
            <div>
                <h1>Erro ao carregar perfil de {nickname}</h1>
                <p>{String(error)}</p>
            </div>
        );
    }
}
