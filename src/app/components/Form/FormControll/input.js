import React from "react";

function Input({ placeholder, value, onChange, label, id, error }) {
  return (
    <>
      <div>
        <label
          htmlFor={id}
          className="pt-0 pr-2 pb-0 pl-2 absolute  -mt-3 mb-0 ml-2 font-medium text-gray-600 bg-white"
        >
          {label}
        </label>
        <input
          id={id}
          className="border placeholder-gray-400 focus:outline-none w-full p-2 m-0 text-base bg-white rounded-md"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
        {error && error.type === id ? (
          <p className="text-red-500">{error.message}</p>
        ) : null}
      </div>
    </>
  );
}

export default Input;
