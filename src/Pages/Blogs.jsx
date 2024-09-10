import { useEffect, useRef, useState } from "react";
import Admin from "../Admin";
import {
  Button,
  FileInput,
  Label,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import { BiSolidImageAdd } from "react-icons/bi";
import useBlogs from "../Context/BlogsContext";
import { format } from "date-fns";
function Blogs() {
  let host = "http://localhost/inspiredb";
  host = "https://new.inspireleaders.com.ph/api";
  const sizes = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 32, 36, 40, 48, 72,
  ];
  const { insertBlog, retrieveBlogs, updateBlog, deleteBlog } = useBlogs();
  const [blogs, setBlogs] = useState();
  const [blog, setBlog] = useState(null);
  const [isLoading, toggleLoading] = useState(false);
  const [reload, toggleReload] = useState(0);
  const textInput = useRef();
  const titleRef = useRef();
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => setImage(e.target.files[0]);

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

  const handleBlogSubmission = async (e) => {
    e.preventDefault();
    toggleLoading((prev) => !prev);
    const blogContent = textInput.current.innerHTML;
    let response = "";
    if (blog && blog.blog_id) {
      // console.log('for updating')
      response = await updateBlog(
        blog.blog_id,
        titleRef.current.value,
        JSON.stringify(blogContent),
        blog.file_id,
        image
      );
    } else {
      response = await insertBlog(
        titleRef.current.value,
        image,
        JSON.stringify(blogContent)
      );
    }

    // console.log(response);
    alert(response);
    toggleLoading((prev) => !prev);
    handleClear();
    toggleReload((prev) => {
      return prev + 1;
    });
  };

  const handleDeleteBlog = async (id) => {
    const response = await deleteBlog(id);
    alert(response);
    toggleReload((count) => {
      return count + 1;
    });
    handleClear();
  };

  const handleClear = () => {
    titleRef.current.value = "";
    textInput.current.innerHTML = "";
    setBlog(null);
    setImage(null);
  };

  useEffect(() => {
    const setup = async () => {
      const results = await retrieveBlogs();
      setBlogs(
        results.map((res) => {
          return {
            ...res,
            file_path: JSON.parse(res.file_path),
          };
        })
      );
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
          BLOGS
        </div>
        <form
          className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md"
          encType="multipart/form-data"
          onSubmit={handleBlogSubmission}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="title" value="Blog Title" />
            <TextInput
              id="title"
              placeholder="Make it catchy!"
              ref={titleRef}
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
                    : `${host + image}`
                }
                alt="Uploaded Image"
                className="w-full max-w-[300px] h-auto border mb-4 rounded-lg"
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="content" value="Blog Content" />
            <div className="flex flex-col gap-2">
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
                className="min-h-10 max-h-[500px] overflow-y-auto p-4 outline-none bg-gray-100 rounded-lg border border-gray-300"
                ref={textInput}
              ></div>
            </div>
          </div>
          <div className="col-span-2 flex gap-2 justify-end">
            {blog ? (
              <Button type="submit" color="blue">
                Save Changes
              </Button>
            ) : (
              <Button type="submit" color="failure">
                Upload Blog
              </Button>
            )}
            <Button type="reset" color="light" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </form>
        <hr className="border-gray-400 w-full my-5 max-w-[400px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1300px] mx-auto" />
        <div className="h-full max-h-[450px] 2xl:max-h-[550px] overflow-y-auto mt-4 flex flex-col gap-4">
          <p className="font-bold text-xl text-[#DF0000]">Blogs List</p>
          <ul className="bg-white w-full p-4 shadow-xl rounded-lg divide-y-2">
            {blogs &&
              blogs.map((post, index) => {
                return (
                  <li
                    key={post.file_id}
                    className="grid grid-cols-[.5fr_6fr_3fr_1fr] items-center p-4 hover:bg-slate-100 transition-all"
                  >
                    <span className="text-center">{`${index + 1}.`}</span>
                    <p className="font-semibold text-lg">{post.title}</p>
                    <p>
                      {format(
                        new Date(post.date_uploaded),
                        "MMMM d, yyy | hh:mm a"
                      )}
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button
                        color="dark"
                        onClick={() => {
                          setBlog(post);
                          setImage(post.image);
                          titleRef.current.value = post.title;
                          textInput.current.innerHTML = post.file_path;
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        color="gray"
                        onClick={() => {
                          const response = confirm(
                            "Are you user you want to delete this blog?"
                          );
                          if (response) {
                            handleDeleteBlog(post.blog_id);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Blogs;
