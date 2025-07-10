import { useCallback, useEffect, useState } from "react";

export default function useLocalData(name) {
  const [data, setData] = useState([]);

  const refetch = useCallback(() => {
    if (!name) return;

    try {
      const stored = localStorage.getItem(name);
      if (stored) {
        setData(JSON.parse(stored));
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Failed to parse localStorage data", err);
      setData([]);
    }
  }, [name]);

  const setValue = useCallback(
    (newValue) => {
      try {
        localStorage.setItem(name, JSON.stringify(newValue));
        setData(newValue);
      } catch (err) {
        console.error("Failed to set localStorage data", err);
      }
    },
    [name]
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return [data, refetch, setValue];
}
