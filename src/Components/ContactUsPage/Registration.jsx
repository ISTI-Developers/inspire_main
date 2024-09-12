import React, { useEffect, useState } from "react";
import useRegistration from "../../Context/RegistraionContext";
import { Button, Checkbox, Label, Radio, TextInput } from "flowbite-react";
import { useParams } from "react-router-dom";
import usePrograms from "../../Context/ProgramsContext";

function Registration() {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const { retrieveProgram } = usePrograms();
  const { insertRegistration } = useRegistration();
  const [isSameUser, setSameUser] = useState(false);
  const [user, setUser] = useState({
    registration_type: "",
    first_name: "",
    last_name: "",
    email_address: "",
    mobile_number: "",
    ref_name: "",
    tin_num: "",
    source_platform: "",
    program_id: "",
  });
  const registration = async (e) => {
    e.preventDefault();
    if (Object.values(user).every((value) => value === "")) {
      alert("Please fill in all the required fields.");
      return;
    }
    user.program_id = id;
    const response = await insertRegistration(
      user.registration_type,
      user.first_name,
      user.last_name,
      user.email_address,
      user.mobile_number,
      user.ref_name,
      user.tin_num,
      user.source_platform,
      user.program_id
    );
    alert(response);
    setUser((prev) => {
      const newState = {};
      Object.keys(prev).forEach((key) => {
        newState[key] = "";
      });
      return newState;
    });
  };

  const capitalize = (string) => {
    let temp = string.split("_");

    temp = temp.map((t) => {
      t = t.toLowerCase();
      return t.substring(0, 1).toUpperCase() + t.slice(1);
    });

    return temp.join(" ");
  };

  useEffect(() => {
    const setup = async () => {
      const result = await retrieveProgram(id);
      setProgram(result);
    };
    setup();
  }, []);
  return (
    program && (
      <div className="flex justify-center items-center min-h-screen py-10">
        <div className="bg-white p-8 rounded-3xl shadow-lg border max-w-3xl w-full md:px-20 flex flex-col gap-4">
          <div className="text-center text-red-600 text-2xl font-bold">
            REGISTRATION
          </div>
          {/* Type of Registration */}
          <div className="space-y-2">
            <p className="font-semibold">
              Program Selected:{" "}
              <span className="font-normal underline">{program.title}</span>
            </p>
            <p className="font-medium text-black">Registration Type</p>
            <div className="flex gap-4 ">
              {["Personal", "Company (Individual)", "Company (Group)"].map(
                (option) => {
                  return (
                    <div
                      className="flex items-center justify-center gap-2"
                      key={option}
                    >
                      <input
                        type="radio"
                        value={option}
                        name="registration_type"
                        id={option}
                        className="peer hidden"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUser((prev) => {
                              return {
                                ...prev,
                                registration_type: e.target.value,
                              };
                            });
                          }
                        }}
                        required
                      />
                      <label
                        htmlFor={option}
                        className="border-4 p-3 py-2 select-none rounded-lg font-semibold cursor-pointer transition-all hover:text-white hover:border-[#a7242469] hover:bg-[#a72424ab] text-gray-800 peer-checked:border-[#a72424] peer-checked:bg-[#a72424] peer-checked:text-white"
                      >
                        {option}
                      </label>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-black">
              Personal Information
            </p>
            {/* Name and Contact */}
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "first_name",
                "last_name",
                "email_address",
                "mobile_number",
              ].map((field) => {
                return (
                  <TextInput
                    key={field}
                    placeholder={capitalize(field)}
                    value={user[field]}
                    id={field}
                    onChange={(e) =>
                      setUser((prev) => {
                        return {
                          ...prev,
                          [field]: e.target.value,
                        };
                      })
                    }
                  />
                );
              })}
            </div>
          </div>
          <hr />
          <div className="grid md:grid-cols-2 gap-4">
            {/* Invoice or O.R Name */}
            <div className="flex flex-col gap-2 items-start w-full">
              <Label
                htmlFor="ref_name"
                value={
                  <p>
                    Invoice or O.R Name <span className="text-red-600">*</span>
                  </p>
                }
              />
              <TextInput
                id="ref_name"
                className="w-full"
                disabled={isSameUser}
                value={user.ref_name}
                onChange={(e) =>
                  setUser((prev) => {
                    return {
                      ...prev,
                      ref_name: e.target.value,
                    };
                  })
                }
              />
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="invoice_type"
                  checked={isSameUser}
                  onChange={(e) => {
                    setSameUser((prev) => !prev);
                    console.log(e.target.checked);
                    if (e.target.checked) {
                      setUser((prev) => {
                        return {
                          ...prev,
                          ref_name: `${prev.first_name} ${prev.last_name}`,
                        };
                      });
                    }
                  }}
                />
                <Label
                  htmlFor="invoice_type"
                  className="select-none"
                  value="Same as registrant name"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="tin_num" value="Tin Number:" />
              <TextInput
                value={user.tin_num}
                id={"tim_num"}
                onChange={(e) =>
                  setUser((prev) => {
                    return {
                      ...prev,
                      tin_num: e.target.value,
                    };
                  })
                }
              />
            </div>
          </div>
          {/* TIN Number */}

          <div className="space-y-2">
            {/* How did you find out about this program? */}
            <p className="text-sm font-medium text-black">
              How did you find out about this program?
            </p>
            <div className="flex flex-col items-start gap-2 text-sm text-black font-normal">
              {["Facebook", "LinkedIn", "Email"].map((option) => {
                return (
                  <div
                    className="flex items-center justify-center gap-2"
                    key={option}
                  >
                    <input
                      type="radio"
                      value={option}
                      name="source"
                      id={option}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setUser((prev) => {
                            return {
                              ...prev,
                              source_platform: e.target.value,
                            };
                          });
                        }
                      }}
                      required
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            {/* Payment via Bank Deposit */}
            <p className="text-sm font-bold text-black">
              Payment via Bank Deposit
            </p>
            <p className="text-sm md:text-base font-normal text-black">
              After submitting this form, we will be sending your invoice and
              our bank details for your reference.
            </p>
          </div>
          <Button
            size="lg"
            className="w-full mt-5"
            theme={{
              color: {
                failure:
                  "text-white bg-[#DF0000] border border-[#DF0000] enabled:hover:bg-transparent enabled:hover:text-[#DF0000] focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:text-white dark:border-red-600 dark:enabled:hover:bg-red-700 dark:enabled:hover:border-red-700 dark:focus:ring-red-700",
              },
            }}
            color="failure"
            type="button"
            onClick={registration}
          >
            Submit
          </Button>
        </div>
      </div>
    )
  );
}

export default Registration;
