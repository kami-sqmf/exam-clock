import { Dispatch, SetStateAction } from "react";
import { ConfigWithState, Schedule } from "./config";
import { padZero } from "./clock";
import Image from "next/image";

const MenuTheme = ({ config }: { config: ConfigWithState; }) => {
  return (
    <>
      <div className='flex space-x-3 items-center'>
        <button className="bg-gray-700 rounded py-1 px-2" onClick={() => config.set("theme", { ...config.get("theme"), size: config.get("theme").size - 0.2 })}>小</button>
        <span className="text-xl">字體大小</span>
        <button className="bg-gray-700 rounded py-1 px-2" onClick={() => config.set("theme", { ...config.get("theme"), size: config.get("theme").size + 0.2 })}>大</button>
      </div>
      {/* <div className='space-x-2'>
        <span>字體顏色</span>
      </div> */}
      <div className=''>
        <span className="text-xl">背景圖片</span>
        <div className="mt-4">
          <span className="text-base">預設圖片</span>
          <div className="grid grid-flow-row grid-cols-4 gap-4 mt-2">
            <div onClick={() => { config.theme[1]({ ...config.theme[0], background: "/bg-0.jpg" }) }}><Photo isActive={config.theme[0].background == "/bg-0.jpg"} url={"/bg-0.jpg"} /></div>
            <div onClick={() => { config.theme[1]({ ...config.theme[0], background: "/bg-1.jpg" }) }}><Photo isActive={config.theme[0].background == "/bg-1.jpg"} url={"/bg-1.jpg"} /></div>
            <div onClick={() => { config.theme[1]({ ...config.theme[0], background: "/bg-2.jpg" }) }}><Photo isActive={config.theme[0].background == "/bg-2.jpg"} url={"/bg-2.jpg"} /></div>
            <div onClick={() => { config.theme[1]({ ...config.theme[0], background: "/bg-3.jpg" }) }}><Photo isActive={config.theme[0].background == "/bg-3.jpg"} url={"/bg-3.jpg"} /></div>
          </div>
        </div>
        {/* <div className="mt-2">
          <span className="text-base">Unsplash 圖片</span>
          <div className="grid grid-flow-row grid-cols-4 gap-4 mt-2">
            <div onClick={() => { config.theme[1]({ ...config.theme[0], background: "/bg-0.jpg" }) }}><Photo isActive={config.theme[0].background == "/bg-0.jpg"} url={"/bg-0.jpg"} /></div>
            <div onClick={() => { config.theme[1]({ ...config.theme[0], background: "/bg-1.jpg" }) }}><Photo isActive={config.theme[0].background == "/bg-1.jpg"} url={"/bg-1.jpg"} /></div>
            <div onClick={() => { config.theme[1]({ ...config.theme[0], background: "/bg-2.jpg" }) }}><Photo isActive={config.theme[0].background == "/bg-2.jpg"} url={"/bg-2.jpg"} /></div>
            <div onClick={() => { config.theme[1]({ ...config.theme[0], background: "/bg-3.jpg" }) }}><Photo isActive={config.theme[0].background == "/bg-3.jpg"} url={"/bg-3.jpg"} /></div>
          </div>
        </div> */}
      </div>
    </>
  )
}

const Photo = ({ url, isActive }: { url: string, isActive: boolean }) => (
  <Image src={url} alt="背景圖片"
    quality={100}
    width={320}
    height={180}
    data-headlessui-state={isActive ? "active" : ""}
    className="rounded-xl drop-shadow ui-active:ring-slate-400 ui-active:ring-4 ui-active:drop-shadow-2xl hover:drop-shadow-2xl hover:ring-blue-400 hover:ring-[3px] object-cover transition-all duration-300"
  />
)

export { MenuTheme };