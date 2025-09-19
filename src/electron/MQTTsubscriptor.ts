import mqtt from 'mqtt';
import { BrowserWindow } from 'electron';

const client = mqtt.connect('mqtt://localhost:1883');

export function MQTTmessage(mainWindow: BrowserWindow){
  client.on('message', (topic,message) => {
    const strigMenssage = message.toString();
    mainWindow.webContents.send("temperature", {
      topic,
      strigMenssage,
    });
  });
}



client.on('connect', () => {
  console.log('Conexion establecida');
  client.subscribe('casa/habitacion1/temperatura');
});

