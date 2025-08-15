import { useState, useEffect } from 'react'
import { enderecoServidor } from '../../utils';

export default function TelaLed() {
    const [status, setStatus] = useState("Desligado");
    const [statusLed, setStatusLed] = useState("Desconhecido");

    const buscarStatus = async () => {
        try {
            const resposta = await fetch(`${enderecoServidor}/api/status`);
            const dados = await resposta.json();
            setStatusLed(dados.estadoLed)
        } catch (error) {
            console.log('Erro ao buscar status', error);
        }
    }

    const enviarComando = async (comando) => {
        try {
            const resposta = await fetch(`${enderecoServidor}/api/comando`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comando}),
            })
            const dados = await resposta.json()
            console.log(dados.message);
            buscarStatus()
            
        } catch (error) {
            console.error('Erro ao enviar comando');
            
        }
    }
    useEffect(() => {
        buscarStatus();
        const intervalo = setInterval(buscarStatus, 5000)
        return () => clearInterval(intervalo)
    })
    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans px-6 py-10">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-extrabold tracking-wide text-white mb-8">
                    Controle do LED
                </h1>

                <div className="bg-[#1c1f24] p-8 rounded-2xl shadow-lg border border-[#2a2d32]">
                    <h2 className="text-2xl font-semibold mb-4 text-white">
                        Status: <span className={`ml-2 ${statusLed === '1' ? 'text-green-400' : 'text-red-500'}`}>
                            {statusLed === '1' ? 'Ligado' : statusLed === '0' ? 'Desligado' : 'Desconhecido'}
                        </span>
                    </h2>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                        <button
                            className="bg-green-600 hover:bg-green-700 transition-all duration-300 text-white font-semibold py-2 px-6 rounded-full shadow-md"
                            onClick={() => {enviarComando("LIGADO")}}
                        >
                            Ligar LED
                        </button>
                        <button
                            className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white font-semibold py-2 px-6 rounded-full shadow-md"
                            onClick={() => {enviarComando("DESLIGADO")}}
                        >
                            Desligar LED
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
