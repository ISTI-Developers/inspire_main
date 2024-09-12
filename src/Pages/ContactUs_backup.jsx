/* eslint-disable react/prop-types */
import React from "react";
import classNames from "classnames";
import bgcontact from "../assets/bgcontact.png";
import { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import useSubscription from "../Context/SubscriptionContext";
import {
  Button,
  Checkbox,
  Datepicker,
  Label,
  Radio,
  TextInput,
  Textarea,
} from "flowbite-react";
import { format } from "date-fns";

export default function ContactUs() {
  const [index, setIndex] = useState(1);
  const numbers = [1, 2, 3, 4];

  const { insertInquiry } = useSubscription();
  // const [user, setUser] = useState({
  //   name: "",
  //   position: "",
  //   company_rep: "",
  //   mobile_number: "",
  //   landline_no: "",
  //   email: "",
  //   program_type: "",
  //   topic: "",
  //   speaker_position: "",
  //   date: format(new Date(), "yyyy-MM-dd"),
  //   duration: "",
  //   venue: "",
  //   expected_budget: "",
  //   desired_result: "",
  //   participants_num: "",
  //   participants_pos: "",
  //   min_age_bracket: "",
  //   max_age_bracket: "",
  //   age_bracket: "",
  //   participants_tenure: "",
  //   other_info: "",
  //   hear_about: "",
  // });
  // const about = [
  //   <Inquirer key="inquirer" user={user} setUser={setUser} />,
  //   <Engagement key="engagement" user={user} setUser={setUser} />,
  //   <Participants key="participants" user={user} setUser={setUser} />,
  //   <Others key="others" user={user} setUser={setUser} />,
  // ];
  const inquiry = async (e) => {
    e.preventDefault();
    console.log(user);
    const newKeys = Object.keys(user).filter(
      (item) =>
        ![
          "age_bracket",
          "landline_no",
          "expected_budget",
          "participants_pos",
          "participants_tenure",
          "other_info",
        ].includes(item)
    );

    let emptyCounter = 0;
    newKeys.map((key) => {
      if (user[key] === "") {
        console.log(key, user[key]);
        emptyCounter += 1;
      }
    });
    if (emptyCounter !== 0) {
      alert("Please complete fields");
      return;
    }
    const response = await insertInquiry(
      user.name,
      user.position,
      user.company_rep,
      user.mobile_number,
      user.landline_no,
      user.email,
      user.program_type,
      user.topic,
      user.speaker_position,
      user.date,
      user.duration,
      user.venue,
      user.expected_budget,
      user.desired_result,
      user.participants_num,
      user.participants_pos,
      `${user.min_age_bracket} - ${user.max_age_bracket}`,
      user.participants_tenure,
      user.other_info,
      user.hear_about
    );
    newKeys.forEach((key) => {
      if (key === "date") {
        user[key] = format(new Date(), "yyyy-MM-dd");
      } else {
        user[key] = "";
      }
    });
    alert(response);
  };
  return (
    <div className="py-4">
      <div
        className="flex justify-center items-center p-8 md:px-16 md:py-20 w-full mb-5 "
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
      <div className="flex items-center justify-center p-4">
        {/* <iframe
          src="https://access.successoptionsinc.com/forms/quote/d1853c65017ba8839470e15513ffddfc"
          frameBorder="0"
          width="50%"
          height="700"
          className="border p-4 rounded-lg shadow-md"
        ></iframe> */}
      </div>
      {/* <div className="flex overflow-hidden relative flex-col justify-center px-1.5 mt-3 py-20 min-h-[857px]">
        <img
          src={bgcontact}
          alt=""
          className="object-cover absolute inset-0 size-full max-sm:object-cover"
        />
        <div className="flex relative flex-col items-center px-16 pb-10 gap-10">
          <div className="flex flex-col max-w-full w-[640px]">
            <div className="flex gap-0 justify-center self-center  text-xl font-bold whitespace-nowrap text-zinc-500">
              {numbers.map((number, index) => (
                <React.Fragment key={index}>
                  <div
                    className={`grow justify-center bg-white px-4 py-2 rounded-[60px] ${
                      number === 1
                        ? "bg-[#DF0000]  text-black"
                        : "bg-gray border border-solid border-[#DF0000] "
                    }`}
                  >
                    {number}
                  </div>
                  {index < numbers.length - 1 && (
                    <div className="self-start mt-5 border-2 border-[#DF0000]  border-solid aspect-[25] stroke-[2px] stroke-[#DF0000]  w-[51px]" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          {about.map((item, idx) => {
            return (
              <section
                key={idx}
                id={idx + 1}
                className={classNames(
                  "rounded-2xl bg-white p-10 pt-7 flex-col",
                  idx + 1 === index ? "flex" : "hidden"
                )}
              >
                {item}
                <div className="flex gap-2 pt-7 items-center text-base text-black whitespace-nowrap">
                  {idx !== 0 && (
                    <button
                      className="flex gap-1 rounded-md hover:underline"
                      onClick={() =>
                        setIndex((previous) => {
                          return (previous = previous - 1);
                        })
                      }
                    >
                      <FaArrowCircleLeft className="w-6 h-6 text-black" />
                      Back
                    </button>
                  )}
                  {idx !== 3 && (
                    <button
                      className="flex gap-1 rounded-md hover:underline ml-auto"
                      onClick={() =>
                        setIndex((previous) => {
                          return (previous = previous + 1);
                        })
                      }
                    >
                      Next
                      <FaArrowCircleRight className="w-6 h-6 text-black" />
                    </button>
                  )}
                  {idx === 3 && (
                    <Button
                      size="lg"
                      className="w-1/2 ml-auto"
                      theme={{
                        color: {
                          failure:
                            "text-white bg-[#DF0000] border border-[#DF0000] enabled:hover:bg-transparent enabled:hover:text-[#DF0000] focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:text-white dark:border-red-600 dark:enabled:hover:bg-red-700 dark:enabled:hover:border-red-700 dark:focus:ring-red-700",
                        },
                      }}
                      color="failure"
                      type="button"
                      onClick={inquiry}
                    >
                      SUBMIT
                    </Button>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div> */}
    </div>
  );
}

function Inquirer() {
  // const fields = [{ key: "", label: "", isRequired: true }];
}

// function Inquirer({ user, setUser }) {
//   const fields = [
//     { key: "name", label: "Name", isRequired: true },
//     { key: "position", label: "Position", isRequired: true },
//     { key: "company_rep", label: "Company Represented", isRequired: true },
//     { key: "mobile_number", label: "Mobile Number", isRequired: true },
//     { key: "landline_no", label: "Landline Number", isRequired: false },
//   ];
//   const handleChange = (e) => {
//     setUser((prev) => {
//       return {
//         ...prev,
//         [e.target.id]: e.target.value,
//       };
//     });
//   };
//   return (
//     <form className="flex flex-col items-start gap-4">
//       <h3 className="font-bold text-black">About the Person Inquiring</h3>
//       <div className="flex flex-col gap-4 items-center whitespace-nowrap rounded-xl">
//         {fields.map((field) => {
//           return (
//             !field.label.includes("Number") && (
//               <div key={field.key} className="flex flex-col gap-1 w-full">
//                 <Label
//                   htmlFor={field.key}
//                   value={
//                     <p>
//                       {field.label}{" "}
//                       {field.isRequired && (
//                         <span className="text-[#DF0000]">*</span>
//                       )}
//                     </p>
//                   }
//                 />
//                 <TextInput
//                   id={field.key}
//                   value={user[field.key]}
//                   className="w-full"
//                   sizing="lg"
//                   onChange={handleChange}
//                   required={field.isRequired}
//                 />
//               </div>
//             )
//           );
//         })}
//         <div className="flex gap-4 w-full">
//           {fields
//             .filter((field) => field.label.includes("Number"))
//             .map((field) => {
//               return (
//                 <div key={field.key} className="flex flex-col gap-1 w-1/2">
//                   <Label
//                     htmlFor={field.key}
//                     value={
//                       <p>
//                         {field.label}{" "}
//                         {field.isRequired && (
//                           <span className="text-[#DF0000]">*</span>
//                         )}
//                       </p>
//                     }
//                   />
//                   <TextInput
//                     id={field.key}
//                     value={user[field.key]}
//                     sizing="lg"
//                     className="w-full"
//                     onChange={handleChange}
//                     required={field.isRequired}
//                   />
//                 </div>
//               );
//             })}
//         </div>
//         <div key="email" className="flex flex-col gap-1 w-full">
//           <Label
//             htmlFor="email"
//             value={
//               <p>
//                 Email <span className="text-[#DF0000]">*</span>
//               </p>
//             }
//           />
//           <TextInput
//             id="email"
//             value={user.email}
//             sizing="lg"
//             className="w-full"
//             onChange={handleChange}
//             required
//           />
//         </div>
//       </div>
//     </form>
//   );
// }

// function Engagement({ user, setUser }) {
//   const fields = [
//     {
//       type: "radio",
//       key: "program_type",
//       label: "Program Type",
//       isRequired: true,
//       options: [
//         "In House Training",
//         "Keynote Speaking",
//         "Coaching",
//         "Consultancy",
//       ],
//     },
//     { type: "text", key: "topic", label: "Topic", isRequired: true },
//     {
//       type: "text",
//       key: "speaker_position",
//       label: "Position",
//       isRequired: true,
//     },
//     [
//       { type: "date", key: "date", label: "Date", isRequired: true },
//       { type: "text", key: "duration", label: "Duration", isRequired: true },
//     ],
//     [
//       { type: "text", key: "venue", label: "Venue", isRequired: true },
//       {
//         type: "text",
//         key: "expected_budget",
//         label: "Expected Budget",
//         isRequired: true,
//       },
//     ],
//     {
//       type: "text",
//       key: "desired_result",
//       label: "Desired Result",
//       isRequired: true,
//     },
//   ];
//   const handleChange = (e) => {
//     setUser((prev) => {
//       return {
//         ...prev,
//         [e.target.id]: e.target.value,
//       };
//     });
//   };
//   return (
//     <form className="flex flex-col items-start gap-4">
//       <h3 className="font-bold text-black">About the Engagement</h3>
//       <div className="flex flex-col gap-4 items-center whitespace-nowrap rounded-xl">
//         {fields.map((field, fIndex) => {
//           if (Array.isArray(field)) {
//             return (
//               <div key={fIndex} className="w-full flex gap-4">
//                 {field.map((subField) => {
//                   switch (subField.type) {
//                     case "date":
//                       return (
//                         <div
//                           key={subField.key}
//                           className="flex flex-col gap-1 w-full"
//                         >
//                           <Label
//                             htmlFor={subField.key}
//                             value={
//                               <p>
//                                 {subField.label}{" "}
//                                 {subField.isRequired && (
//                                   <span className="text-[#DF0000]">*</span>
//                                 )}
//                               </p>
//                             }
//                           />
//                           <Datepicker
//                             id={subField.key}
//                             value={format(
//                               new Date(user[subField.key]),
//                               "yyyy-MM-dd"
//                             )}
//                             className="w-full"
//                             sizing="lg"
//                             onSelectedDateChanged={(date) =>
//                               setUser((prev) => {
//                                 return {
//                                   ...prev,
//                                   date: format(new Date(date), "yyyy-MM-dd"),
//                                 };
//                               })
//                             }
//                             required={subField.isRequired}
//                           />
//                         </div>
//                       );
//                     default:
//                       return (
//                         <div
//                           key={subField.key}
//                           className="flex flex-col gap-1 w-full"
//                         >
//                           <Label
//                             htmlFor={subField.key}
//                             value={
//                               <p>
//                                 {subField.label}{" "}
//                                 {subField.isRequired && (
//                                   <span className="text-[#DF0000]">*</span>
//                                 )}
//                               </p>
//                             }
//                           />
//                           <TextInput
//                             id={subField.key}
//                             value={user[subField.key]}
//                             className="w-full"
//                             sizing="lg"
//                             onChange={handleChange}
//                             required={subField.isRequired}
//                           />
//                         </div>
//                       );
//                   }
//                 })}
//               </div>
//             );
//           } else {
//             switch (field.type) {
//               case "radio":
//                 return (
//                   <div
//                     key={field.key}
//                     className="flex gap-6 justify-evenly w-full"
//                   >
//                     {field.options.map((option, index) => {
//                       return (
//                         <div key={option} className="flex gap-2 items-center">
//                           <Radio
//                             id={`${field.key}_${index}`}
//                             name={field.key}
//                             value={option}
//                             checked={user[field.key] === option}
//                             onChange={(e) => {
//                               setUser((prev) => {
//                                 return {
//                                   ...prev,
//                                   [field.key]: e.target.value,
//                                 };
//                               });
//                             }}
//                             required={field.isRequired}
//                           />
//                           <Label
//                             htmlFor={`${field.key}_${index}`}
//                             value={option}
//                           />
//                         </div>
//                       );
//                     })}
//                   </div>
//                 );
//               case "date":
//                 return (
//                   <div key={field.key} className="flex flex-col gap-1 w-full">
//                     <Label
//                       htmlFor={field.key}
//                       value={
//                         <p>
//                           {field.label}{" "}
//                           {field.isRequired && (
//                             <span className="text-[#DF0000]">*</span>
//                           )}
//                         </p>
//                       }
//                     />
//                     <Datepicker
//                       id={field.key}
//                       value={format(new Date(user[field.key]), "yyyy-MM-dd")}
//                       className="w-full"
//                       sizing="lg"
//                       onChange={handleChange}
//                       required={field.isRequired}
//                     />
//                   </div>
//                 );
//               default:
//                 return (
//                   <div key={field.key} className="flex flex-col gap-1 w-full">
//                     <Label
//                       htmlFor={field.key}
//                       value={
//                         <p>
//                           {field.label}{" "}
//                           {field.isRequired && (
//                             <span className="text-[#DF0000]">*</span>
//                           )}
//                         </p>
//                       }
//                     />
//                     <TextInput
//                       id={field.key}
//                       value={user[field.key]}
//                       className="w-full"
//                       sizing="lg"
//                       onChange={handleChange}
//                       required={field.isRequired}
//                     />
//                   </div>
//                 );
//             }
//           }
//         })}
//       </div>
//     </form>
//   );
// }

// function Participants({ user, setUser }) {
//   const fields = [
//     { key: "participants_num", label: "No. of Participants", isRequired: true },
//     {
//       key: "participants_pos",
//       label: "Position/s of Participants",
//       isRequired: false,
//     },
//     {
//       key: "participants_tenure",
//       label: "Tenure of Participants",
//       isRequired: false,
//     },
//     [
//       {
//         type: "number",
//         key: "min_age_bracket",
//         label: "Min",
//         isRequired: true,
//       },
//       {
//         type: "number",
//         key: "max_age_bracket",
//         label: "Max",
//         isRequired: true,
//       },
//     ],
//   ];
//   const handleChange = (e) => {
//     setUser((prev) => {
//       return {
//         ...prev,
//         [e.target.id]: e.target.value,
//       };
//     });
//   };
//   return (
//     <form className="flex flex-col items-start gap-4">
//       <h3 className="font-bold text-black">About the Engagement</h3>
//       <div className="flex flex-col gap-4 items-center whitespace-nowrap rounded-xl">
//         {fields.slice(0, 3).map((field) => {
//           return (
//             <div key={field.key} className="flex flex-col gap-1 w-full">
//               <Label
//                 htmlFor={field.key}
//                 value={
//                   <p>
//                     {field.label}{" "}
//                     {field.isRequired && (
//                       <span className="text-[#DF0000]">*</span>
//                     )}
//                   </p>
//                 }
//               />
//               <TextInput
//                 id={field.key}
//                 value={user[field.key]}
//                 className="w-full"
//                 sizing="lg"
//                 onChange={handleChange}
//                 required={field.isRequired}
//               />
//             </div>
//           );
//         })}
//         <div className="flex flex-col gap-1">
//           <Label
//             value={
//               <p>
//                 Age Bracket: <span className="text-[#DF0000]">*</span>
//               </p>
//             }
//           />
//           <div className="flex gap-4">
//             {fields.slice(3).map((field) => {
//               return field.map((subField) => {
//                 return (
//                   <div
//                     key={subField.key}
//                     className="flex flex-col gap-1 w-full"
//                   >
//                     <TextInput
//                       type="number"
//                       id={subField.key}
//                       value={user[subField.key]}
//                       placeholder={subField.label}
//                       className="w-full"
//                       sizing="lg"
//                       onChange={handleChange}
//                       required={subField.isRequired}
//                     />
//                   </div>
//                 );
//               });
//             })}
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }

