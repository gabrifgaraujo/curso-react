import React, { useEffect, useState } from 'react';

const GITHUB_USERNAME = 'gabrifgaraujo';

interface GitHubUser {
  login?: string;
  avatar_url: string;
  name?: string | null;
  public_repos?: number;
  followers?: number;
  following?: number;
  bio?: string | null;
  blog?: string | null;
  [key: string]: any;
}

interface PrimaryLanguage {
  name: string;
}

interface PinnedRepo {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: PrimaryLanguage | null;
}

const Sobre: React.FC = () => {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [pinnedRepos, setPinnedRepos] = useState<PinnedRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth'}); //faz subir pro topo a pagina
  }

  useEffect(() => {
    let mounted = true;

    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Buscar dados do usuário
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!userResponse.ok) throw new Error('Falha ao buscar dados do usuário');
        const userJson: any = await userResponse.json();

        // Buscar repositórios mais populares como fallback
        const reposResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6`
        );
        if (!reposResponse.ok) throw new Error('Falha ao buscar repositórios');
        const reposJson: any[] = await reposResponse.json();

        // Formatar repositórios para o mesmo formato
        const formattedRepos: PinnedRepo[] = reposJson.map((repo) => ({
          name: repo.name,
          description: repo.description ?? null,
          url: repo.html_url,
          stargazerCount: typeof repo.stargazers_count === 'number' ? repo.stargazers_count : 0,
          forkCount: typeof repo.forks_count === 'number' ? repo.forks_count : 0,
          primaryLanguage: repo.language ? { name: repo.language } : null,
        }));

        if (!mounted) return;
        setUserData({
          avatar_url: userJson.avatar_url,
          name: userJson.name ?? userJson.login,
          public_repos: userJson.public_repos ?? 0,
          followers: userJson.followers ?? 0,
          following: userJson.following ?? 0,
          bio: userJson.bio ?? null,
          blog: userJson.blog ?? null,
          login: userJson.login,
        });
        setPinnedRepos(formattedRepos);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        if (mounted) setError(message);
        console.error('Erro ao buscar dados do GitHub:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchGitHubData();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Carregando dados do GitHub...</p>
          <p className="text-gray-500 mt-2">Conectando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center max-w-md p-6 bg-red-900/30 backdrop-blur-sm rounded-xl border border-red-700/50">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Erro na Conexão</h2>
          <p className="text-gray-300 mb-4">Não foi possível conectar ao GitHub:</p>
          <p className="text-red-300 font-mono bg-black/50 p-3 rounded-lg">{error}</p>
          <p className="text-gray-500 mt-6">Verifique seu nome de usuário ou conexão com a internet</p>
        </div>
      </div>
    );
  }

  // Safety: se por algum motivo não vier userData após o loading, não quebrar a UI
  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-16 px-4">
      {/* Efeito de estrelas */}
      <div className="fixed inset-0">
        {[...Array(100)].map((_, i) => {
          const style: React.CSSProperties = {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            opacity: Math.random() * 0.8 + 0.2,
            animationDuration: `${Math.random() * 5 + 2}s`,
          };
          return <div key={i} className="absolute rounded-full bg-white animate-pulse" style={style} />;
        })}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto mt-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sobre <span className="text-blue-400">Mim</span>
          </h1>
          <div className="w-32 h-1 bg-blue-500 rounded-full mx-auto"></div>
        </div>

        {/* Perfil do GitHub */}
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 mb-16 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0">
              <img
                src={userData.avatar_url}
                alt={userData.name || GITHUB_USERNAME}
                className="w-48 h-48 rounded-full border-4 border-blue-500 object-cover shadow-lg"
              />
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">{userData.name || GITHUB_USERNAME}</h2>
              <p className="text-blue-400 mb-4">@{GITHUB_USERNAME}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                <div className="bg-gray-700/50 px-4 py-2 rounded-lg">
                  <span className="block text-xl font-bold text-white">{userData.public_repos ?? 0}</span>
                  <span className="text-gray-400">Repositórios</span>
                </div>
                <div className="bg-gray-700/50 px-4 py-2 rounded-lg">
                  <span className="block text-xl font-bold text-white">{userData.followers ?? 0}</span>
                  <span className="text-gray-400">Seguidores</span>
                </div>
                <div className="bg-gray-700/50 px-4 py-2 rounded-lg">
                  <span className="block text-xl font-bold text-white">{userData.following ?? 0}</span>
                  <span className="text-gray-400">Seguindo</span>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">{userData.bio}</p>

              {userData.blog && (
                <div className="mt-6">
                  <a
                    href={userData.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {userData.blog.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Repositórios destacados */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Projetos <span className="text-purple-400">Destacados</span>
          </h2>
          <div className="w-24 h-1 bg-purple-500 rounded-full mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pinnedRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] transform group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{repo.name}</h3>
                {repo.primaryLanguage && (
                  <span className="bg-blue-900/30 text-blue-400 text-sm px-3 py-1 rounded-full">
                    {repo.primaryLanguage.name}
                  </span>
                )}
              </div>

              <p className="text-gray-400 mb-6 min-h-[60px]">{repo.description || 'Repositório sem descrição'}</p>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {repo.stargazerCount}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {repo.forkCount}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Mensagem final */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 max-w-2xl mx-auto italic">
            "O espaço e o código são infinitos. Ambos nos convidam a explorar, criar e descobrir novas fronteiras."
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30 flex items-center"
            >
              Ver mais no GitHub
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sobre;
