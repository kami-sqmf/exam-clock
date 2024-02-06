import { Dispatch, SetStateAction } from "react";

interface ConfigValues {
  theme: [Theme, Dispatch<SetStateAction<Theme>>];
  title: [string, Dispatch<SetStateAction<string>>];
  hour24: [boolean, Dispatch<SetStateAction<boolean>>];
  showSeconds: [boolean, Dispatch<SetStateAction<boolean>>];
}

interface ConfigWithState extends ConfigValues {
  get: <K extends keyof ConfigValues>(key: K) => ConfigValues[K][0];
  set: <K extends keyof ConfigValues>(key: K, value: ConfigValues[K][0]) => null;
}

type Theme = {
  size: number;
  color: string;
  background: string;
}

type Schedule = {
  text: string;
  index: number;
  startTimestamp: string;
  endTimestamp: string;
}