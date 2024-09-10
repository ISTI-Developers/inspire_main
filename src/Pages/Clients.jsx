import React, { useEffect, useState } from "react";
import Admin from "../Admin";
import useClient from "../Context/ClientContext";
import { Button, FileInput, Table, TextInput } from "flowbite-react";

function Clients() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [client, setClient] = useState(null);
  const [isEditing, toggleEdit] = useState(false);
  const [reload, setReload] = useState(0);
  const { insertClient, retrieveClients, updateClient, deleteClient } =
    useClient();
  const [information, setInformation] = useState(null);

  let host = "http://localhost/inspiredb";
  host = "https://new.inspireleaders.com.ph/api";
  const handleImageChange = (a) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const file = e.target.result;
      setImage(file);
      setFile(a.target.files[0]);
    };
    reader.readAsDataURL(a.target.files[0]);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddClick = async () => {
    const insert = await insertClient(name, file);
    alert(insert);
    handleClearClick();
    setReload((count) => {
      return count + 1;
    });
  };

  const handleClearClick = () => {
    setImage(null);
    setName("");
    toggleEdit(false);
  };

  const handleUpdateClick = async () => {
    const response = await updateClient(client.client_id, name, file);
    alert(response);
    handleClearClick();
    setClient(null);
    setReload((count) => {
      return count + 1;
    });
  };
  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isEditing) {
        handleUpdateClick();
      } else {
        handleAddClick();
      }
    }
  };

  const handleDeleteClient = async (id) => {
    const response = await deleteClient(id);
    alert(response);
    handleClearClick();
    setClient(null);
    setReload((count) => {
      return count + 1;
    });
  };

  useEffect(() => {
    const setup = async () => {
      const data = await retrieveClients();
      setInformation(data);
    };
    setup();
  }, [reload]);

  return (
    <>
      <Admin />
      <div className="md:ml-[20rem] p-8">
        <div className="text-center text-[#DF0000] text-3xl 4xl:text-5xl font-bold mb-6">
          CLIENTS
        </div>

        <form
          className="flex flex-col items-center gap-4 "
          encType="multipart/form-data"
        >
          <FileInput onChange={handleImageChange} className="w-full lg:w-1/2" />
          {image && (
            <img
              src={image}
              alt="Uploaded Image"
              className="w-[15rem] h-auto rounded-lg"
            />
          )}
          <TextInput
            placeholder="Client Name"
            value={name}
            onKeyDown={handleEnterPress}
            onChange={handleNameChange}
            className="w-full lg:w-1/2"
          />
          <div className="flex gap-4 items-center justify-center w-full lg:w-1/2">
            {isEditing ? (
              <Button
                type="button"
                color="blue"
                onClick={handleUpdateClick}
                className="w-1/2"
              >
                Save Changes
              </Button>
            ) : (
              <Button
                type="button"
                color="failure"
                onClick={handleAddClick}
                className="w-1/2"
              >
                Add
              </Button>
            )}
            <Button
              type="button"
              color="light"
              onClick={handleClearClick}
              className="w-1/2"
            >
              Clear
            </Button>
          </div>
        </form>
        <hr className="border-gray-400 w-full mt-8 max-w-[400px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1300px] mx-auto" />
        <div className="h-full max-h-[450px] 2xl:max-h-[550px] overflow-y-auto mt-4 rounded-lg shadow-lg">
          <Table className="min-w-full bg-white" hoverable>
            <Table.Head className="sticky top-0 text-center z-[1]">
              <Table.HeadCell className="bg-[#445462] text-white p-4">
                Logo
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#445462] text-white p-4">
                Name
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#445462] text-white p-4">
                Actions
              </Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {information &&
                information.map((item) => (
                  <Table.Row
                    key={item.client_id}
                    className="text-black text-xl hover:bg-gray-100"
                  >
                    <Table.Cell align="center">
                      {item.images && (
                        <img
                          src={`${host}${item.images}`}
                          alt="Uploaded Image"
                          className="w-36 h-auto rounded-lg"
                        />
                      )}
                    </Table.Cell>

                    <Table.Cell className="text-center text-sm 4xl:text-3xl">
                      {item.brand}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      <div className="flex gap-4 justify-center">
                        <Button
                          color="dark"
                          className="xl:w-1/4"
                          onClick={() => {
                            setImage(`${host}${item.images}`);
                            setName(item.brand);
                            toggleEdit(true);
                            setClient(item);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          color="gray"
                          className="xl:w-1/4"
                          onClick={() => {
                            const response = confirm(
                              "Are you user you want to delete this client?"
                            );
                            if (response) {
                              handleDeleteClient(item.client_id);
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
      {/* </div> */}
    </>
  );
}

export default Clients;
