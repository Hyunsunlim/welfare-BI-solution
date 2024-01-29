"use client";
import React, { useEffect, useState } from "react";
import WellnessForm from "./FormforUser/wellnessForm";
import PersonalEventForm from "./FormforUser/personalEventForm";

const initialFormData = {
  user_code: "",
  type: "",
  closed: "N",
  month: "",
  attendants: [],
  hospital_option: "",
};

function SelectedForm({ selected, reset, usercode }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errormessage, setErrormessage] = useState(null);

  async function handleAddannualWelfareData() {
    const res = await fetch("/api/AddData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data && data.success) {
      setFormData(initialFormData);
      window.alert("Form submitted successfully!");
      location.reload();
    } else if (data.errortype) {
      setErrormessage({ type: data.errortype, message: data.message });
    } else {
      setFormData(initialFormData);
      window.alert(data.message);
      location.reload();
    }
  }

  return (
    <div className="h-full flex flex-col  ">
      <div className="flex item-start font-bold justify-between p-5 border-b border-solid rounded-t border-slate-200">
        {selected}
        <button
          onClick={() => reset("")}
          className="rounded-md bg-black text-white w-14"
        >
          Back
        </button>
      </div>
      <div className="h-full p-5 border-b-2 flex flex-col gap-4 ">
        {selected.includes("Annual") ? (
          <WellnessForm
            initialFormData={initialFormData}
            formData={formData}
            setFormData={setFormData}
            usercode={usercode}
            error={errormessage}
          />
        ) : selected.includes("Condition") ? (
          <PersonalEventForm />
        ) : null}
      </div>
      <div className="h-12 flex items-center justify-center p-2">
        <button
          className="w-24 h-full bg-cyan-900 text-white hover:bg-blue-500 rounded-md"
          onClick={handleAddannualWelfareData}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default SelectedForm;
