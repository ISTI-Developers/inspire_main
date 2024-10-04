/* eslint-disable react/prop-types */
import { useState } from "react";
import useSubscription from "../Context/SubscriptionContext";
import { defaults } from "../Context/defaults";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Datepicker,
  FileInput,
  Label,
  Radio,
  Select,
  TextInput,
  Textarea,
  Tooltip,
} from "flowbite-react";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaRegQuestionCircle,
} from "react-icons/fa";
import classNames from "classnames";
import { format } from "date-fns";

export default function ContactUs() {
  const { insertInquiry } = useSubscription();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(defaults.inquiry);
  console.log(inquiry);
  const [step, setStep] = useState(0);
  const onSubmit = async (e) => {
    e.preventDefault();
    inquiry.event_date = format(inquiry.event_date, "yyyy-MM-dd");
    const response = await insertInquiry(inquiry);
    alert(response);
    navigate("/");
  };
  return (
    <div className="py-4 bg-gray-50 min-h-screen">
      <div
        className="flex justify-center items-center text-8xl font-bold text-white whitespace-nowrap bg-white shadow-2xl w-full py-20"
        style={{ boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)" }}
      >
        <div className="w-full min-h-[8vh] max-w-[13rem] md:py-3 md:max-w-[20rem] lg:max-w-[23rem] xl:max-w-[30rem] flex text-white bg-black lg:py-6 lg:min-h-[15vh]">
          <span className="w-full mt-3 ml-6 font-bold text-4xl md:text-6xl md:mb-3 lg:text-7xl xl:text-8xl lg:mt-1 lg:ml-5">
            CONTACT
          </span>
        </div>
        <div className="w-full min-h-[8vh] max-w-[5rem] md:py-3 md:max-w-[8rem] lg:max-w-[9rem] xl:max-w-[11rem] flex text-white bg-[#DF0000] lg:py-6 lg:px-5 lg:min-h-[15vh]">
          <span className="w-full mt-3 ml-4 font-bold text-4xl md:text-6xl md:mb-3 lg:text-7xl xl:text-8xl lg:mt-1 lg:ml-1">
            US
          </span>
        </div>
      </div>
      <form
        className="flex items-center justify-center p-4"
        encType="multipart/formdata"
        onSubmit={onSubmit}
      >
        <div
          className={classNames(
            "bg-white shadow-md p-8 rounded-lg w-full max-w-[768px]",
            step === 1 && "lg:max-w-[1440px]"
          )}
        >
          {step === 0 ? (
            <Inquirer setInquiry={setInquiry} inquiry={inquiry} />
          ) : (
            <Event setInquiry={setInquiry} inquiry={inquiry} />
          )}
          <div className="flex gap-2 pt-7 items-center text-base text-black whitespace-nowrap">
            {step !== 0 && (
              <button
                type="button"
                className="flex gap-1 rounded-md hover:underline"
                onClick={() =>
                  setStep((previous) => {
                    return (previous = previous - 1);
                  })
                }
              >
                <FaArrowCircleLeft className="w-6 h-6 text-black" />
                Back
              </button>
            )}
            {step !== 1 && (
              <button
                type="button"
                className="flex gap-1 rounded-md hover:underline ml-auto"
                onClick={() =>
                  setStep((previous) => {
                    return (previous = previous + 1);
                  })
                }
              >
                Next
                <FaArrowCircleRight className="w-6 h-6 text-black" />
              </button>
            )}
            {step === 1 && (
              <Button
                size="lg"
                className="w-fit ml-auto"
                theme={{
                  color: {
                    failure:
                      "text-white bg-[#DF0000] border border-[#DF0000] enabled:hover:bg-transparent enabled:hover:text-[#DF0000] focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:text-white dark:border-red-600 dark:enabled:hover:bg-red-700 dark:enabled:hover:border-red-700 dark:focus:ring-red-700",
                  },
                }}
                color="failure"
                type="submit"
              >
                SUBMIT
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

function Inquirer({ inquiry, setInquiry }) {
  const fields = [
    {
      key: "company_name",
      type: "text",
      label: "Company/Organization",
      isRequired: true,
    },
    {
      key: "company_information",
      type: "textarea",
      label: "We'd like to know more about your organization",
      isRequired: true,
    },
    { key: "name", type: "text", label: "Name", isRequired: true },
    {
      key: "designation",
      type: "text",
      label: "Designation",
      isRequired: true,
    },
    { key: "email", type: "email", label: "Email", isRequired: true },
    {
      key: "contact_number",
      type: "tel",
      label: "Contact Number",
      isRequired: true,
      placeholder: "i.e 09987654321",
    },
  ];

  const handleChange = (e) => {
    setInquiry((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <h3 className="font-semibold text-lg">
        We&apos;d like to know more about you.
      </h3>
      <div className="flex flex-col gap-2 w-full">
        {fields.map((field, index) => {
          return (
            <div key={field.key} className="flex flex-col py-2 gap-2">
              <Label
                htmlFor={field.key}
                value={
                  <>
                    {field.label}
                    {field.isRequired && (
                      <span className="text-red-400">*</span>
                    )}
                  </>
                }
              />
              {field.type === "textarea" ? (
                <Textarea
                  id={field.key}
                  className="w-full"
                  onChange={handleChange}
                  value={inquiry[field.key]}
                  // onInput={(e) => console.log(e.target.value)}
                />
              ) : (
                <TextInput
                  id={field.key}
                  type={field.type}
                  className="w-full"
                  pattern={
                    field.type === "tel" ? "[0-9]{3}[0-9]{3}[0-9]{4}" : null
                  }
                  required={field.isRequired}
                  onChange={handleChange}
                  value={inquiry[field.key]}
                  placeholder={field.placeholder || ""}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Event({ inquiry, setInquiry }) {
  const fields = [
    [
      {
        key: "event_title",
        type: "text",
        label: "Event Title/Theme",
        isRequired: true,
      },
      {
        key: "event_description",
        type: "textarea",
        label: "Event/Training Description",
        isRequired: true,
      },
      {
        key: "event_setup",
        type: "select",
        options: [
          "Face-to-face (Please specify the venue)",
          "Webinar/Virtual (Please specify the platform)",
          "Hybrid (Please specify the venue and platform)",
        ],
        label: "Event/Training Setup",
        isRequired: true,
        guide:
          "Please let us know what type of event/training you want to have",
      },
      {
        key: "event_location",
        type: "text",
        label: "Location",
        isRequired: true,
        guide:
          "If the event will be with a live audience (face-to-face)  please provide the address of the event. If it's virtual  please provide the preferred platfom.",
        placeholder: "Venue Address / Prefered Platform",
      },
      {
        key: "is_recorded",
        type: "radio",
        options: [1, 0],
        label: "Do you plan to record the event or training?",
        isRequired: true,
      },
      {
        key: "is_streamed",
        type: "radio",
        options: [1, 0],
        label: "Do you plan to stream out in social media platforms?",
        isRequired: true,
      },
    ],
    [
      {
        key: "event_date",
        type: "date",
        label: "Event Date",
        isRequired: true,
      },
      {
        key: "speaker_timeslot",
        type: "text",
        label: "Speaker's Timeslot",
        isRequired: true,
        guide: "Please provide the preferred time for the speaker's engagement",
      },
      {
        key: "audience_size",
        type: "text",
        label: "Audience Size",
        isRequired: true,
        placeholder: "i.e 1000 participants",
      },
      {
        key: "audience_profile",
        type: "textarea",
        label: "Audience Profile",
        isRequired: true,
      },
      {
        key: "training_objective",
        type: "textarea",
        label: "Training Objective",
        isRequired: true,
        guide:
          "What would you want the participants to learn from this engagement?",
        placeholder:
          "i.e How to motivate our people? Take away: Our people will come out prepared to face the challenges of the future",
      },
      {
        key: "documents",
        type: "file",
        label: "If it helps, you can also send us your files and documents:",
        isRequired: false,
      },
    ],
  ];

  const handleChange = (e) => {
    setInquiry((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };
  const handleOptionChange = (e) => {
    setInquiry((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <h3 className="font-semibold text-lg">
        We&apos;d love to know how we can help. To best facilitate this, please
        fill in the following:
      </h3>
      <div className="grid w-full lg:grid-cols-2 gap-8">
        {fields.map((section, index) => {
          return (
            <section key={`section_${index}`}>
              {section.map((field) => {
                return (
                  <div key={field.key} className="flex flex-col py-2 gap-2">
                    <Label
                      htmlFor={field.key}
                      value={
                        <div className="flex items-center">
                          {field.label}
                          {field.isRequired && (
                            <span className="text-red-400">*</span>
                          )}
                          {field.guide && (
                            <>
                              <Tooltip
                                content={field.guide}
                                className="max-w-[300px] font-normal"
                              >
                                <FaRegQuestionCircle className="ml-1" />
                              </Tooltip>
                            </>
                          )}
                        </div>
                      }
                    />
                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.key}
                        className="w-full"
                        onChange={handleChange}
                        value={inquiry[field.key]}
                        placeholder={field.placeholder || ""}
                        required={field.isRequired}
                        // onInput={(e) => console.log(e.target.value)}
                      />
                    ) : field.type === "select" ? (
                      <Select
                        id={field.key}
                        className="w-full"
                        onChange={handleChange}
                        required={field.isRequired}
                      >
                        {field.options.map((option, key) => {
                          return (
                            <option key={`select_option_${key}`}>
                              {option}
                            </option>
                          );
                        })}
                      </Select>
                    ) : field.type === "radio" ? (
                      <div className="flex gap-6">
                        {field.options.map((option, key) => {
                          return (
                            <div
                              key={`${field.key}_option_${key}`}
                              className="flex gap-2 items-center"
                            >
                              <Radio
                                required={field.isRequired}
                                id={`${field.key}_${option}`}
                                name={field.key}
                                value={option}
                                onChange={handleOptionChange}
                              />
                              <Label
                                htmlFor={`${field.key}_${option}`}
                                value={option === 1 ? "Yes" : "No"}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : field.type === "date" ? (
                      <Datepicker
                        required={field.isRequired}
                        defaultDate={inquiry[field.key]}
                        onSelectedDateChanged={(date) =>
                          setInquiry((prev) => {
                            return {
                              ...prev,
                              [field.key]: date,
                            };
                          })
                        }
                      />
                    ) : field.type === "file" ? (
                      <FileInput
                        multiple
                        id={"documents"}
                        onChange={(e) => {
                          setInquiry((prev) => {
                            return {
                              ...prev,
                              documents: e.target.files,
                            };
                          });
                        }}
                      />
                    ) : (
                      <TextInput
                        id={field.key}
                        type={field.type}
                        className="w-full"
                        pattern={
                          field.type === "tel"
                            ? "[0-9]{3}[0-9]{3}[0-9]{4}"
                            : null
                        }
                        required={field.isRequired}
                        onChange={handleChange}
                        value={inquiry[field.key]}
                        placeholder={field.placeholder || ""}
                      />
                    )}
                  </div>
                );
              })}
            </section>
          );
        })}
      </div>
    </div>
  );
}
