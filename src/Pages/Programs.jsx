import React, { useEffect, useRef, useState } from "react";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import { BiSolidImageAdd } from "react-icons/bi";
import "react-datepicker/dist/react-datepicker.css";
import Admin from "../Admin";
import {
  Button,
  Datepicker,
  FileInput,
  Label,
  Select,
  Spinner,
  Table,
  TextInput,
  Textarea,
} from "flowbite-react";
import usePrograms from "../Context/ProgramsContext";
import { format } from "date-fns";

function Programs() {
  let host = "http://localhost/inspiredb";
  host = "https://new.inspireleaders.com.ph/api";
  const sizes = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 32, 36, 40, 48, 72,
  ];
  const { retrievePrograms, insertProgram, updateProgram, deleteProgram } =
    usePrograms();
  const [isLoading, toggleLoading] = useState(false);
  const [reload, toggleReload] = useState(0);
  const [programs, setPrograms] = useState(null);
  const [program, setProgram] = useState({
    title: "",
    program_date: new Date(),
    time_start: new Date(),
    time_end: new Date(),
    registration_cutoff_date: new Date(),
    audience_size: 0,
    facilitator: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const textInput = useRef();
  const descriptionRef = useRef();

  const applyStyle = (style, value = null) => {
    if (value) {
      document.execCommand(style, false, value);
    } else {
      document.execCommand(style, false, null);
    }
  };
  const changeFontSize = (event) => {
    const fontSize = event.target.value;
    applyStyle("fontSize", fontSize);
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.className = "max-w-[400px]";
      img.alt = "Uploaded Image";
      textInput.current.appendChild(img);
      // Optionally, you can also update the content state here
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    let currentDate;
    let { id, value } = e.target;
    console.log(value);
    if (id.startsWith("time")) {
      const [hour, min] = value.split(":");
      currentDate = new Date(program.program_date);
      currentDate.setHours(hour);
      currentDate.setMinutes(min);
      value = currentDate;
    }
    setProgram((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  const handleProgramSubmit = async (e) => {
    e.preventDefault();
    toggleLoading((prev) => !prev);
    const newProgram = { ...program };
    let response;
    newProgram.overview = descriptionRef.current.value;
    newProgram.content = JSON.stringify(textInput.current.innerHTML);
    newProgram.date_reg_limit = newProgram.registration_cutoff_date;
    newProgram.num_reg_limit = newProgram.audience_size;
    newProgram.time_start = format(
      new Date(newProgram.time_start),
      "yyyy-MM-dd HH:mm:ss"
    );
    newProgram.time_end = format(
      new Date(newProgram.time_end),
      "yyyy-MM-dd HH:mm:ss"
    );

    console.log(newProgram);
    if (program.program_id) {
      response = await updateProgram(
        program.program_id,
        newProgram,
        typeof image === "object" ? image : null
      );
    } else {
      response = await insertProgram(newProgram, image);
    }
    console.log(response);
    alert(response);
    handleClear();
    toggleLoading((prev) => !prev);
    toggleReload((prev) => {
      return prev + 1;
    });
  };

  const handleDeleteProgram = async (id) => {
    const response = await deleteProgram(id);
    alert(response);
    toggleReload((count) => {
      return count + 1;
    });
    handleClear();
  };
  const handleClear = () => {
    setProgram({
      title: "",
      program_date: new Date(),
      time_start: new Date(),
      time_end: new Date(),
      registration_cutoff_date: new Date(),
      audience_size: 0,
      facilitator: "",
      category: "",
    });
    descriptionRef.current.value = "";
    textInput.current.innerHTML = "";
    setImage(null);
  };
  useEffect(() => {
    const setup = async () => {
      const results = await retrievePrograms();
      setPrograms(results);
    };
    setup();
  }, [reload]);
  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-[10] flex items-center justify-center pointer-events-auto">
          <Spinner className="animate-spin" size="xl" color="failure" />
        </div>
      )}
      <Admin />
      <div className="md:ml-[20rem] p-8">
        <div className="text-center text-[#DF0000] text-3xl 4xl:text-5xl font-bold mb-6">
          PROGRAMS
        </div>
        <form
          className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-md"
          encType="multipart/form-data"
          onSubmit={handleProgramSubmit}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title" value="Program Title" />
              <TextInput
                id="title"
                value={program.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="cover" value="Cover Photo" />
              <FileInput
                id="cover"
                accept="image/*"
                onChange={handleImageChange}
              />

              {image && (
                <img
                  src={
                    typeof image === "object"
                      ? URL.createObjectURL(image)
                      : `${host}${image}`
                  }
                  alt="Uploaded Image"
                  className="w-full max-w-[300px] h-auto border mb-4 rounded-lg"
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="category" value="Category" />
              <Select id="category" onChange={handleInputChange}>
                <option disabled selected={program.category == ""}>
                  --Select Category--
                </option>
                <option value={1} selected={program.category == 1}>
                  INSPIRE&apos;S LEADERSHIP SIGNATURE PROGRAMS
                </option>
                <option value={2} selected={program.category == 2}>
                  INSPIRE&apos;S SIGNATURE SALES PROGRAMS
                </option>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="program_date" value="Program Schedule" />
              <input
                type="date"
                id="program_date"
                className="bg-gray-50 border-gray-300 rounded-lg"
                value={
                  program.program_date
                    ? format(new Date(program.program_date), "yyyy-MM-dd")
                    : format(new Date(), "yyyy-MM-dd")
                }
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="registration_cutoff_date"
                value="Registration Cut-off Date"
              />
              <input
                type="date"
                id="registration_cutoff_date"
                className="bg-gray-50 border-gray-300 rounded-lg"
                value={
                  program.registration_cutoff_date
                    ? format(
                        new Date(program.registration_cutoff_date),
                        "yyyy-MM-dd"
                      )
                    : format(new Date(), "yyyy-MM-dd")
                }
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-2 w-full">
              <div className="flex flex-col gap-2 w-full max-w-1/2">
                <Label htmlFor="time_start" value="Start Time" />
                {/* {console.log(program.time_start)} */}
                <input
                  type="time"
                  id="time_start"
                  className="w-full bg-gray-50 border-gray-300 rounded-lg"
                  value={
                    program.time_start
                      ? format(new Date(program.time_start), "HH:mm")
                      : format(new Date(), "Future Fit:mm")
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-2 w-full max-w-1/2">
                <Label htmlFor="time_end" value="End Time" />
                <input
                  type="time"
                  id="time_end"
                  className="w-full bg-gray-50 border-gray-300 rounded-lg"
                  value={
                    program.time_end
                      ? format(new Date(program.time_end), "HH:mm")
                      : format(new Date(), "HH:mm")
                  }
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="audience_size" value="Audience Size" />
              <TextInput
                type="number"
                id="audience_size"
                value={program.audience_size}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="facilitator" value="Facilitator" />
              <TextInput
                id="facilitator"
                value={program.facilitator}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description" value="Overview" />
              <Textarea id="description" ref={descriptionRef} />
            </div>
            <Label htmlFor="content" value="Content" />
            <div className="flex flex-col gap-4">
              <section className="flex gap-2">
                <Button.Group>
                  <Button color="gray" onClick={() => applyStyle("bold")}>
                    <FaBold />
                  </Button>
                  <Button color="gray" onClick={() => applyStyle("underline")}>
                    <FaUnderline />
                  </Button>
                  <Button color="gray" onClick={() => applyStyle("italic")}>
                    <FaItalic />
                  </Button>
                </Button.Group>
                {/* <Label htmlFor="textsize" value="Font Size: "/> */}
                <Select id="textsize" onChange={changeFontSize}>
                  {sizes.map((size) => {
                    return (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    );
                  })}
                </Select>

                <label
                  htmlFor="file"
                  className="h-full text-gray-900 flex items-center justify-center cursor-pointer bg-white hover:bg-gray-100 hover:text-cyan-700 transition-all border border-gray-300 px-4 py-3 rounded-lg"
                >
                  <BiSolidImageAdd />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </section>
              <div
                contentEditable
                className="min-h-36 max-h-[500px] overflow-y-auto p-4 outline-none bg-gray-100 rounded-lg border border-gray-300"
                ref={textInput}
              ></div>
            </div>
          </div>
          <div className="col-span-2 flex gap-2 justify-end">
            {program.program_id ? (
              <Button type="submit" color="blue">
                Save Changes
              </Button>
            ) : (
              <Button type="submit" color="failure">
                Create Program
              </Button>
            )}
            <Button type="reset" color="light" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </form>
        <hr className="mt-10 border-gray-400 w-full max-w-[400px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1300px] mx-auto" />
        <div className="h-full max-h-[450px] 2xl:max-h-[550px] overflow-y-auto mt-4 rounded-lg shadow-lg">
          <Table className="min-w-full bg-white" hoverable>
            <Table.Head className="sticky top-0 text-center z-[1]">
              {["program name", "poster", "overview", "date", "actions"].map(
                (header) => {
                  return (
                    <Table.HeadCell
                      className="bg-[#445462] text-white p-4 capitalize"
                      key={header}
                    >
                      {header}
                    </Table.HeadCell>
                  );
                }
              )}
            </Table.Head>
            <Table.Body>
              {/* {console.log(programs)} */}
              {programs &&
                programs.map((item) => {
                  return (
                    <Table.Row key={item.program_id}>
                      <Table.Cell className="text-center text-gray-950">
                        <p className=" font-medium text-xl">{item.title}</p>
                        {`by: ${item.facilitator}`}
                      </Table.Cell>
                      <Table.Cell align="center">
                        {item.image && (
                          <img
                            src={`${host}${item.image}`}
                            alt="Uploaded Image"
                            className="w-40 h-auto rounded-lg"
                          />
                        )}
                      </Table.Cell>
                      <Table.Cell className="max-w-[350px] text-sm 4xl:text-3xl whitespace-break-spaces indent-6 text-justify">
                        {item.overview.substring(0, 400) + "..."}
                      </Table.Cell>
                      <Table.Cell className="text-start  max-w-[350px] text-sm 4xl:text-3xl">
                        <div className="flex flex-col gap-2">
                          <p className="flex gap-2">
                            <span className="font-semibold">Date: </span>
                            <span>
                              {format(
                                new Date(item.program_date),
                                "MMM d, yyy"
                              )}
                            </span>
                          </p>
                          <p className="flex gap-2">
                            <span className="font-semibold">Time: </span>
                            <span>
                              {[
                                format(new Date(item.time_start), "hh:mm a"),
                                format(new Date(item.time_end), "hh:mm a"),
                              ].join(" - ")}
                            </span>
                          </p>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        <div className="flex gap-4 justify-center">
                          <Button
                            color="dark"
                            onClick={() => {
                              // console.log(item.images);
                              setProgram(item);
                              setImage(item.image);
                              descriptionRef.current.value = item.overview;
                              textInput.current.innerHTML = JSON.parse(
                                item.description
                              );
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            color="gray"
                            onClick={() => {
                              const response = confirm(
                                "Are you user you want to delete this program?"
                              );
                              if (response) {
                                handleDeleteProgram(item.program_id);
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Programs;
