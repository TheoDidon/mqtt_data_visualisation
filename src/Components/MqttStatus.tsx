import { useEffect, useRef, useState } from "react";
import mqtt, { MqttClient } from "mqtt";

function MqttStatus() {
  const [message, setMessage] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const client = useRef<MqttClient | null>(null);

  useEffect(() => {
    const mqttClient: MqttClient = mqtt.connect(import.meta.env.VITE_MQTT_URL);

    client.current = mqttClient;

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      setIsConnected(true);

      mqttClient.subscribe("/home/messages");
    });

    mqttClient.on("message", (topic, payload) => {
      const msg = payload.toString();
      console.log(`message received on ${topic}: ${msg}`);
      setMessage(msg);
    });

    mqttClient.on("error", (err) => {
      console.error("MQTT error:", err);
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  return (
    <div className="flex-col p-6 bg-white rounded-2xl h-full">
      <h1 className="text-2xl font-bold text-green-600 mb-4">MQTT Demo</h1>
      <p>Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}</p>
      <p className="mt-2">
        Last message:{" "}
        <span className="font-mono text-blue-600">{message || "—"}</span>
      </p>
    </div>
  );
}

export default MqttStatus;
