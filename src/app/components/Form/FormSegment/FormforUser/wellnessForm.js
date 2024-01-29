import React, { useEffect, useState } from "react";
import { Travel, Health, Education } from "../../formObject";
import Input from "../../FormControll/input";
import Select from "../../FormControll/select";

function WellnessForm({
  initialFormData,
  setFormData,
  formData,
  usercode,
  error,
  updateselectedtype,
}) {
  const [selectedOption, setSelectedOption] = useState(
    updateselectedtype && updateselectedtype.includes("T")
      ? "Travel"
      : updateselectedtype && updateselectedtype.includes("H")
      ? "Health Check"
      : updateselectedtype && updateselectedtype.includes("E")
      ? "Education"
      : ""
  );
  const [showDetails, setShowDetails] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (updateselectedtype) {
      setShowDetails(true);
    }
  }, [updateselectedtype]);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setShowDetails(true); // Show details when an option is selected
    setFormData(initialFormData);
    setFormData({
      ...formData,
      user_code: usercode,
    });
  };

  const items = ["Travel", "Health Check", "Education"];

  return (
    <div className="h-full flex flex-col p-6 gap-4 w-full ">
      {items.map((item) => (
        <div key={item}>
          <label>
            <input
              type="radio"
              value={item}
              checked={selectedOption === item}
              onChange={() => {
                if (!updateselectedtype) {
                  handleOptionChange(item);
                  setFormData((prevData) => ({
                    ...prevData,
                    type:
                      item === "Travel"
                        ? "T"
                        : item === "Health Check"
                        ? "H"
                        : "E",
                  }));
                  setMessage("");
                } else {
                  // updateselectedtype가 true일 때 다른 옵션을 선택하려고 할 때
                  setMessage(
                    "*You cannot change the categories, If you want to change categories, please delete and reapply."
                  );
                }
              }}
            />
            {item}
          </label>
          {showDetails && item === selectedOption && (
            <div className="flex flex-col gap-6 p-4 w-full relative text-sm">
              {item.includes("Travel") ? (
                Travel.map((i) =>
                  i.componentType === "input" ? (
                    <Input
                      key={i.id}
                      placeholder={i.placeholder}
                      label={i.label}
                      id={i.id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [i.id]:
                            i.type === "number"
                              ? parseInt(e.target.value)
                              : i.type === "text-multiple"
                              ? e.target.value.split("/")
                              : e.target.value,
                        })
                      }
                      error={error}
                    />
                  ) : i.componentType === "select" ? (
                    <Select
                      value={formData && formData[i.id]}
                      key={i.id}
                      options={i.options}
                      label={i.label}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [i.id]: e.target.value,
                        })
                      }
                    />
                  ) : null
                )
              ) : item.includes("Health") ? (
                <div className="flex flex-col gap-4 p-2 w-full relative">
                  {Health.map((i) =>
                    i.componentType === "input" ? (
                      <Input
                        key={i.id}
                        placeholder={i.placeholder}
                        label={i.label}
                        id={i.id}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [i.id]: e.target.value,
                          })
                        }
                      />
                    ) : i.componentType === "select" ? (
                      <Select
                        key={i.id}
                        options={i.options}
                        label={i.label}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [i.id]: e.target.value,
                          })
                        }
                      />
                    ) : null
                  )}
                </div>
              ) : item.includes("Education") ? (
                <div className="flex flex-col gap-4 p-2 w-full relative">
                  {Education.map((i) =>
                    i.componentType === "select" ? (
                      <Select
                        key={i.id}
                        options={i.options}
                        label={i.label}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [i.id]: e.target.value,
                          })
                        }
                      />
                    ) : null
                  )}
                </div>
              ) : null}
            </div>
          )}
        </div>
      ))}
      <h1 className="text-red-500">{message}</h1>
    </div>
  );
}

export default WellnessForm;
