import CaptorData from "./CaptorData";
import MqttStatus from "./MqttStatus";

interface Props {
  selectedCaptor: string | null;
}

function PrincipalView({ selectedCaptor }: Props) {
  const renderCaptorView = () => {
    switch (selectedCaptor) {
      case "Acceuil":
        return <MqttStatus />;
      case "Température":
        return <CaptorData name="Temperature" title="Température" />;
      case "Monoxyde de Carbone":
        return <CaptorData name="CarbonMonoxyde" title="Monoxyde de carbone" />;
      case "Dioxyde de Carbone":
        return <CaptorData name="CarbonDioxyde" title="Dioxyde de carbone" />;
      case "Humidité":
        return <CaptorData name="Humidity" title="Humidité" />;
      default:
        return <MqttStatus />;
    }
  };

  return <div className="flex-1 m-3 ml-1.5">{renderCaptorView()}</div>;
}

export default PrincipalView;
