/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export function useLocalStorageB64<T>(key: string, fallbackValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(fallbackValue);
  const didRead = useRef(false);
  useEffect(() => {
    if (didRead.current) return;
    let decoded = null;
    const stored = localStorage.getItem(key);
    if (stored) decoded = JSON.parse(Buffer.from(stored, 'base64').toString("utf8"));
    setValue(decoded ? decoded : fallbackValue);
    didRead.current = true;
  }, []);

  useEffect(() => {
    if (!didRead.current) return;
    localStorage.setItem(key, Buffer.from(JSON.stringify(value)).toString("base64"));
    console.log(value)
  }, [value]);

  return [value, setValue];
}