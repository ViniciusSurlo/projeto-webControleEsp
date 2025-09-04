import { useState, useEffect } from "react";
import { enderecoServidor } from "../../utils";

export default function BoiaStatus() {
  const [statusBoia, setStatusBoia] = useState("");

  const buscarStatus = async () => {
    try {
      const resposta = await fetch(`${enderecoServidor}/api/statusBoia`);
      const dados = await resposta.json();
      setStatusBoia(dados.statusBoia);
    } catch (error) {
      console.log("Erro ao buscar dados", error);
    }
  };

  useEffect(() => {
    buscarStatus();
    const intervalo = setInterval(buscarStatus, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="max-w-xs mx-auto p-4 text-center">
      {/* Título */}
      <h1 className="text-xl font-bold mb-4">Nível de Água</h1>

      {/* Caixa da água */}
      <div className="relative h-48 w-32 mx-auto border-2 border-gray-400 rounded bg-gray-100">
        <div
          className={`absolute bottom-0 w-full ${
            statusBoia === "ALTO"
              ? "h-full bg-blue-500" // cheio
              : "h-1/2 bg-blue-400" // metade
          }`}
        ></div>
      </div>

      {/* Status */}
      <p className="mt-4 font-medium">
        Status:{" "}
        {statusBoia === "ALTO" ? (
          <span className="text-red-600">Alto</span>
        ) : (
          <span className="text-blue-600">Baixo</span>
        )}
      </p>

      {/* Link para o projeto */}
      <div className="flex flex-col items-center mt-10">
        <h2 className="mb-4 font-semibold">Acesse o projeto na Vercel</h2>
        <a
          href="https://wokwi.com/projects/439347391580819457"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold py-2 px-6 rounded-full shadow-md"
        >
          Projeto Boia
        </a>
      </div>
    </div>
  );
}
