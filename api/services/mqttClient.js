
import mqtt from "mqtt";
//configurações do broker
const MQTT_BROKER_HOST= '9d19cc700cc44018b16cc529b323fc9d.s1.eu.hivemq.cloud'
const MQTT_BROKER_PORT= '8883'
const MQTT_USERNAME= 'ricardodias'
const MQTT_PASSWORD= 'TesteSenai1'

//topicos mqtt
const TOPICO_STATUS = 'aulaLed/30/status'
const TOPICO_COMANDO_LED = 'aulaLed/30/estadoLed'
const STATUS_BOIA = 'projeto/30/statusBoia'
const TEMPERATURA = 'projeto/30/temperatura'
const SENSOR_SOLO = 'projeto/30/SENSOR_SOLO'
const CONDICAO_SOLO = 'projeto/30/CONDICAO_SOLO'
const UMIDADE = 'projeto/30/umidade'
let mqttClient;
let subscriptions = {};

//conexao
const mqttOptions = {
    port: MQTT_BROKER_PORT,
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    protocol: 'mqtts',
    reconnectPeriod: 1000,
}

function conectarMqtt() {
    console.log('tentando conectar com mqtt...');
    mqttClient = mqtt.connect(`mqtts://${MQTT_BROKER_HOST}`, mqttOptions);
    mqttClient.on('connect', () => {
        console.log('Conectado ao broker MQTT');
        mqttClient.subscribe(TOPICO_STATUS, (err) => {
            if (!err) {
                console.log(`inscrito no topico ${TOPICO_STATUS}`);
            }
        });
        mqttClient.subscribe(TOPICO_COMANDO_LED, (err) => {
            if (!err) {
                console.log(`inscrito no topico ${TOPICO_COMANDO_LED}`);
            }
        });
        mqttClient.subscribe(STATUS_BOIA, (err) => {
            if (!err) {
                console.log(`inscrito no topico ${STATUS_BOIA}`);
            }
        });
        mqttClient.subscribe(TEMPERATURA, (err) => {
            if (!err) {
                console.log(`inscrito no topico ${TEMPERATURA}`);
            }
        });
        mqttClient.subscribe(UMIDADE, (err) => {
            if (!err) {
                console.log(`inscrito no topico ${UMIDADE}`);
            }
        });
        mqttClient.subscribe(SENSOR_SOLO, (err) => {
            if (!err) {
                console.log(`inscrito no topico ${SENSOR_SOLO}`);
            }
        });
        mqttClient.subscribe(CONDICAO_SOLO, (err) => {
            if (!err) {
                console.log(`inscrito no topico ${CONDICAO_SOLO}`);
            }
        });
    });
    mqttClient.on('message', (topic, message) => {
        // Verificar se existe um tópico na lista de subscriptions (assinaturas)
        if (subscriptions[topic]){
            subscriptions[topic](message.toString());
        }
    })
    mqttClient.on('error', (error) => console.error('Erro de conexão', error));
    mqttClient.on('close', () => console.log('Conexão MQTT fechada'))
}   

// Registrar função de callback para um topico especifico
function onMessage(topic, callback){
    subscriptions[topic] = callback
}

function publicar(topic, message) {
    if (mqttClient && mqttClient.connected){
        mqttClient.publish(topic, message, {retain: true})
        console.log(`Publicado no tópico ${topic}: ${message}`);
    } else {
        console.error('Erro ao publicar, cliente não está conectado');
    }
}

conectarMqtt()
export {onMessage, TOPICO_STATUS, TOPICO_COMANDO_LED, publicar, STATUS_BOIA, TEMPERATURA, SENSOR_SOLO, CONDICAO_SOLO, UMIDADE}