import { Dispatch, SetStateAction } from "react";
import { Schedule } from "./config";
import { padZero } from "./clock";

const MenuSchedule = ({ schedule, setSchedule }: { schedule: Schedule[]; setSchedule: Dispatch<SetStateAction<Schedule[]>>; }) => {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-2xl">當日考程</h2>
        <h3>點擊新增考試已新增一項考程，若要編輯已輸入的考程，將鼠標移到欲更改的項目上並點擊即可更改。</h3>
      </div>
      <table className='text-center table-auto w-[100%] text-lg [&>tbody>tr]:align-text-top [&>tbody>tr>td:last-child]:w-max [&>*>*>*]:border-[1.5px] [&>*>*>*]:border-collapse'>
        <thead>
          <tr>
            <th>開始時間</th>
            <th>結束時間</th>
            <th>考試名稱</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item) => (
            <tr key={item.index}>
              <td className="hover:bg-white/25 transition-all duration-300 has-[:focus]:bg-white/45"><input type="time" value={item.startTimestamp} onChange={(e) => {
                let time = timeStrToInt(e.target.value);
                setSchedule(schedule.map((v) =>
                  v.index === item.index ? { ...v, startTimestamp: e.target.value, endTimestamp: `${padZero((time + 70) / 60)}:${padZero((time + 70) % 60)}` } : { ...v }
                ))
              }} className="focus:text-white bg-transparent text-center outline-none" /></td>
              <td className="hover:bg-white/25 transition-all duration-300 has-[:focus]:bg-white/45"><input type="time" value={item.endTimestamp} onChange={(e) => {
                setSchedule(schedule.map((v) =>
                  v.index === item.index ? { ...v, endTimestamp: e.target.value } : { ...v }
                ))
              }} className="focus:text-white bg-transparent text-center outline-none" /></td>
              <td className="hover:bg-white/25 transition-all duration-300 has-[:focus]:bg-white/45"><input type="text" value={item.text} onChange={(e) => {
                setSchedule(schedule.map((v) =>
                  v.index === item.index ? { ...v, text: e.target.value } : { ...v }
                ))
              }} className="focus:text-white bg-transparent text-center outline-none" /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='space-x-2 ml-4 mt-2' onClick={() => {
        let time = timeStrToInt(schedule[schedule.length - 1].endTimestamp);
        setSchedule([...schedule, {
          startTimestamp: `${padZero((time + 15) / 60)}:${padZero((time + 15) % 60)}`,
          endTimestamp: `${padZero((time + 85) / 60)}:${padZero((time + 85) % 60)}`,
          text: "",
          index: schedule.length,
        }])
      }}>
        <span>+</span>
        <span>新增考試</span>
      </button>
    </>
  )
}

const timeStrToInt = (timeStr: string) => {
  const lastEnd = timeStr.split(":").map((v) => parseInt(v));
  return lastEnd[0] * 60 + lastEnd[1];
}

export { MenuSchedule, timeStrToInt };