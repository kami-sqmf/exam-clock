const Footer = ({ idleState, menuOpen, className = "" }: { idleState: boolean; menuOpen: boolean; className?: string }) => {
  return (
    <>
      <div className={`${idleState && !menuOpen ? "opacity-0" : "opacity-85"} ${className} transition-all duration-800 flex items-end justify-end w-screen mb-6 pr-8 font-courierPrime font-[700] text-white text-sm space-x-1`}>
        {!menuOpen ? <>
          <span className="px-1.5 pt-[1px] pb-[0.3px] border border-white rounded">Crtl</span>
          <span>+</span>
          <span className="px-1.5 pt-[1px] pb-[0.3px] border border-white rounded">S</span>
          <span className="!ml-2 font-noto text-base font-[500]">開啟設定</span>
        </> : <>
          <span className="px-1.5 pt-[1px] pb-[0.3px] border border-white rounded">esc</span>
          <span className="!ml-2 font-noto text-base font-[500]">關閉設定</span>
        </>}
      </div>
      <span className="z-10 fixed bottom-0 block px-2 w-screen text-right text-sm font-light text-black/5">©2024 Kamisqmf</span>

    </>
  )
}

export { Footer };