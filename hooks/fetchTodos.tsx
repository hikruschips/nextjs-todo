import { useAuthContext } from "@/context/AuthContext";
import { database } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export default function useFetchTodos() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [todos, setTodos] = useState([] as string[]);
  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(database, "users", user!.uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        if (docSnap.exists()) {
          setTodos(docSnap.data().todos);
        }
      } catch (err) {
        setError("Failed to load todos");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { loading, error, todos, setTodos };
}
