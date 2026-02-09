import paho.mqtt.client as mqtt
import time
import json
from datetime import datetime
import random

# Configuración del broker
MQTT_BROKER = "mosquitto"  # Nombre del servicio en docker-compose
MQTT_PORT = 1883
MQTT_TOPIC = "sensor/data"
MQTT_CLIENT_ID = "python-publisher"

# Callbacks
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("✅ Conectado al broker MQTT")
    else:
        print(f"❌ Error de conexión. Código: {rc}")

def on_publish(client, userdata, mid):
    print(f"📤 Mensaje publicado (mid: {mid})")

def on_disconnect(client, userdata, rc):
    if rc != 0:
        print("⚠️ Desconexión inesperada. Reconectando...")

# Crear cliente MQTT
client = mqtt.Client(client_id=MQTT_CLIENT_ID)
client.on_connect = on_connect
client.on_publish = on_publish
client.on_disconnect = on_disconnect

# Conectar al broker
print(f"🔄 Conectando a {MQTT_BROKER}:{MQTT_PORT}...")
try:
    client.connect(MQTT_BROKER, MQTT_PORT, 60)
    client.loop_start()
except Exception as e:
    print(f"❌ Error al conectar: {e}")
    exit(1)

# Publicar mensajes continuamente
counter = 0
try:
    while True:
        # Crear payload con datos simulados
        payload = {
            "timestamp": datetime.now().isoformat(),
            "counter": counter,
            "temperature": round(random.uniform(20.0, 30.0), 2),
            "humidity": round(random.uniform(40.0, 80.0), 2),
            "status": "active"
        }
        
        # Publicar mensaje
        message = json.dumps(payload)
        result = client.publish(MQTT_TOPIC, message, qos=1)
        
        if result.rc == mqtt.MQTT_ERR_SUCCESS:
            print(f"📊 Mensaje {counter}: {message}")
        else:
            print(f"⚠️ Error al publicar mensaje {counter}")
        
        counter += 1
        time.sleep(5)  # Enviar cada 5 segundos
        
except KeyboardInterrupt:
    print("\n⏹️ Deteniendo publicador...")
    client.loop_stop()
    client.disconnect()
    print("👋 Desconectado del broker")