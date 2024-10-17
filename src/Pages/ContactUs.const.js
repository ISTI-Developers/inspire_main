export const fields = [
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
