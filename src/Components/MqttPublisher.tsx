import { useEffect, useState } from "react";
import mqtt, { MqttClient } from "mqtt";

function MqttPublisher() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [client, setClient] = useState<MqttClient | null>(null);
  const [inputMessage, setInputMessage] = useState<string>("");

  useEffect(() => {
    const mqttClient: MqttClient = mqtt.connect(
      "wss://test.mosquitto.org:8081"
    );
    setClient(mqttClient);

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      setIsConnected(true);

      mqttClient.subscribe("/home/messages");
    });

    mqttClient.on("error", (err) => {
      console.error("MQTT error:", err);
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  const handlePublish = () => {
    if (client && isConnected && inputMessage.trim() !== "") {
      client.publish("/home/messages", inputMessage);
      setInputMessage("");
    }
  };

  return (
    <>
      <label className="block text-sm font-medium">
        Send a message to <code>/home/messages</code> :{" "}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-1 flex-1"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button
          onClick={handlePublish}
          className="bg-green-400 hover:bg-green-700 text-white font-semibold px-4 py-1 rounded"
        >
          Publish
        </button>
      </div>
    </>
  );
}

export default MqttPublisher;
