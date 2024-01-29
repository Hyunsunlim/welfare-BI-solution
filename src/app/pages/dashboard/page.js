"use client";

import { useState } from "react";

import Part1 from "@/app/components/part1_board/part1";
import Part2 from "@/app/components/part2_board/part2";
import Part3 from "@/app/components/part3_board/part3";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState("3中1");

  const handleOptionChange = (newOption) => {
    setSelectedOption(newOption);
  };

  return (
    <div className=" bg-zinc-50 h-auto w-full flex flex-col sm:flex-row sm:h-full p-2 min-h-[750px]">
      <div className="w-full h-screen sm:h-full sm:w-1/4 p-2 sm:border-r-2 sm:rounded-md  min-h-[700px]">
        <Part1 onOptionChange={handleOptionChange} />
      </div>
      <div className="w-full h-screen sm:h-full sm:w-2/4 p-2 sm:border-r-2 sm:rounded-md sm:border-t-0 border-t-2 min-h-[700px]">
        <Part2 selectedOption={selectedOption} />
      </div>
      <div className=" w-full h-screen sm:h-full sm:w-1/4 p-2 border-t-2 sm:border-t-0 min-h-[700px]">
        <Part3 />
      </div>
    </div>
  );
}
