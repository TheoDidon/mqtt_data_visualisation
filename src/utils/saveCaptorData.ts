import { Timestamp, doc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

export const saveCaptorData = async (type: string, value: number) => {
  try {
    const docRef = doc(db, "captors_data", type);

    await setDoc(
      docRef,
      {
        values: arrayUnion({
          value,
          timestamp: Timestamp.now(),
        }),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Erreur Firebase :", error);
  }
};
