import { useEffect, useState } from "react";

export default function useLocalData(name) {
  const [localData, setLocalData] = useState([]);

  const refetch = () => {
    if (!name) return;

    const storedData = localStorage.getItem(name);

    setLocalData(JSON.parse(storedData));

    console.log(storedData, "....");
  };

  useEffect(() => {
    refetch();
  }, [name]);

  return [localData, refetch];
}
