import { onMessage, SENSOR_SOLO, CONDICAO_SOLO } from "../services/mqttClient.js";
    
let condicaoSolo = "";
let sensorUmidade = "";

onMessage(SENSOR_SOLO, (mensagem) => {
  sensorUmidade = mensagem;
});

onMessage(CONDICAO_SOLO, (mensagem) => {
  condicaoSolo = mensagem;
});

class rotaSensorSolo {
  static lerSensorSolo(req, res) {
    try {
      console.log(`📊 Obtendo dados do Sensor - Umidade do Solo: ${sensorUmidade}, Condição do Solo: ${condicaoSolo}`);
      res.status(200).json({
          condicaoSolo: condicaoSolo,
          sensorUmidade: sensorUmidade,
      })
    } catch (error) {
      console.error('Erro ao obter dados do sensor', error);      
        res.status(500).json({ error: "Erro interno ao obter status"})
    }
  }
}

export default rotaSensorSolo;
