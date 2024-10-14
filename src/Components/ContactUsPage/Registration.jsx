import React, { useEffect, useState, useRef } from "react";
import useRegistration from "../../Context/RegistrationContext";
import { Button, Checkbox, Label, TextInput, FileInput } from "flowbite-react";
import { useParams } from "react-router-dom";
import usePrograms from "../../Context/ProgramsContext";
import {
  initialFormState,
  registrationTypes,
  textInputs,
  findOut,
  capitalize,
} from "./ContactUsPage.const";

function Registration() {
  const { id } = useParams();
  const { retrieveProgram } = usePrograms();
  const { insertRegistration } = useRegistration();
  const [program, setProgram] = useState(null);
  const [moreThanTen, setMoreThanTen] = useState(false);
  const [numberOfParticipants, setNumberOfParticipants] = useState(undefined);
  const [user, setUser] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRefMoreThanTen = useRef(null);
  const fileInputRefProof = useRef(null);

  const registration = async (e) => {
    e.preventDefault();
    const requiredFields = [
      user.first_name,
      user.last_name,
      user.email_address,
      user.mobile_number,
      user.ref_name,
      user.proof,
      user.tin_num,
      user.source_platform,
    ];
    if (user.registration_type === "Company (Individual)") {
      requiredFields.push(user.company_name, user.position);
    }
    if (user.registration_type === "Company (Group)") {
      if (!moreThanTen && user.participants < 2) {
        alert("Please add at least one participant.");
        return;
      }
      for (const participant of user.participants) {
        const participantFields = [
          participant.first_name,
          participant.last_name,
          participant.email_address,
          participant.mobile_number,
          participant.position,
        ];
        if (
          participantFields.includes(undefined) ||
          participantFields.includes("")
        ) {
          alert("Please fill in all participant details.");
          return;
        }
      }
    }

    if (requiredFields.includes(undefined) || requiredFields.includes("")) {
      alert("Please fill in all the required fields.");
      return;
    }
    try {
      setSubmitting(true);
      user.program_id = id;
      const initialResponse = await insertRegistration(
        user.registration_type,
        user.first_name,
        user.last_name,
        user.email_address,
        user.mobile_number,
        user.ref_name,
        user.proof,
        user.tin_num,
        user.source_platform,
        user.program_id,
        user.company_name,
        user.position,
        user.more_than_ten
      );
      if (
        user.registration_type === "Company (Group)" &&
        user.participants.length > 0
      ) {
        for (const participant of user.participants) {
          const participantData = {
            ...user,
            first_name: participant.first_name,
            last_name: participant.last_name,
            email_address: participant.email_address,
            mobile_number: participant.mobile_number,
            position: participant.position,
          };
          const participantResponse = await insertRegistration(
            participantData.registration_type,
            participantData.first_name,
            participantData.last_name,
            participantData.email_address,
            participantData.mobile_number,
            participantData.ref_name,
            participantData.proof,
            participantData.tin_num,
            participantData.source_platform,
            participantData.program_id,
            participantData.company_name,
            participantData.position
          );
        }
      }
      alert(initialResponse);
      setUser(initialFormState);
      if (fileInputRefProof.current) {
        fileInputRefProof.current.value = "";
      }
      if (fileInputRefMoreThanTen.current) {
        fileInputRefMoreThanTen.current.value = "";
      }

      setMoreThanTen(false);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const setup = async () => {
      const result = await retrieveProgram(id);
      setProgram(result);
    };
    setup();
  }, []);

  const dynamicInputs =
    user.registration_type === "Company (Individual)" ||
    user.registration_type === "Company (Group)"
      ? [...textInputs, "company_name", "position"]
      : textInputs;

  const dynamicInputsForGroup =
    user.registration_type === "Company (Group)"
      ? [...textInputs, "position"]
      : textInputs;

  const handleOnChangeRegistrationTypes = (e) => {
    if (e.target.checked) {
      setUser((prevState) => ({
        ...prevState,
        registration_type: e.target.value,
        first_name: "",
        last_name: "",
        email_address: "",
        mobile_number: "",
        ref_name: "",
        proof: null,
        tin_num: "",
        program_id: "",
        company_name: "",
        position: "",
        source_platform: "",
        participants: [],
      }));
      setNumberOfParticipants(undefined);
      setMoreThanTen(false);
      if (fileInputRefProof.current) {
        fileInputRefProof.current.value = "";
      }
      if (fileInputRefMoreThanTen.current) {
        fileInputRefMoreThanTen.current.value = "";
      }
    }
  };
  const handleParticipantsChange = (e) => {
    const value = Number(e.target.value);
    if (value > 10) {
      alert("You cannot enter more than 10 participants.");
      setNumberOfParticipants(10);
    } else if (value < 2) {
      alert("Please enter 2 or more participants.");
      setNumberOfParticipants(2);
    } else {
      setNumberOfParticipants(undefined);
    }
    setUser((prev) => ({
      ...prev,
      numberOfParticipants: value,
      participants: Array.from({ length: value }, (_, i) => ({
        first_name: "",
        last_name: "",
        email_address: "",
        mobile_number: "",
        position: "",
      })),
    }));
  };

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
              Program Selected:&nbsp;
              <span className="font-normal underline">{program.title}</span>
            </p>
            <p className="font-medium text-black">
              Registration Type<span className="text-red-500">&nbsp;*</span>
            </p>
            <div className="flex gap-4 ">
              {registrationTypes.map((option) => {
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
                      onChange={handleOnChangeRegistrationTypes}
                      required
                      checked={user.registration_type === option}
                    />
                    <label
                      htmlFor={option}
                      className="border-4 p-3 py-2 select-none rounded-lg font-semibold cursor-pointer transition-all hover:text-white hover:border-[#a7242469] hover:bg-[#a72424ab] text-gray-800 peer-checked:border-[#a72424] peer-checked:bg-[#a72424] peer-checked:text-white"
                    >
                      {option}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-black">
              Personal Information
              {user.registration_type === "Company (Group)"
                ? " (of the Representative)"
                : ""}
              <span className="text-red-500">&nbsp;*</span>
            </p>
            {/* Name and Contact */}
            <div className="grid gap-4 md:grid-cols-2">
              {dynamicInputs.map((field) => {
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
                    title={
                      user.registration_type == ""
                        ? "Please select a registration type"
                        : ""
                    }
                    disabled={user.registration_type == ""}
                  />
                );
              })}
              {user.registration_type === "Company (Group)" && (
                <>
                  <TextInput
                    key="numberOfParticipants"
                    placeholder="Number of participants"
                    value={numberOfParticipants}
                    min={2}
                    max={10}
                    type="number"
                    onChange={handleParticipantsChange}
                    disabled={moreThanTen}
                  />
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      id="moreThanTen"
                      checked={moreThanTen}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setMoreThanTen(isChecked);
                        if (isChecked) {
                          setUser((prev) => ({
                            ...prev,
                            participants: [],
                          }));
                        } else {
                          if (fileInputRefMoreThanTen.current) {
                            fileInputRefMoreThanTen.current.value = "";
                          }
                          setUser((prev) => ({
                            ...prev,
                            more_than_ten: "",
                            participants: [],
                          }));
                        }
                        setNumberOfParticipants((prev) => !prev);
                      }}
                      disabled={user.registration_type == ""}
                    />

                    <Label
                      htmlFor="numberOfParticipants"
                      className="select-none"
                      value="More than 10 participants?"
                    />
                  </div>
                  {moreThanTen && (
                    <>
                      <div className="gap-2">
                        <Label
                          htmlFor="proof"
                          value="Upload Participants File"
                        />
                        <FileInput
                          ref={fileInputRefMoreThanTen}
                          id="more_than_ten"
                          accept=".xlsx, .xls, .csv"
                          disabled={user.registration_type === ""}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setUser((prev) => ({
                              ...prev,
                              more_than_ten: file,
                            }));
                          }}
                        />
                        <a
                          href="/src/assets/Participant-Template.xlsx"
                          download="Participant-Template.xlsx"
                          className="text-blue-500 underline"
                        >
                          Click here for the template
                        </a>
                      </div>
                    </>
                  )}
                  {user.participants.map((participant, index) => (
                    <>
                      <div className="col-span-2">
                        <small>{`Participant ${index + 1}`}</small>
                      </div>
                      {dynamicInputsForGroup.map((field) => (
                        <div key={`${field}_${index}`}>
                          <TextInput
                            placeholder={capitalize(field)}
                            value={participant[field]}
                            onChange={(e) =>
                              setUser((prev) => {
                                const newParticipants = [...prev.participants];
                                newParticipants[index][field] = e.target.value;
                                return {
                                  ...prev,
                                  participants: newParticipants,
                                };
                              })
                            }
                          />
                        </div>
                      ))}
                    </>
                  ))}
                </>
              )}
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
                    Payment Reference Number&nbsp;
                    <span className="text-red-600">*</span>
                  </p>
                }
              />
              <TextInput
                id="ref_name"
                className="w-full"
                disabled={user.registration_type == ""}
                value={user.ref_name}
                placeholder={capitalize("ref_name")}
                onChange={(e) =>
                  setUser((prev) => {
                    return {
                      ...prev,
                      ref_name: e.target.value,
                    };
                  })
                }
                title={
                  user.registration_type == ""
                    ? "Please select a registration type"
                    : ""
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="tin_name"
                value={
                  <p>
                    Tin Number&nbsp;
                    <span className="text-red-600">*</span>
                  </p>
                }
              />
              <TextInput
                placeholder={capitalize("tin_num")}
                value={user.tin_num}
                id={"tin_num"}
                onChange={(e) =>
                  setUser((prev) => {
                    return {
                      ...prev,
                      tin_num: e.target.value,
                    };
                  })
                }
                title={
                  user.registration_type == ""
                    ? "Please select a registration type"
                    : ""
                }
                disabled={user.registration_type == ""}
              />
            </div>
            <div className="gap-2">
              <Label htmlFor="proof" value="Proof of Payment" />
              <FileInput
                ref={fileInputRefProof}
                id="proof"
                accept=".pdf, image/*"
                disabled={user.registration_type === ""}
                onChange={(e) => {
                  const file = e.target.files[0];
                  setUser((prev) => ({
                    ...prev,
                    proof: file,
                  }));
                }}
                title={
                  user.registration_type === ""
                    ? "Please select a registration type"
                    : ""
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
              {findOut.map((option) => {
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
                      checked={user.source_platform === option}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setUser((prev) => ({
                            ...prev,
                            source_platform: e.target.value,
                          }));
                        }
                      }}
                      required
                      title={
                        user.registration_type == ""
                          ? "Please select a registration type"
                          : ""
                      }
                      disabled={user.registration_type == ""}
                    />
                    <label htmlFor={option}>{option}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            {/* Payment via Bank Deposit */}
            <p className="text-sm font-bold text-black">Payment Details</p>
            <p className="text-sm md:text-base font-bold text-red-600">
              CHINA BANK CORPORATION
            </p>
            <p>ACCOUNT NAME: INSPIRE LEADERSHIP CONSULTANCY INC.</p>{" "}
            <p className="text-sm md:text-base font-bold text-red-600">
              ACCOUNT NUMBER
            </p>
            <p>1043-0000-1157</p>
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
            title={
              user.registration_type == ""
                ? "Please select a registration type"
                : ""
            }
            disabled={user.registration_type == "" || submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    )
  );
}

export default Registration;
