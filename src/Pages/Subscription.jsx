import Admin from "../Admin";
import useNewsletter from "../Context/NewsletterContext";
import useInquiry from "../Context/InquiryContext";
import { useEffect, useMemo, useState } from "react";
import { Button, Datepicker, Table, TextInput, Tabs } from "flowbite-react";
import { format } from "date-fns";
import * as xlsx from 'xlsx';

function Subscription() {
  const { retrieveNewsletter } = useNewsletter();
  const { retrieveInquiries } = useInquiry();
  const [inquiryInformation, setInquiryInformation] = useState(null);
  const [information, setInformation] = useState(null);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState({from:new Date("2024"), to:new Date()});


  const columnNames = [
    "Name",
    "Position",
    "Company Representative",
    "Mobile No.",
    "Landline No.",
    "Email",
    "Program Type",
    "Topic",
    "Speaker Position",
    "Date",
    "Duration",
    "Venue",
    "Expected Budget",
    "Desired Result",
    "Participants No.",
    "Participants Position",
    "Age Bracket",
    "Participants Tenure",
    "Other Information",
    "Hear About",
  ];

  const tableHeaders = columnNames.map((columnName, index) => (
    <th
      key={index}
      className="px-10 py-3 text-md font-medium tracking-wider text-center whitespace-nowrap"
    >
      {columnName}
    </th>
  ));

  const exportInq = (filteredInq) => {
    if (filteredInq.length > 0){
      const workbook = xlsx.utils.book_new();
      const sheet = xlsx.utils.aoa_to_sheet([[
          "Inquirer",
          "Date Inquired",
          "Email",
          "Contact Number", 
          "Program",
          "Speaker Position",
          "Program Date",
          "Program Venue",
          "Audience Size",
          "Audience Profile",
          "Training Objectives"
      ]]);
  
      xlsx.utils.book_append_sheet(workbook, sheet, "Sheet1");
  
      const data = filteredInq.map(element => [
          element.name,
          format(new Date(element.inquiry_date), "yyyy-MM-dd"),
          element.email,
          element.contact_number,
          element.event_title,
          element.designation,
          element.event_date,
          element.event_location,
          element.audience_size,
          element.audience_profile,
          element.training_objective
      ]);
  
      xlsx.utils.sheet_add_aoa(sheet, data, {origin: -1});
  
      sheet["!cols"] = [
        {wch: 20},
        {wch: 20},
        {wch: 30},
        {wch: 20},
        {wch: 25},
        {wch: 20},
        {wch: 20},
        {wch: 25},
        {wch: 20},
        {wch: 20},
        {wch: 50},
      ]

      xlsx.writeFileXLSX(workbook, "Inquiries.xlsx");
  
    }else{
      alert("Table has no data.")
    }
};

const exportNews = (filteredNews) => {
  if (filteredNews.length > 0){
    const workbook = xlsx.utils.book_new();
    const sheet = xlsx.utils.aoa_to_sheet([[
        "Name", 
        "Email", 
        "Subscription Date"
    ]]);

    xlsx.utils.book_append_sheet(workbook, sheet, "Sheet1");

    const data = filteredNews.map(element => [
        element.name,
        element.email,
        format(new Date(element.date_subscribed), "yyyy-MM-dd")
    ]);

    xlsx.utils.sheet_add_aoa(sheet, data, {origin: -1});

    sheet["!cols"] = [
      {wch: 20},
      {wch: 30},
      {wch: 20},
    ]

    xlsx.writeFileXLSX(workbook, "Newsletter.xlsx");

  }else{
    alert("Table has no data.")
  }
};

  const filteredInq = useMemo(() => {
    if (!inquiryInformation) return

    return inquiryInformation.filter((inq) => {

      const textSearch = 
      inq.name.toLowerCase().includes(search.toLowerCase()) || 
      inq.inquiry_date.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      inq.contact_number.toLowerCase().includes(search.toLowerCase()) ||
      inq.event_title.toLowerCase().includes(search.toLowerCase()) ||
      inq.designation.toLowerCase().includes(search.toLowerCase()) ||
      inq.event_date.toLowerCase().includes(search.toLowerCase()) ||
      inq.event_location.toLowerCase().includes(search.toLowerCase()) ||
      inq.audience_size.toLowerCase().includes(search.toLowerCase()) ||
      inq.audience_profile.toLowerCase().includes(search.toLowerCase()) ||
      inq.training_objective.toLowerCase().includes(search.toLowerCase()) 

      const dateReg = new Date(inq.inquiry_date) >= date.from && new Date(inq.inquiry_date) <= date.to

      return textSearch && dateReg
    })

  }, [inquiryInformation, search, date])

  const filteredNews = useMemo(() => {
    if (!information) return

    return information.filter((news) => {

      const textSearch = 
      news.name.toLowerCase().includes(search.toLowerCase()) || 
      news.email.toLowerCase().includes(search.toLowerCase()) ||
      news.date_subscribed.toLowerCase().includes(search.toLowerCase())

      const dateSub = new Date(news.date_subscribed) >= date.from && new Date(news.date_subscribed) <= date.to

      return textSearch && dateSub
    })

  }, [information, search, date])

  useEffect(() => {
    const setup = async () => {
      const data = await retrieveNewsletter();
      const inquire = await retrieveInquiries();
      setInformation(data);
      setInquiryInformation(inquire);
      console.log(data);
    };
    setup();
  }, []);
  console.log(filteredInq)
  return (
    <>
      <Admin />
      <div className="md:ml-[20rem] p-8">
        <div className="text-center text-[#DF0000] text-3xl 4xl:text-5xl font-bold mb-6">
          SUBSCRIPTIONS
        </div>
        <Tabs
          style="fullWidth"
          theme={{
            tablist: {
              tabitem: {
                base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none",
                styles: {
                  fullWidth: {
                    active: {
                      on: "active rounded-none bg-gray-100 p-4 text-[#DF0000] dark:bg-gray-700 dark:text-white",
                    },
                  },
                },
              },
            },
            tabitemcontainer: {
              base: "bg-white p-4 shadow-md",
              styles: {
                default: "",
                underline: "",
                pills: "",
                fullWidth: "",
              },
            },
          }}
        >
          <Tabs.Item active title="Inquiries">

            <div className="flex gap-3 mb-4 items-center">
              <div className="flex gap-3">
                <Datepicker value={format(date.from,"yyyy-MM-dd")} onSelectedDateChanged={(date)=>{setDate((current)=>{
                  return {
                    ...current,
                    from: date
                  }
                })}}/>
                <Datepicker value={format(date.to,"yyyy-MM-dd")} onSelectedDateChanged={(date)=>{setDate((current)=>{
                  return {
                    ...current,
                    to: date
                  }
                })}}/>
              </div>
              <p className="text-lg ml-auto">Total Inquiries: {filteredInq?.length}</p>
              <TextInput placeholder="Search" className="" onChange={(e) => setSearch(e.target.value)} />
            </div>

            <div className="h-full max-h-[500px] 2xl:max-h-[650px] overflow-y-auto rounded-lg shadow-lg">
              <Table className="min-w-full bg-white" hoverable>
                <Table.Head className="sticky top-0 text-center z-[1]">
                  {[
                    "Inquirer",
                    "Date Inquired",
                    "Contact Details",
                    "Company Details",
                    "Program",
                    "Program Details",
                    "Participants Information",
                    "Training Objectives"
                  ].map((header) => {
                    return (
                      <Table.HeadCell
                        className="bg-[#445462] text-white p-4 capitalize font-semibold"
                        key={header}
                      >
                        {header}
                      </Table.HeadCell>
                    );
                  })}
                </Table.Head>
                <Table.Body>
                  {filteredInq &&
                    filteredInq.map((item, index) => {
                      return (
                        <Table.Row key={index}>
                          <Table.Cell>
                            <div>
                              <p>
                                <span>Name: </span>
                                <span className="font-semibold">
                                  {item.name}
                                </span>
                              </p>
                            </div>
                          </Table.Cell>
                          <Table.Cell>
                          {format(new Date(item.inquiry_date), "yyyy-MM-dd")}
                          </Table.Cell>
                          <Table.Cell>
                            <div>
                              <p>
                                <span>Email: </span>
                                <span>{item.email}</span>
                              </p>
                              <p>
                                <span>Mobile: </span>
                                <span>{item.contact_number}</span>
                              </p>
                            </div>
                          </Table.Cell>
                          <Table.Cell>
                            <div>
                              <p>
                                <span>Company Name: </span>
                                <span>{item.company_name}</span>
                              </p>
                              <p>
                                <span>Company Information: </span>
                                <span>{item.company_information}</span>
                              </p>
                            </div>
                          </Table.Cell>
                          <Table.Cell>
                            <div>
                              <p>
                                <span>Title: </span>
                                <span>{item.event_title}</span>
                              </p>
                            </div>
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap">
                            <div>
                              <p>
                                <span>Speaker Position: </span>
                                <span>{item.designation}</span>
                              </p>
                              <p>
                                <span>Date: </span>
                                <span>{item.event_date}</span>
                              </p>
                              <p>
                                <span>Event Setup: </span>
                                <span>{item.event_setup}</span>
                              </p>
                              <p>
                                <span>Venue: </span>
                                <span>{item.event_location}</span>
                              </p>
                            </div>
                          </Table.Cell>
                          <Table.Cell>
                            <div>
                              <p>
                                <span>Size: </span>
                                <span>{item.audience_size}</span>
                              </p>
                              <p>
                                <span>Profile: </span>
                                <span>{item.audience_profile}</span>
                              </p>
                            </div>
                          </Table.Cell>
                          <Table.Cell>{item.training_objective}</Table.Cell>
                        </Table.Row>
                      );
                    })}
                </Table.Body>
              </Table>
            </div>
            <div>
              <Button className="ml-auto mr-5 my-3" color="gray" size="xl"
              onClick={()=>exportInq(filteredInq)}> Export </Button>
            </div>
          </Tabs.Item>
          <Tabs.Item active title="Newsletter">

            <div className="flex gap-3 mb-4 items-center">
              <div className="flex gap-3">
                <Datepicker value={format(date.from,"yyyy-MM-dd")} onSelectedDateChanged={(date)=>{setDate((current)=>{
                  return {
                    ...current,
                    from: date
                  }
                })}}/>
                <Datepicker value={format(date.to,"yyyy-MM-dd")} onSelectedDateChanged={(date)=>{setDate((current)=>{
                  return {
                    ...current,
                    to: date
                  }
                })}}/>
              </div>
              <p className="text-lg ml-auto">Total Subscriptions: {filteredNews?.length}</p>
              <TextInput placeholder="Search" className="" onChange={(e) => setSearch(e.target.value)} />
            </div>

            <div className="h-full max-h-[500px] 2xl:max-h-[650px] overflow-y-auto rounded-lg shadow-lg">
              <Table className="min-w-full bg-white" hoverable>
                <Table.Head className="sticky top-0 z-[1]">
                  {["name", "email", "subscription date"].map((header) => {
                    return (
                      <Table.HeadCell
                        className="bg-[#445462] text-white p-4 capitalize font-semibold"
                        key={header}
                      >
                        {header}
                      </Table.HeadCell>
                    );
                  })}
                </Table.Head>
                <Table.Body>
                  {filteredNews &&
                    filteredNews.map((item, index) => {
                      console.log(item);
                      return (
                        <Table.Row key={index}>
                          <Table.Cell>{item.name}</Table.Cell>
                          <Table.Cell>{item.email}</Table.Cell>
                          <Table.Cell>{item.date_subscribed}</Table.Cell>
                        </Table.Row>
                      );
                    })}
                </Table.Body>
              </Table>
            </div>
            <div>
              <Button className="ml-auto mr-5 my-3" color="gray" size="xl"
              onClick={()=>exportNews(filteredNews)}> Export </Button>
            </div>
          </Tabs.Item>
        </Tabs>
      </div>
    </>
  );
}

export default Subscription;
