/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { ConfigWithState } from "./config";

const Clock = ({ timestamp, config, className }: { timestamp: EpochTimeStamp, config: ConfigWithState; className?: string }) => {
  let [hour, minute, second] = getCurrentTime(timestamp);
  const [isPM, setIsPM] = useState(checkPM(hour));
  const [h1, setH1] = useState<string>(padZero(hour)[0]);
  const [h2, setH2] = useState<string>(padZero(hour)[1]);
  const [m1, setM1] = useState<string>(padZero(minute)[0]);
  const [m2, setM2] = useState<string>(padZero(minute)[1]);
  const [s1, setS1] = useState<string>(padZero(second)[0]);
  const [s2, setS2] = useState<string>(padZero(second)[1]);
  useEffect(() => {
    const timer = setInterval(() => {
      [hour, minute, second] = getCurrentTime();
      const tmpIsPm = checkPM(hour);
      if (tmpIsPm != isPM) setIsPM(tmpIsPm);
      const tmpH1 = padZero(hour)[0];
      if (tmpH1 != h1) setH1(tmpH1);
      const tmpH2 = padZero(hour)[1];
      if (tmpH2 != h2) setH2(tmpH2);
      const tmpM1 = padZero(minute)[0];
      if (tmpM1 != m1) setM1(tmpM1);
      const tmpM2 = padZero(minute)[1];
      if (tmpM2 != m2) setM2(tmpM2);
      const tmpS1 = padZero(second)[0];
      if (tmpS1 != s1) setS1(tmpS1);
      setS2(padZero(second)[1]);
    }, 1000);
    return () => clearInterval(timer)
  }, [])
  return (
    <time className={`${className} font-mono font-[700] text-white [&>span]:drop-shadow-2xl `} style={{ fontSize: `${225 * config.get("theme").size}px`, marginTop: `${-72 * config.get("theme").size}px`, marginBottom: `${-72 * config.get("theme").size}px` }}>
      {!config.get("hour24") && <span className="mr-8">{isPM ? "PM" : "AM"}</span>}
      <span>{config.get("hour24") ? h1 : padZero(Math.abs(parseInt(h1 + h2) - (parseInt(h1 + h2) > 12 || parseInt(h1 + h2) == 0 ? 12 : 0)))[0]}</span>
      <span>{config.get("hour24") ? h2 : padZero(Math.abs(parseInt(h1 + h2) - (parseInt(h1 + h2) > 12 || parseInt(h1 + h2) == 0 ? 12 : 0)))[1]}</span>
      <span>:</span>
      <span>{m1}</span>
      <span>{m2}</span>
      {config.get("showSeconds") && <>
        <span>:</span>
        <span>{s1}</span>
        <span>{s2}</span>
      </>}
    </time>
  )
}

export { Clock, padZero, getCurrentTime };

const padZero = (num: number) => Math.floor(num).toString().padStart(2, '0');
const getCurrentTime = (timestamp?: EpochTimeStamp) => {
  const date = timestamp ? new Date(timestamp) : new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [hour, minute, second];
}
const checkPM = (hour: number) => hour >= 12;