export const initialFormState = {
  registration_type: "",
  first_name: "",
  last_name: "",
  email_address: "",
  mobile_number: "",
  ref_name: "",
  proof: null,
  tin_num: "",
  program_id: "",
  source_platform: "",
  company_name: "",
  position: "",
  more_than_ten: "",
  participants: [],
};
export const registrationTypes = [
  "Personal",
  "Company (Individual)",
  "Company (Group)",
];

export const textInputs = [
  "first_name",
  "last_name",
  "email_address",
  "mobile_number",
];
export const findOut = ["Facebook", "LinkedIn", "Email"];
export const capitalize = (string) => {
  let temp = string.split("_");

  temp = temp.map((t) => {
    t = t.toLowerCase();
    return t.substring(0, 1).toUpperCase() + t.slice(1);
  });

  return temp.join(" ");
};
