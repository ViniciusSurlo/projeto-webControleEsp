import { useState, useEffect } from "react";
import { enderecoServidor } from "../../utils";

export default function DHT() {
  const [temperatura, setTemperatura] = useState("");
  const [umidade, setUmidade] = useState("");

  const buscarStatus = async () => {
    try {
      const resposta = await fetch(`${enderecoServidor}/api/DHT`);
      const dados = await resposta.json();
      setTemperatura(dados.temperatura);
      setUmidade(dados.umidade);
    } catch (error) {
      console.log("Erro ao buscar dados", error);
    }
  };
  useEffect(() => {
    buscarStatus();
    const intervalo = setInterval(buscarStatus, 5000);
    return () => clearInterval(intervalo);
  });

  return (
    <div className="max-w-xs mx-auto p-4">
      <h1 className="text-xl font-bold text-center mb-4">Dados DHT</h1>
      <p className="text-center mt-4 font-medium">
        Temperatura: {temperatura} °C
      </p>
      <p className="text-center mt-4 font-medium">Umidade: {umidade} %</p>
      <div className="flex flex-col items-center mt-10">
        <h2 className="mb-4 font-semibold">Acesse o projeto na Vercel</h2>
        <a
          href="https://wokwi.com/projects/439917606114795521"
          target="_blank"
          className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold py-2 px-6 rounded-full shadow-md"
        >
          Projeto Sensor DHT
        </a>
      </div>
    </div>
  );
}
