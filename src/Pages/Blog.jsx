import { useEffect, useState } from "react";
import useBlogs from "../Context/BlogsContext";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

function Blog() {
  let host = "http://localhost/inspiredb";
  // host = "https://new.inspireleaders.com.ph/api";
  const { id } = useParams();
  const { retrieveBlog } = useBlogs();
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    const setup = async () => {
      const results = await retrieveBlog(id);
      console.log(results);
      setBlog(results);
    };
    setup();
  }, [id]);
  return (
    blog && (
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-full overflow-hidden flex flex-col gap-2">
          <img
            src={`${host}${blog.image}`}
            alt=""
            className="self-stretch w-full aspect-[2.33] max-md:max-w-full"
          />
          <h3 className="text-2xl font-bold text-[#DF0000]">{blog.title}</h3>
          <p className="font-semibold text-gray-500">
            {format(new Date(blog.date_uploaded), "MMMM d, yyyy '|' hh:mm a")}
          </p>
        </div>
        <div>
          <div
            dangerouslySetInnerHTML={{ __html: JSON.parse(blog.file_path) }}
          ></div>
        </div>
      </div>
    )
  );
}

export default Blog;
