import React from "react";
import Input from "../../FormControll/input";
import { CiSearch } from "react-icons/ci";
function FormforAdmin({ close }) {
  return (
    <div className="h-full flex flex-col  ">
      <div className="flex item-start font-bold justify-between p-5 border-b border-solid rounded-t border-slate-200">
        Search
      </div>
      <div className="h-full p-5 border-b-2 flex flex-col gap-4 relative">
        <Input placeholder="Enter User ID" />
        <CiSearch className="absolute right-10 top-8" />
        <div className="p-2 h-full flex flex-col gap-4">
          <div className="flex justify-evenly border-b border-solid pb-2">
            <h1 className="w-1/2 ">-Application1</h1>
            <button className="bg-zinc-300 hover:bg-zinc-500 hover:text-white rounded-md p-1">
              Approve
            </button>
            <button className="bg-red-100 hover:bg-red-300 hover:text-white rounded-md p-1">
              Reject
            </button>
          </div>
          <div className=" flex justify-evenly border-b border-solid pb-2">
            <h1 className="w-1/2">-Application2</h1>
            <button className="bg-zinc-300 hover:bg-zinc-500 hover:text-white rounded-md p-1">
              Approve
            </button>
            <button className="bg-red-100 hover:bg-red-300 hover:text-white rounded-md p-1">
              Reject
            </button>
          </div>
          <div className=" flex justify-evenly border-b border-solid pb-2">
            <h1 className="w-1/2">-Application3</h1>
            <button className="bg-zinc-300 hover:bg-zinc-500 hover:text-white rounded-md p-1">
              Approve
            </button>
            <button className="bg-red-100 hover:bg-red-300 hover:text-white rounded-md p-1">
              Reject
            </button>
          </div>
        </div>
      </div>
      <div className="h-12 flex items-center justify-center p-2">
        <button
          className="w-24 h-full bg-yellow-500 text-white hover:bg-red-500 rounded-md"
          onClick={() => {
            close(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default FormforAdmin;
