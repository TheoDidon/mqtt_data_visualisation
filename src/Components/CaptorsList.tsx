import Captor from "./Captor";

interface Props {
  onSelect: (name: string) => void;
}

function CaptorsList({ onSelect }: Props) {
  const captorList: string[] = [
    "Accueil",
    "Température",
    "Monoxyde de Carbone",
    "Dioxyde de Carbone",
    "Humidité",
  ];

  return (
    <div className="flex flex-col max-h-[100vh] bg-white rounded-2xl m-3">
      <h3 className="font-bold m-3 mr-1.5 text-2xl p-4">Liste de capteurs</h3>
      {captorList.map((element, key) => (
        <div key={key} onClick={() => onSelect(element)}>
          <Captor key={key} name={element} />
        </div>
      ))}
    </div>
  );
}

export default CaptorsList;
