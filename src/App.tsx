import { useEffect, useState } from "react";
import "./App.css";
import mqtt from "mqtt";
import CaptorsList from "./Components/CaptorsList";
import PrincipalView from "./Components/PrincipalView";
import { saveCaptorData } from "./utils/saveCaptorData";

function App() {
  const [selectedCaptor, setSelectedCaptor] = useState<string | null>(null);

  useEffect(() => {
    const client = mqtt.connect(import.meta.env.VITE_MQTT_URL);

    client.on("connect", () => {
      client.subscribe([
        "/home/temperature",
        "/home/CO",
        "/home/CO2",
        "/home/humidity",
      ]);
    });

    client.on("message", (topic, payload) => {
      const value = parseFloat(payload.toString());

      switch (topic) {
        case "/home/temperature":
          saveCaptorData("Temperature", value);
          break;
        case "/home/humidity":
          saveCaptorData("Humidity", value);
          break;
        case "/home/CO":
          saveCaptorData("CarbonMonoxyde", value);
          break;
        case "/home/CO2":
          saveCaptorData("CarbonDioxyde", value);
          break;
        default:
          break;
      }
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div className="bg-gray-200 w-screen h-screen flex">
      <CaptorsList onSelect={setSelectedCaptor} />
      <PrincipalView selectedCaptor={selectedCaptor} />
    </div>
  );
}

export default App;
