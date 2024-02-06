import { MainWrapper } from "@/components/main-wrapper";

export default function Home() {
  return (
    <MainWrapper timestamp={new Date().getTime()} />
  );
}
