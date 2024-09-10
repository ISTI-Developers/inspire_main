import React, { useEffect, useRef, useState } from "react";
import Admin from "../Admin";
import {
  Button,
  FileInput,
  Label,
  Table,
  TextInput,
  Textarea,
} from "flowbite-react";
import useExperts from "../Context/ExpertsContext";

function Experts() {
  let host = "http://localhost/inspiredb";
  host = "https://new.inspireleaders.com.ph/api";
  const { insertExpert, retrieveExperts, updateExpert, deleteExpert } =
    useExperts();
  const [image, setImage] = useState([]);
  const [experts, setExperts] = useState(null);
  const [reload, setReload] = useState(0);
  const [expert, setExpert] = useState({
    name: "",
    description: "",
    biography: "",
  });
  const descriptionRef = useRef(null);
  const biographyRef = useRef(null);
  const formRef = useRef(null);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const fileList = [];
    for (const file of files) {
      fileList.push(file);
    }
    setImage((prev) => {
      return [...prev, ...fileList];
    });
  };

  const handleClear = () => {
    formRef.current.reset();
    setImage([]);
    setExpert({
      name: "",
      description: "",
      biography: "",
    });
  };

  const handleInsertExpert = async (e) => {
    e.preventDefault();
    const newData = { ...expert };
    newData.description = descriptionRef.current.value;
    newData.biography = biographyRef.current.value;
    let response = "";
    if ("expert_id" in newData) {
      response = await updateExpert(newData.expert_id, image, newData);
    } else {
      response = await insertExpert(image, newData);
    }

    console.log(response);
    alert(response);
    setReload((count) => {
      return count + 1;
    });
    handleClear();
  };

  const handleExpertChange = (e) => {
    setExpert((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };
  const handleDeleteExpert = async (id) => {
    const response = await deleteExpert(id);
    alert(response);
    setReload((count) => {
      return count + 1;
    });
    handleClear();
  };
  useEffect(() => {
    const setup = async () => {
      const results = await retrieveExperts();
      setExperts(
        results.map((res) => {
          return {
            ...res,
            images: JSON.parse(res.images),
          };
        })
      );
    };
    setup();
  }, [reload]);
  return (
    <>
      <Admin />
      <div className="md:ml-[20rem] p-8">
        <div className="text-center text-[#DF0000] text-3xl 4xl:text-5xl font-bold mb-6">
          EXPERTS
        </div>
        <form
          className="grid lg:grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-md"
          encType="multipart/form-data"
          onSubmit={handleInsertExpert}
          ref={formRef}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="images" value="Select Images" />
            <FileInput
              required={!expert.expert_id}
              id="images"
              onChange={handleImageChange}
              multiple
              accept="image/*"
              className="pb-2"
            />
            {image.length !== 0 ? (
              <div className="h-full flex gap-4 items-start bg-slate-200 rounded-lg p-4 w-full overflow-x-auto">
                {image.map((file, index) => {
                  return (
                    <div
                      className="relative group"
                      key={typeof file === "object" ? file.name : file}
                    >
                      <img
                        src={
                          typeof file === "object"
                            ? URL.createObjectURL(file)
                            : `${host}${file}`
                        }
                        className=" w-full min-w-[10rem] max-w-[12rem] h-auto rounded-lg cursor-pointer"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const tempImages = [...image];
                          tempImages.splice(index, 1);
                          setImage(tempImages);
                        }}
                        className="absolute top-0 left-0 bg-black text-white w-full h-full font-semibold opacity-0 group-hover:opacity-50 pointer-events-none group-hover:pointer-events-auto transition-all cursor-pointer rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="h-full text-sm flex items-center justify-center text-slate-600 bg-slate-200 rounded-lg font-semibold">
                Files will be shown here once you upload them.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" value="Expert Name" />
            <TextInput
              id="name"
              value={expert.name}
              onChange={handleExpertChange}
              className="mb-2"
              required
            />
            <Label htmlFor="description" value="Short Description" />
            <Textarea
              required
              id="description"
              ref={descriptionRef}
              className="mb-2"
            />
            <Label htmlFor="biography" value="Biography" />
            <Textarea
              required
              id="biography"
              ref={biographyRef}
              className="min-h-[150px]"
            />
          </div>
          <div className="col-span-2 flex gap-2 justify-end">
            {expert.expert_id ? (
              <Button type="submit" color="blue">
                Save Changes
              </Button>
            ) : (
              <Button type="submit" color="failure">
                Add Expert
              </Button>
            )}
            <Button type="reset" color="light" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </form>
        <hr className="border-gray-400 w-full my-5 max-w-[400px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1300px] mx-auto" />
        <div className="h-full max-h-[450px] 2xl:max-h-[550px] overflow-y-auto mt-4 rounded-lg shadow-lg">
          <Table className="min-w-full bg-white" hoverable>
            <Table.Head className="sticky top-0 text-center z-[1]">
              {["images", "name", "description", "biography", "actions"].map(
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
              {experts &&
                experts.map((item) => (
                  <Table.Row
                    key={item.client_id}
                    className="text-black text-xl hover:bg-gray-100"
                  >
                    <Table.Cell align="center">
                      {item.images && (
                        <img
                          src={`${host}${item.images[0]}`}
                          alt="Uploaded Image"
                          className="w-40 h-auto rounded-lg"
                        />
                      )}
                    </Table.Cell>
                    <Table.Cell className="text-center font-medium 4xl:text-3xl">
                      {item.name}
                    </Table.Cell>
                    <Table.Cell className="text-start  max-w-[350px] text-sm 4xl:text-3xl">
                      {item.description}
                    </Table.Cell>
                    <Table.Cell className=" max-w-[400px] text-start text-sm 4xl:text-3xl indent-4 whitespace-break-spaces">
                      {item.biography.substring(0,300)+ "..."}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <div className="flex gap-4 justify-center">
                        <Button
                          color="dark"
                          onClick={() => {
                            console.log(item.images);
                            setImage(item.images);
                            setExpert(item);
                            descriptionRef.current.value = item.description;
                            biographyRef.current.value = item.biography;
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          color="gray"
                          onClick={() => {
                            const response = confirm(
                              "Are you user you want to delete this person?"
                            );
                            if (response) {
                              handleDeleteExpert(item.expert_id);
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Experts;
