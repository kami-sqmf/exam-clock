/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useReducer, useRef, useState } from "react";
import { Clock, getCurrentTime } from "./clock";
import { ConfigWithState, Schedule, Theme } from "./config";
import { Menu } from "./menu";
import Image from "next/image";
import { Footer } from "./footer";
import { timeStrToInt } from "./menu-schedule";
import { useLocalStorageB64 } from "./useLocalStorage";

function menuReducer(state: boolean, action: string) {
  switch (action) {
    case 'toggle': {
      return !state
    }
    case 'true': {
      return true
    }
    case 'false': {
      return false
    }
    default: {
      return state;
    }
  }
}

const MainWrapper = ({ timestamp }: { timestamp: EpochTimeStamp }) => {
  const config: ConfigWithState = {
    get(key) { return this[key][0]; },
    set(key, value) { this[key][1](value as any); return null; },
    theme: useLocalStorageB64('theme', {
      background: "/bg-0.jpg",
      color: "black",
      size: 1,
      textSize: 1,
    }),
    title: useLocalStorageB64('title', "考試時鐘"),
    hour24: useLocalStorageB64('hour24', true),
    showSeconds: useLocalStorageB64('showSeconds', true),
  }
  const [time, setTime] = useState<number>(0);
  const schedule = useLocalStorageB64<Schedule[]>("schedule", [
    {
      "index": 0,
      "text": "生物",
      "startTimestamp": "08:10",
      "endTimestamp": "09:20"
    },
    {
      "index": 1,
      "text": "國文",
      "startTimestamp": "09:45",
      "endTimestamp": "10:35"
    },
  ])
  // console.log(schedule[0])
  const idleState = useRef<boolean>(true);
  const [isIdle, setIsIdle] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useReducer(menuReducer, false);
  useEffect(() => {
    const idleDetect = setInterval(() => {
      idleState.current = !idleState.current;
      if (isIdle == idleState.current) setIsIdle(true);
    }, 3000)
    return () => clearInterval(idleDetect);
  }, [])
  useEffect(() => {
    const idleHandler = (e: KeyboardEvent | MouseEvent) => {
      setIsIdle(false)
      if (e.type == "keydown") {
        e = e as KeyboardEvent;
        if ((e.ctrlKey == true || e.metaKey == true) && e.key == 's' && e.shiftKey == false) {
          e.preventDefault();
          setShowMenu("toggle");
        } else if (e.key == 'Escape') { setShowMenu("false"); }
      }
    }
    document.addEventListener("keydown", idleHandler);
    document.addEventListener("mousemove", idleHandler);
    return () => {
      document.removeEventListener("keydown", idleHandler);
      document.removeEventListener("mousemove", idleHandler);
    };
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      let [hour, minute] = getCurrentTime();
      setTime(hour * 60 + minute);
    }, 1000);
    return () => clearInterval(timer)
  }, [])
  return (
    <div className="relative bg-black">
      <main className={`z-40 w-screen h-screen flex flex-col items-center font-mono`}>
        <h1 className={`${isIdle ? "opacity-45" : "opacity-100"} transition-all duration-1000 text-white font-noto`}>{config.get("title")}<title>{config.get("title")}</title></h1>
        <div className="relative mx-auto w-max h-max z-40 mt-12 text-white grid grid-cols-1">
          <div className="flex flex-row" style={{ height: `${105 * config.get("theme").size}px` }}>
            <div className="flex flex-col relative items-center space-y-2 pt-6 mr-3 ml-3 opacity-35">
              <div className="w-1.5 h-1.5 rounded-full border border-gray-300 bg-gray-200"></div>
              <div className="w-1 h-[40%] rounded-full border border-gray-300 bg-gray-200"></div>
              <div className="w-2 h-2 rounded-full border border-gray-300 bg-gray-200"></div>
              <div className="w-1 h-[10%] rounded-full border border-gray-300 bg-gray-200"></div>
            </div>
            <div className="flex flex-col">
              {schedule[0].filter(v => timeStrToInt(v.startTimestamp) <= time).slice(-2).map((item) => {
                if (timeStrToInt(item.endTimestamp) > time)
                  return (<span className={`${isIdle ? "opacity-85" : "opacity-100"} font-[700] font-noto animate-pulse`} style={{ fontSize: `${36 * config.get("theme").textSize}px` }}>目前：{item.text} {item.startTimestamp}-{item.endTimestamp}</span>)
                else
                  return (<span key={item.index} className={`${isIdle ? "opacity-35" : "opacity-65"} font-[500] font-noto`} style={{ fontSize: `${34 * config.get("theme").textSize}px` }}>{item.text} {item.startTimestamp}-{item.endTimestamp}</span>)
              })}
            </div>
          </div>
          <Clock className={"h-min overflow-hidden"} timestamp={timestamp} config={config} />
          <div className="flex flex-row">
            <div className="flex flex-col relative items-center mr-3 ml-3 opacity-35">
              {schedule[0].filter(v => timeStrToInt(v.startTimestamp) > time).map((e, index, arr) => {
                return (
                  <div key={index}>
                    {index == 0 ? <Line height={12} size={config.get("theme").size} /> : <Line height={24} size={config.get("theme").size} />}
                    <Dot className="" />
                  </div>
                )
              })}
            </div>
            <div className="flex flex-col">
              {schedule[0].filter(v => timeStrToInt(v.startTimestamp) > time).map((item, key) => {
                return (<span key={item.index} className={`${isIdle ? "opacity-35" : "opacity-65"} font-[500] font-noto`} style={{ fontSize: `${34 - (key * 1.5) * config.get("theme").textSize}px` }}>{item.text} {item.startTimestamp}-{item.endTimestamp}</span>)
              })}
            </div>
          </div>
        </div>
        <Footer className="fixed bottom-0 z-20"
          idleState={isIdle}
          menuOpen={showMenu}
        />
      </main>
      <Image className={`${isIdle ? "opacity-55" : "opacity-65"} transition-all duration-300 z-0 object-cover select-none object-center`}
        src={config.get("theme").background} quality={100} fill sizes="100vw"
        draggable="false" alt="Background Image"
      />
      <Menu className="relative z-50"
        isOpen={showMenu} setIsOpen={setShowMenu} config={config} schedule={schedule}
      />
    </div>
  )
}

const Line = ({ height, size }: { height: number; size: number }) => (
  <div className={`w-1 rounded-full border border-gray-300 bg-gray-200`} style={{ height: `${height * size}px`, marginTop: `${8}px`, marginBottom: `${8}px` }}></div>
);

const Dot = ({ className = "" }: { className?: string }) => (
  <div className={`${className} w-1.5 h-1.5 rounded-full border border-gray-300 bg-gray-200`}></div>
);

export { MainWrapper };