// function Others({ user, setUser }) {
//   const fields = [
//     {
//       key: "other_info",
//       label: "Share your thoughts with us!",
//       isRequired: false,
//     },
//     {
//       key: "hear_about",
//       label: "How did you hear about us?",
//       options: [
//         "Inspire Facebook Page",
//         "Inspire Flyers",
//         "Newspaper",
//         "Radio",
//         "Inspire Sales Executive",
//         "Attended Inspire's Event",
//         "Inspire Booth (Conventions)",
//         "Instagram",
//         "Twitter",
//       ],
//       isRequired: true,
//     },
//   ];
//   const handleChange = (e) => {
//     setUser((prev) => {
//       return {
//         ...prev,
//         [e.target.id]: e.target.value,
//       };
//     });
//   };
//   return (
//     <form className="flex flex-col items-start gap-4">
//       <h3 className="font-bold text-black">Other Information</h3>
//       {fields.map((field, index) => {
//         return (
//           <div key={field.key} className="flex flex-col gap-1 w-full">
//             <Label
//               htmlFor={field.key}
//               value={
//                 <p>
//                   {field.label}{" "}
//                   {field.isRequired && (
//                     <span className="text-[#DF0000]">*</span>
//                   )}
//                 </p>
//               }
//             />
//             {index === 0 ? (
//               <Textarea
//                 onChange={handleChange}
//                 className="w-full min-w-[300px] lg:min-w-[450px] min-h-[150px]"
//               >
//                 {user[field.key]}
//               </Textarea>
//             ) : (
//               <div className="flex flex-col gap-2">
//                 {field.options.map((check, index) => {
//                   return (
//                     <div key={check} className="flex items-center gap-2">
//                       <Checkbox
//                         value={check}
//                         id={`${field.key}_${index}`}
//                         name={field.key}
//                         onChange={(e) => {
//                           const tempArray = [...user.hear_about];
//                           if (e.target.checked) {
//                             if (tempArray.includes(e.target.value)) {
//                               tempArray.splice(e.target.value, 1);
//                             } else {
//                               tempArray.push(e.target.value);
//                             }
//                           }
//                           setUser((prev) => {
//                             return {
//                               ...prev,
//                               hear_about: tempArray,
//                             };
//                           });
//                         }}
//                         required
//                       />

//                       <Label htmlFor={`${field.key}_${index}`} value={check} />
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </form>
//   );
// }
