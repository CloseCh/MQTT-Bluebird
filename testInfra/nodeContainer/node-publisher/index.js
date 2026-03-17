import {
  publishASCII,
  publishJSON, 
  publishNumeric, 
  publishHex
} from './src/publisher.js'

function startPublishing() {
  console.log('Iniciando publicación de mensajes...\n');

  setInterval(publishASCII,   3000);
  setInterval(publishJSON,    5000);
  setInterval(publishNumeric, 15000);
  setInterval(publishHex,     4000);

  publishASCII();
  publishJSON();
  publishNumeric();
  publishHex();
}

startPublishing();