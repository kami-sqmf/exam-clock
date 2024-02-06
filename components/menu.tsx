"use client";
import { Dialog, Switch, Tab, Transition } from '@headlessui/react';
import { Dispatch, Fragment, SetStateAction } from 'react';
import { ConfigWithState, Schedule } from './config';
import { MenuSchedule } from './menu-schedule';
import { MenuTheme } from './menu-theme';

const ToggleButton = ({ state, setState, lable }: { state: boolean, setState: Dispatch<SetStateAction<boolean>>, lable: string; }) => {
  return (
    <div className='flex flex-row space-x-4'>
      <Switch
        checked={state}
        onChange={setState}
        className={`${state ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-12 items-center rounded-full`}
      >
        <span className="sr-only">{lable}</span>
        <span
          className={`${state ? 'translate-x-7' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        ></span>
      </Switch>
      <span>{lable}</span>
    </div>
  )
}

const Menu = ({ isOpen, setIsOpen, config, schedule, className = "" }: { isOpen: boolean; setIsOpen: Dispatch<string>; config: ConfigWithState; schedule: [Schedule[], Dispatch<SetStateAction<Schedule[]>>]; className?: string }) => {
  return (
    <Transition
      show={isOpen}
      enter="transition duration-300 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition duration-300 linear"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      as={Fragment}
    >
      <Dialog onClose={() => setIsOpen("false")} className={className}>
        <div className='fixed inset-0 flex w-screen items-center justify-center p-4 font-noto'>
          <div className={`bg-slate-800 bg-opacity-60 px-6 py-2 text-white/80 rounded-lg shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[4.9px]`}>
            <div className='flex flex-row divide-x-[1.5px] divide-slate-600 min-w-[45vw] min-h-[35vh]'>
              <Tab.Group defaultIndex={1}>
                <Tab.List className='flex flex-col items-center space-y-3 py-4 mr-4 font-semibold [&>*]:min-w-24 [&>*]:px-4 [&>*]:py-0.5'>
                  <Tab className={`rounded text-gray-200 ui-selected:bg-white/85 ui-selected:text-slate-800 transition-all duration-150`}>時鐘設定</Tab>
                  <Tab className={`rounded text-gray-200 ui-selected:bg-white/85 ui-selected:text-slate-800 transition-all duration-150`}>考程設定</Tab>
                  <Tab className={`rounded text-gray-200 ui-selected:bg-white/85 ui-selected:text-slate-800 transition-all duration-150`}>主題設定</Tab>
                </Tab.List>
                <Tab.Panels className='flex flex-col justify-start items-start py-4 [&>*]:ml-5'>
                  <Tab.Panel className={"space-y-2"}>
                    <ToggleButton state={config.hour24[0]} setState={config.hour24[1]} lable='使用 24 小時制' />
                    <ToggleButton state={config.showSeconds[0]} setState={config.showSeconds[1]} lable='顯示秒數' />
                    <div className='space-x-4'>
                      <span>時鐘標題</span>
                      <input className='rounded select-none border-0 px-2 py-0.5 text-slate-800' value={config.get("title")} onChange={(e) => config.set("title", e.target.value)}></input>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel className={``}><MenuSchedule schedule={schedule[0]} setSchedule={schedule[1]} /></Tab.Panel>
                  <Tab.Panel className={"space-y-2"}>
                    <MenuTheme config={config}/>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export { Menu };
