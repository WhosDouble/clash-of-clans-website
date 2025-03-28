import Image from "next/image";
import Search from "./components/search";

export default function Home() {
  return (
    <div>
      <div className="container flex flex-col items-center justify-center">
        <h1 className="text-4xl">Clash of Clans Website</h1>
        <p className="text-[#ffffff93]">search for coc stats</p>
      </div>
      <Search />
    </div>
  );
}
