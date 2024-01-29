"use client";
import React from "react";

function Loginform({ onClick, loginid, password, setLoginid, setPassword }) {
  return (
    <div className=" bg-blue-400 flex items-center justify-center">
      <form
        // onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h1 className="w-full h-12 font-bold text-lg flex items-center  mb-6">
          Login
        </h1>
        <label className="block mb-4 text-sm">
          User ID
          <input
            type="text"
            value={loginid}
            onChange={(e) => setLoginid(e.target.value)}
            className="w-full border-b-2 border-black p-2"
          />
        </label>
        <label className="block mb-4 text-sm">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b-2 border-black p-2"
          />
        </label>
        <button
          onClick={() => onClick()}
          type="button"
          className="bg-gray-500 text-white p-2 rounded hover:bg-slate-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Loginform;
