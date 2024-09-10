import { Button, Datepicker, Select, Table, TextInput, Label } from "flowbite-react";
import Admin from "../Admin";
import { useEffect, useMemo, useState } from "react";
import usePrograms from "../Context/ProgramsContext";
import { format } from "date-fns";
import * as xlsx from 'xlsx';

const columnNames = [
  "First Name",
  "Last Name",
  "Date Registered",
  "Email",
  "Mobile No.",
  "Invoice Details",
  "Type",
  "Program",
  "Event Date",
];

function Registrants() {
  const { retrieveRegistrants, retrievePrograms } = usePrograms();
  const [registrants, setRegistrants] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [selected, setSelect] = useState('all');
  const [search, setSearch] = useState("");
  const [date, setDate] = useState({from:new Date("2024"), to:new Date()});

  const onChange = (e) => {
    const ret = e.target.value;
    setSelect(ret)
  }

  const handleExport = (filtered) => {
    if (filtered.length > 0){
      const workbook = xlsx.utils.book_new();
      const sheet = xlsx.utils.aoa_to_sheet([[
          "First Name",
          "Last Name",
          "Date Registered",
          "Email",
          "Contact Number",
          "Invoice Name",
          "Tin Number",
          "Type",
          "Program",
          "Event Date"
      ]]);
  
      xlsx.utils.book_append_sheet(workbook, sheet, "Sheet1");
  
      const data = filtered.map(element => [
          element.first_name,
          element.last_name,
          element.date_reg,
          element.email_address,
          element.mobile_number,
          element.ref_name,
          element.tin_num,
          element.registration_type,
          element.title,
          format(new Date(element.program_date), "yyyy-MM-dd")
      ]);
  
      xlsx.utils.sheet_add_aoa(sheet, data, {origin: -1});
  
      sheet["!cols"] = [
        {wch: 20},
        {wch: 20},
        {wch: 20},
        {wch: 30},
        {wch: 20},
        {wch: 20},
        {wch: 20},
        {wch: 20},
        {wch: 40},
        {wch: 20},
      ]

      xlsx.writeFileXLSX(workbook, "Registrants.xlsx");
  
    }else{
      alert("Table has no data.")
    }

};

  const filtered = useMemo(() => {
    if (!registrants) return

    return registrants.filter((reg) => {
      const filter = selected === "all" || reg.program_id === selected

      const textSearch = 
      reg.title.toLowerCase().includes(search.toLowerCase()) || 
      reg.first_name.toLowerCase().includes(search.toLowerCase()) || 
      reg.last_name.toLowerCase().includes(search.toLowerCase()) ||
      reg.email_address.toLowerCase().includes(search.toLowerCase()) ||
      reg.mobile_number.toLowerCase().includes(search.toLowerCase()) ||
      reg.tin_num.toLowerCase().includes(search.toLowerCase()) ||
      reg.registration_type.toLowerCase().includes(search.toLowerCase()) ||
      reg.ref_name.toLowerCase().includes(search.toLowerCase())

      const dateReg = new Date(reg.date_reg) >= date.from && new Date(reg.date_reg) <= date.to

      return filter && textSearch && dateReg
    })

  }, [selected, registrants, search, date])

  useEffect(() => {
    const setup = async () => {
      const response = await retrieveRegistrants();
      const prog = await retrievePrograms();
      setPrograms(prog);
      setRegistrants(response);
    };
    setup();
  }, []); console.log(filtered)
  return (
    <>
      <Admin />
      <div className="md:ml-[20rem] p-8">
        <div className="text-center text-[#DF0000] text-3xl 4xl:text-5xl font-bold mb-6">
          PROGRAMS REGISTRANTS
        </div>

        <div className="flex gap-3">
          <div className="flex gap-3">
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
            <Select onChange={onChange}>
              <option selected value={'all'}>All Programs</option>;
              {
                programs.map((program) => {
                  return <option value={program.program_id}> {program.title} </option>;
                })
              }
            </Select>
          </div>
          <TextInput placeholder="Search" className="ml-auto" onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="h-full max-h-[450px] 2xl:max-h-[550px] overflow-y-auto mt-4 rounded-lg shadow-lg">
          <Table className="min-w-full bg-white" hoverable>
            <Table.Head className="sticky top-0 text-center z-[1]">
              {columnNames.map((header) => {
                return (
                  <Table.HeadCell
                    className="bg-[#445462] text-white p-4 capitalize"
                    key={header}
                  >
                    {header}
                  </Table.HeadCell>
                );
              })}
            </Table.Head>
            <Table.Body>
              {/* {console.log(registrants)} */}
              {filtered &&
                filtered.map((item) => {
                  return (
                    <Table.Row key={item.registrant_id}>
                      <Table.Cell className="text-center">
                        {item.first_name}
                      </Table.Cell>
                      <Table.Cell align="center">{item.last_name}</Table.Cell>
                      <Table.Cell align="center">{item.date_reg}</Table.Cell>
                      <Table.Cell align="center">
                        {item.email_address}
                      </Table.Cell>
                      <Table.Cell align="center">
                        {item.mobile_number}
                      </Table.Cell>

                      <Table.Cell className="text-start  max-w-[350px] text-sm 4xl:text-3xl">
                        <div className="flex flex-col gap-2">
                          <p className="flex gap-2">
                            <span className="font-semibold">Name: </span>
                            <span>{item.ref_name}</span>
                          </p>
                          <p className="flex gap-2">
                            <span className="font-semibold">TIN No: </span>
                            <span>{item.tin_num}</span>
                          </p>
                        </div>
                      </Table.Cell>
                      <Table.Cell align="center">
                        {item.registration_type}
                      </Table.Cell>
                      <Table.Cell align="center">{item.title}</Table.Cell>
                      <Table.Cell align="center">{format(new Date(item.program_date), "yyyy-MM-dd")}</Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </div>
        <div>
          <Button className="ml-auto mr-5 my-3" color="gray" size="xl"
          onClick={()=>handleExport(filtered)}> Export </Button>
        </div>
      </div>
    </>
  );
}

export default Registrants;
