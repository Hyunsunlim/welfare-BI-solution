"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Autholization({ children }) {
  const router = useRouter();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(true);
  // Check if the user is logged in
  useEffect(() => {
    if (!userIsLoggedIn) {
      router.push("/login");
      console.log("로그인된건가?");
    }
  }, [router]);

  return <>{children}</>;
}

export default Autholization;
