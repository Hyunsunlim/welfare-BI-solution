import React, { useState } from "react";
import Formstructure from "./formstructure";

function FormOutline({ children, identity, LoginID, WorkDays }) {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className=" h-full flex flex-col p-10 gap-2 ">
      <div className="flex">
        {identity === "User" ? (
          <>
            <button
              onClick={() => setShowForm(true)}
              className="bg-slate-800 w-32 text-white p-2 rounded-md hover:bg-gray-700"
            >
              {" "}
              {identity === "User" ? "Application" : "Update"}
            </button>
            <div className="flex-1 pl-4 items-center flex flex-col justify-center sm:flex-row sm:justify-start">
              <div className="flex">
                Hello!
                <p className="underline decoration-solid pl-2 pr-2 font-bold">
                  {LoginID}
                </p>
              </div>
              <div className="hidden sm:flex">
                , Your joined days is
                <p className="underline decoration-solid pl-2 pr-2 font-bold">
                  {WorkDays}
                </p>{" "}
                days!
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-red-800 text-lg font-bold pl-2">
            Please complete the review within seven working days.
          </h1>
        )}
      </div>
      <div className={`${showForm ? "hidden" : "flex flex-col"} h-full`}>
        {children}
      </div>

      <Formstructure
        show={showForm}
        setShow={setShowForm}
        identity={identity}
      />
    </div>
  );
}

export default FormOutline;
