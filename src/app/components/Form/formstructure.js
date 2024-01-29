"use client";
import React, { useEffect, useState } from "react";
import Categoryselection from "./FormSegment/categoryselection";
import SelectedForm from "./FormSegment/selectedformoutline";
import FormforAdmin from "./FormSegment/FormforAdmin";
import WellnessForm from "./FormSegment/FormforUser/wellnessForm";
import PersonalEventForm from "./FormSegment/FormforUser/personalEventForm";

const UpdateFormData = {
  user_code: "",
  type: "",
  closed: "N",
  month: "",
  attendants: [],
  hospital_option: "",
};

function Formstructure({ show, setShow, identity, update }) {
  const [updatecategory, setUpdatecategory] = useState("");
  const [updateType, setUpdateType] = useState("");
  const [updateForm, setUpdateForm] = useState(UpdateFormData);
  const [usercode, setUsercode] = useState("");
  const [selectedcategory, setSelectedcategory] = useState("");
  const [updatereq, setUpdatereq] = useState("");
  // console.log("업데이트용", updateForm);
  useEffect(() => {
    if (update && ["H", "E", "T"].some((code) => update.type.includes(code))) {
      setUpdatecategory("AnnualType");
      setUpdateType(update.type);
      setUpdateForm((prevForm) => ({
        ...prevForm,
        user_code: Usercode,
        type: update.type.trim(),
      }));
    }

    const Usercode = localStorage.getItem("usercode");
    if (Usercode) {
      setUsercode(Usercode);
    }
  }, []);

  const handleChildData = (dataFromChild) => {
    // Update parent state with data received from child
    setSelectedcategory(dataFromChild);
  };

  async function handleFetch(endpoint) {
    const res = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateForm),
    });

    const data = await res.json();

    if (data && data.success) {
      setUpdateForm(UpdateFormData);
      window.alert(data.message);
      location.reload();
    } else {
      setUpdateForm(UpdateFormData);
      // window.alert(data.message);
      location.reload();
    }
  }
  async function handleUPDATEannualWelfareData() {
    try {
      let endpoint;

      if (updatereq === "delete") {
        const confirmed = await new Promise((resolve) => {
          const result = window.confirm(
            "Do you want to cancel application? Canceled application is not able to recover."
          );
          if (!result) {
            resolve(false);
            return;
          } else {
            endpoint = "/api/DeleteData";
            resolve(true);
          }
        });
      } else if (updatereq === "update") {
        endpoint = "/api/PartialUpdateData";
      }
      if (endpoint !== undefined) {
        await handleFetch(endpoint);
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  }

  useEffect(() => {
    if (updatereq) {
      handleUPDATEannualWelfareData();
    }
  }, [updatereq]);

  return (
    <>
      {show && identity === "User" && !update ? (
        <div className="absolute left-0 top-0 h-full w-full z-50 outline-none focus:outline-none justify-senter item-center flex backdrop-blur-md backdrop-filter">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg w-96 h-full relative flex flex-col  bg-white outline-none min-h-[680px]">
              {selectedcategory ? (
                <SelectedForm
                  selected={selectedcategory}
                  reset={handleChildData}
                  setShow={setShow}
                  usercode={usercode}
                  update={update}
                />
              ) : (
                //Default Value
                <Categoryselection
                  onChildData={handleChildData}
                  close={setShow}
                />
              )}
            </div>
          </div>
        </div>
      ) : show && identity === "User" && update ? (
        <div className="absolute left-0 top-0 h-full w-full z-50 outline-none focus:outline-none justify-senter item-center flex backdrop-blur-md backdrop-filter">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg w-96 h-full relative flex flex-col  bg-white outline-none min-h-[680px]">
              <div className="h-full flex flex-col  ">
                <div className="flex item-start font-bold justify-between p-5 border-b border-solid rounded-t border-slate-200">
                  <h1>Update the form</h1>
                  <button
                    className="rounded-md bg-black text-white w-14"
                    onClick={() => setShow(false)}
                  >
                    Close
                  </button>
                </div>
                <div className="h-full p-5 border-b-2 flex flex-col gap-4 ">
                  {updatecategory && updatecategory.includes("Annual") ? (
                    <WellnessForm
                      formData={updateForm}
                      setFormData={setUpdateForm}
                      usercode={usercode}
                      updateselectedtype={updateType}
                    />
                  ) : (
                    <PersonalEventForm />
                  )}
                </div>
                <div className="h-12 flex items-center justify-center p-2 gap-4">
                  <button
                    className="w-24 h-full bg-cyan-900 text-white hover:bg-blue-500 rounded-md"
                    onClick={async () => {
                      await setUpdatereq("update");
                      handleUPDATEannualWelfareData();
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="w-24 h-full bg-red-500 text-white hover:bg-blue-500 rounded-md"
                    onClick={async () => {
                      await setUpdatereq("delete");
                      handleUPDATEannualWelfareData();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : show && identity === "Admin" ? (
        <div className="absolute left-0 top-0 h-full w-full z-50 outline-none focus:outline-none justify-senter item-center flex backdrop-blur-md backdrop-filter">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg w-96 h-full relative flex flex-col  bg-white outline-none min-h-[680px]">
              <FormforAdmin close={setShow} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Formstructure;
