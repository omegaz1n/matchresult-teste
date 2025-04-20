// 📁 matchresult-teste - Next.js + Tailwind CSS + Proxy

// 1️⃣ INSTALAÇÃO DO PROJETO BASE
// Rode no terminal:
// npx create-next-app@latest matchresult-teste
// ✔ TypeScript: No
// ✔ ESLint: No
// ✔ Tailwind CSS: Yes
// ✔ src/: No
// ✔ App Router: No
// ✔ Import alias: No

// 2️⃣ ESTRUTURA DO FRONTEND EM pages/index.js
import { useState } from "react";

export default function Home() {
  const [matchId, setMatchId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMatchData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await fetch("https://matchresult-proxy.up.railway.app/api/match_data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ match_ids: [matchId] })
      });
      if (!response.ok) throw new Error("Erro ao buscar dados da partida.");
      const resData = await response.json();
      setData(resData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-black text-white min-h-screen p-8">
      <h1 className="text-2xl font-bold text-center mb-6">MatchResult - Free Fire SEA</h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        <input
          className="px-4 py-2 rounded bg-gray-900 border border-gray-700 w-[300px]"
          placeholder="Enter Match ID"
          value={matchId}
          onChange={(e) => setMatchId(e.target.value)}
        />
        <button
          onClick={fetchMatchData}
          className="bg-yellow-500 hover:bg-yellow-400 px-6 py-2 rounded text-black font-semibold"
        >
          Buscar
        </button>
      </div>

      {loading && <p className="text-center">Carregando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {data && (
        <pre className="bg-gray-800 p-4 rounded overflow-auto max-w-3xl mx-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}

// 3️⃣ PROXY EM NODE.JS (subir no Railway)
// - Crie um projeto Node com Express + Axios
// - Faça POST para /match_stats/match_data com os headers e cookies fixos
// - Gere _ts com Math.floor(Date.now() / 1000)
// - Use _sign fixo ou um válido pego do DevTools

// 4️⃣ DEPLOY
// - Suba o front no GitHub e conecte com a Vercel
// - Suba o backend no Railway
// - Teste com Match ID SEA real

// 5️⃣ MELHORIAS FUTURAS
// - Exportar CSV/JSON
// - Layout igual Garena
// - Geração dinâmica de _sign
// - Histórico de partidas recentes
