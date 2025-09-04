import { onMessage, TEMPERATURA, UMIDADE } from "../services/mqttClient.js";

let temperatura = "";
let umidade = "";

onMessage(TEMPERATURA, (mensagem) => {
  temperatura = mensagem;
});

onMessage(UMIDADE, (mensagem) => {
  umidade = mensagem;
});

class rotaDHT {
  static lerStatus(req, res) {
    try {
        res.status(200).json({
            temperatura,
            umidade,
        })
    } catch (error) {
        res.status(500).json({ error: "Erro interno ao obter status"})
    }
  }
}

export default rotaDHT;
