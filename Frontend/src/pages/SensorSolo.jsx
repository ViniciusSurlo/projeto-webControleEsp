import { useState, useEffect } from "react";
import { enderecoServidor } from "../../utils";

export default function SensorSolo() {
  const [dados, setDados] = useState({ temperatura: "", umidade: "" });
  const [loading, setLoading] = useState(false);

  const buscarDados = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${enderecoServidor}/api/SensorDht`);
      const data = await response.json();
      setDados(data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarDados();
    const intervalo = setInterval(buscarDados, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="max-w-md mx-auto bg-gray-900 rounded-2xl shadow-2xl p-6 border border-gray-800">
      <h2 className="text-2xl font-extrabold text-center mb-6 flex items-center justify-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        <svg
          className="w-6 h-6 mr-2 text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM12 9h.01M12 15h.01"
          />
        </svg>
        Status do Solo
      </h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-10 h-10 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mb-3"></div>
          <p className="text-gray-400 font-medium">Carregando dados...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Card Condição do Solo */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-4 shadow-lg hover:shadow-cyan-400/30 transition duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
                  <span className="text-2xl">🌱</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Condição</h3>
                  <p className="text-xl font-bold text-white">
                    Muito Úmido
                  </p>
                </div>
              </div>
              <div
                className={`w-3 h-3 rounded-full ${
                  parseFloat(dados.temperatura) > 30 ? "bg-red-400" : "bg-green-400"
                }`}
              ></div>
            </div>
          </div>

          {/* Card Umidade */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-4 shadow-lg hover:shadow-blue-400/30 transition duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
                  <span className="text-2xl">💧</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Valor</h3>
                  <p className="text-xl font-bold text-white">
                    Baixo ⬇
                  </p>
                </div>
              </div>
              <div
                className={`w-3 h-3 rounded-full ${
                  parseFloat(dados.umidade) > 70 ? "bg-blue-400" : "bg-green-400"
                }`}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Botão de atualizar */}
      <button
        onClick={buscarDados}
        disabled={loading}
        className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Atualizando...
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Atualizar Dados
          </>
        )}
      </button>
    </div>
  );
}