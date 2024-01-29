"use client";
import React from "react";
import Link from "next/link";
import Button from "./button";
import { usePathname, useRouter } from "next/navigation";

function Header() {
  const pathname = usePathname();
  console.log(pathname);

  const router = useRouter();
  function Logout() {
    router.push("/");
  }

  return (
    <div className="flex h-12 items-center justify-between rounded-b-md bg-slate-800 z-10 shadow-md shadow-zinc-400">
      <div className="pl-8  font-bold">
        <Link
          href="/pages/dashboard"
          className="text-lg bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text hover:via-orange-500 hover:to-white"
        >
          Welfare D.board
        </Link>
      </div>
      <div className="flex pr-8 items-center">
        <nav className="flex h-8 gap-3 items-center p-4 list-none">
          <li className=" text-white hover:text-red-400">
            <Link
              href="/pages/data"
              className={`text-sm ${
                pathname === "/pages/data" &&
                "bg-gradient-to-r from-white via-white to-indigo-500 inline-block text-transparent bg-clip-text  border-b border-white "
              }`}
            >
              Data
            </Link>
          </li>
          <li className="  text-white hover:text-red-400">
            <Link
              href="/pages/database"
              className={`text-sm ${
                pathname === "/pages/database" &&
                "bg-gradient-to-r from-white via-white to-indigo-500 inline-block text-transparent bg-clip-text  border-b border-white "
              }`}
            >
              Database
            </Link>
          </li>
        </nav>
        <div>
          <button
            onClick={Logout}
            className="bg-white w-24 text-sm  p-1 rounded-md text-black  hover:bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400"
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
