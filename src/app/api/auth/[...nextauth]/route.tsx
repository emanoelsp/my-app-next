import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

if (!githubClientId || !githubClientSecret) {
    throw new Error('Faltando variáveis de ambiente para autenticação.');
}
const authOptions = {
    providers: [
        GitHubProvider({
            clientId: githubClientId,
            clientSecret: githubClientSecret,
        }),
    ],
    pages: {
        error: '/auth/error', // Redireciona para a página de erro
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; // Exporta o handler para GET e POST