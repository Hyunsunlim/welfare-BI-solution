"use client";
import Loginform from "../components/login/loginform";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loginid, setLoginid] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLoginButtonClick = async () => {
    // console.log("Sending request with username:", loginid);
    // console.log("Sending request with password:", password);
    try {
      const res = await fetch("/api/LoginData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginid: loginid,
          password: password,
        }),
      });

      const data = await res.json();

      const jobDate = new Date(data.user_Info.Job_Date);
      const currentDate = new Date();
      const differenceInMilliseconds = currentDate - jobDate;
      const differenceInDays = Math.floor(
        differenceInMilliseconds / (1000 * 60 * 60 * 24)
      );
      console.log(data.user_Info);
      if (data.success) {
        router.push("/pages/data");
        localStorage.setItem("loginID", loginid);
        localStorage.setItem("username", data.user_Info.ADMIN_NAME);
        localStorage.setItem("usercode", data.user_Info.code);
        localStorage.setItem("workedDays", differenceInDays);
        localStorage.setItem("role", data.user_Info.role);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("An error occurred during the fetch operation", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div className="absolute left-0 top-0 flex items-center justify-center bg-white h-screen w-screen overflow-hiddenjustify-center z-50">
      <div className="relative">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36 bg-gradient-to-r from-blue-600 via-white to-indigo-400">
          <div className="w-32 text-white md:w-36 ">Logo</div>
        </div>
        <Loginform
          loginid={loginid}
          setLoginid={setLoginid}
          setPassword={setPassword}
          password={password}
          onClick={handleLoginButtonClick}
        />
      </div>
    </div>
  );
}
