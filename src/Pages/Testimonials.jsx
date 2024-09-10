import {
  Button,
  Label,
  Spinner,
  Table,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import Admin from "../Admin";
import useTestimonials from "../Context/TestimonialsContext";

function Testimonials() {
  const {
    retrieveTestimonials,
    insertTestimonial,
    updateTestimonial,
    deleteTestimonial,
  } = useTestimonials();
  const [isLoading, setLoading] = useState(false);
  const [payments, setTestimonials] = useState(null);
  const [option, setOption] = useState({
    name: "",
    company: "",
    position: "",
    recommendation: "",
  });

  const [isEditing, toggleEdit] = useState(false);
  const [reload, setReload] = useState(0);
  const formRef = useRef();

  const handleUpdateClick = async (e) => {
    e.preventDefault();
    // console.log(option);
    const response = await updateTestimonial(option);
    console.log(response);
    alert(response);
    handleClearClick();
    setReload((count) => {
      return count + 1;
    });
  };
  const handleDeleteClick = async (id) => {
    const response = await deleteTestimonial(id);
    console.log(response);
    alert(response);
    handleClearClick();
    setReload((count) => {
      return count + 1;
    });
  };

  const handleAddClick = async (e) => {
    e.preventDefault();

    if (Object.values(option).some((value) => value === "")) {
      alert("Please complete fields");
      return;
    }
    const response = await insertTestimonial(option);
    console.log(response);
    alert(response);
    handleClearClick();
    setReload((count) => {
      return count + 1;
    });
  };
  const handleClearClick = () => {
    formRef.current.reset();
    setOption({
      name: "",
      company: "",
      position: "",
      recommendation: "",
    });
    toggleEdit(false);
  };

  const onInputChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;

    setOption((prev) => {
      return { ...prev, [key]: value };
    });
  };

  useEffect(() => {
    const setup = async () => {
      const response = await retrieveTestimonials();
      setTestimonials(response);
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
        <p className="text-center text-[#DF0000] text-3xl 4xl:text-5xl font-bold mb-6">
          TESTIMONIALS
        </p>
        <form
          className="flex flex-col gap-4 w-full lg:max-w-[85%] mx-auto"
          encType="multipart/form-data"
          ref={formRef}
        >
          <div className="flex flex-col">
            {Object.keys(option)
              .filter((key) => key !== "testimonial_id" && key !== "status")
              .map((key) => {
                let label =
                  key === "recommendation"
                    ? "testimony"
                    : key.split("_").join(" ");
                return (
                  <div key={key} className="relative">
                    <Label htmlFor={key} value={label} className="capitalize" />
                    {key !== "recommendation" ? (
                      <TextInput
                        id={key}
                        value={option[key]}
                        onChange={onInputChange}
                        className="peer group"
                      />
                    ) : (
                      <Textarea
                        id={key}
                        value={option[key]}
                        onChange={onInputChange}
                        className="peer group"
                      />
                    )}
                  </div>
                );
              })}
          </div>
          <div className="flex gap-4 items-center justify-center w-full lg:w-1/3 py-4 lg:ml-auto">
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
              type="reset"
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
              {["Name", "Testimony", "Company", "Position", "Actions"].map(
                (header) => {
                  return (
                    <Table.HeadCell
                      key={header}
                      className="bg-[#445462] text-white p-4"
                    >
                      {header}
                    </Table.HeadCell>
                  );
                }
              )}
            </Table.Head>
            <Table.Body>
              {payments &&
                payments.map((item) => (
                  <Table.Row
                    key={item.payment_id}
                    className="text-black hover:bg-gray-100 text-center"
                  >
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.recommendation}</Table.Cell>
                    <Table.Cell>{item.company}</Table.Cell>
                    <Table.Cell>{item.position}</Table.Cell>
                    <Table.Cell className="text-center">
                      <div className="flex gap-4 justify-center">
                        <Button
                          color="dark"
                          className="xl:w-1/4"
                          onClick={() => {
                            toggleEdit(true);
                            setOption({
                              testimonial_id: item.testimonial_id,
                              name: item.name,
                              company: item.company,
                              position: item.position,
                              recommendation: item.recommendation,
                            });
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          color="gray"
                          className="xl:w-1/4"
                          onClick={() => {
                            const response = confirm(
                              "Are you user you want to delete this testimony?"
                            );
                            if (response) {
                              handleDeleteClick(item.testimonial_id);
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

export default Testimonials;
