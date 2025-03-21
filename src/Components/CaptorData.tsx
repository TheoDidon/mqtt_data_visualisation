import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { format } from "date-fns";

interface Props {
  name: string;
  title: string;
}

function CaptorData({ name, title }: Props) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "captors_data", `${name}`),
      (docSnap) => {
        if (docSnap.exists()) {
          const values = docSnap.data()?.values || [];
          const formattedData = values.map((entry: any, index: number) => ({
            time:
              format(new Date(entry.timestamp?.seconds * 1000), "HH:mm") ||
              index,
            value: entry.value,
          }));
          setData(formattedData);
        } else {
          console.log("Document non trouvé");
        }
      }
    );

    return () => unsubscribe();
  }, [data]);

  console.log(data);

  return (
    <div className="flex-col p-6 bg-white rounded-2xl h-full">
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      <div className="w-full max-w-2xl mx-auto">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CaptorData;
