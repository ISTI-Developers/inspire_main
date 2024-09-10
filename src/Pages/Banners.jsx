import {
  Button,
  Card,
  FileInput,
  Spinner,
  Table,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import Admin from "../Admin";
import useBanner from "../Context/BannersContext";

function Banners() {
  let host = "http://localhost/inspiredb";
  host = "https://new.inspireleaders.com.ph/api";
  const { retrieveBanners, insertBanner, updateBanner, deleteBanner } =
    useBanner();
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [banners, setBanners] = useState(null);
  const [banner, setBanner] = useState(null);

  const [isEditing, toggleEdit] = useState(false);
  const [reload, setReload] = useState(0);
  const nameRef = useRef();
  const formRef = useRef();

  const handleImageChange = (a) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const file = e.target.result;
      setImage(file);
      setFile(a.target.files[0]);
    };
    reader.readAsDataURL(a.target.files[0]);
  };

  const handleUpdateClick = async (e) => {
    e.preventDefault();
    const updatedBanner = { ...banner };
    updatedBanner.name = nameRef.current.value;
    const image = file ? file : null;
    const response = await updateBanner(
      updatedBanner.banner_id,
      updatedBanner.name,
      image
    );
    alert(response);
    handleClearClick();
    setReload((count) => {
      return count + 1;
    });
  };
  const handleDeleteClick = async (id) => {
    const response = await deleteBanner(id);
    alert(response);
    handleClearClick();
    setReload((count) => {
      return count + 1;
    });
  };

  const handleAddClick = async (e) => {
    e.preventDefault();
    const response = await insertBanner(nameRef.current.value, file);
    console.log(response);
    alert(response);
    handleClearClick();
    setReload((count) => {
      return count + 1;
    });
  };
  const handleClearClick = () => {
    setImage(null);
    setFile(null);
    nameRef.current.value = null;
    formRef.current.reset();
    toggleEdit(false);
  };

  useEffect(() => {
    const setup = async () => {
      const response = await retrieveBanners();
      setBanners(response);
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
          BANNERS
        </div>
        <form
          className="flex flex-col items-center gap-4 "
          encType="multipart/form-data"
          ref={formRef}
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
            placeholder="Name"
            ref={nameRef}
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
        <div className="p-4 flex flex-col gap-4">
          {/* <Table className="min-w-full bg-white" hoverable>
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
              {banners &&
                banners.map((item) => (
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
          </Table> */}
          <h3 className="text-lg font-bold">Banner Library</h3>
          <div className="grid grid-cols-3 bg-white p-4 gap-4">
            {banners &&
              banners.map((banner) => {
                return (
                  <Card
                    key={banner.banner_id}
                    imgSrc={`${host}${banner.banner}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold">{banner.name}</p>
                      <Button
                        color="dark"
                        className="xl:w-1/4 ml-auto"
                        size="xs"
                        onClick={() => {
                          setImage(`${host}${banner.banner}`);
                          nameRef.current.value = banner.name;
                          toggleEdit(true);
                          setBanner(banner);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        color="gray"
                        className="xl:w-1/4"
                        size="xs"
                        onClick={() => {
                          const response = confirm(
                            "Are you user you want to delete this banner?"
                          );
                          if (response) {
                            handleDeleteClick(banner.banner_id);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Banners;
