import { FaArrowRight } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import useBlogs from "../Context/BlogsContext";
import Blog from "./Blog";

const BlogCard = ({ img, title, description, link }) => {
  return (
    <div className="flex flex-col justify-center w-full max-w-md px-4 py-5 text-black bg-white rounded-3xl hover:transform hover:scale-105 shadow-xl hover:shadow-2xl transition-transform duration-300">
      <img src={img} alt="" className="w-full aspect-[1.59] rounded-2xl" />
      <div className="mt-7 text-xl font-bold text-red-600">{title}</div>
      <div className="mt-2.5 text-base leading-5 text-justify">
        {description}
      </div>
      <Link
        to={`/blogs/${link}`}
        className="flex justify-center items-center mt-8 text-base text-black border-solid hover:underline border-black max-md:mt-10"
      >
        <span className="mr-2">Read more</span>
        <FaArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default function Blogs() {
  let host = "http://localhost/inspiredb";
  host = "https://new.inspireleaders.com.ph/api";
  const { retrieveBlogs } = useBlogs();
  const [blogs, setBlogs] = useState(null);
  useEffect(() => {
    const setup = async () => {
      const results = await retrieveBlogs();
      setBlogs(results);
    };
    setup();
  }, []);
  return (
    blogs && (
      <Routes>
        <Route
          path="/"
          element={
            <>
              {" "}
              <div
                className="flex justify-center items-center p-8 md:px-16 md:py-20 mt-10 text-8xl font-bold text-white whitespace-nowrap bg-white max-md:px-5 max-md:text-4xl"
                style={{ boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)" }}
              >
                <div className="justify-center px-5 py-3 mt-1.5 bg-[#DF0000] max-md:max-w-full md:text-6xl lg:text-7xl xl:text-8xl">
                  BLOGS
                </div>
              </div>
              {/* <div className="flex flex-col items-center px-5 py-10 mx-auto">
          <div className="text-2xl font-bold text-[#DF0000] max-md:max-w-full md:mb-6">
            RECENT BLOGS
          </div>
          <div className="grid gap-6 md:grid-cols-3 py-5">
            <BlogCard
              link="/blogtemplate"
              img={spot1}
              title="Spot and Take Action: How to Spot Office Burnouts"
              description="As a leader, you possess the role and power to maintain the well-being of your subordinates. By learning about the signs of exhaustion, it will be easier for you to spot them and find ways on how to avoid the burnout that leads to the total destruction of the employee."
            />
            <BlogCard
              img={key1}
              title="4 Key Traits You Must Possess to Become a Mindful Leader"
              description="As a leader, you possess the role and power to maintain the well-being of your subordinates. By learning about the signs of exhaustion, it will be easier for you to spot them and find ways on how to avoid the burnout that leads to the total destruction of the employee."
            />
            <BlogCard
              img={act1}
              title="5 Activities to Use Downtime More Effectively"
              description="As a leader, you possess the role and power to maintain the well-being of your subordinates. By learning about the signs of exhaustion, it will be easier for you to spot them and find ways on how to avoid the burnout that leads to the total destruction of the employee."
            />
          </div>
          <div className="mt-10 border-t border-gray-300 bg-opacity-30 w-full max-w-[1109px]" />
        </div> */}
              <div className="flex flex-col items-center px-5 py-5 mx-auto">
                <div className="text-2xl font-bold text-[#DF0000] max-md:max-w-full mb-6">
                  ALL BLOGS
                </div>
                <div className="flex gap-6 flex-wrap">
                  {blogs.map((blog) => {
                    console.log(blog);
                    return (
                      <BlogCard
                        key={blog.blog_id}
                        img={`${host}${blog.image}`}
                        title={blog.title}
                        description="As a leader, you possess the role and power to maintain the well-being of your subordinates. By learning about the signs of exhaustion, it will be easier for you to spot them and find ways on how to avoid the burnout that leads to the total destruction of the employee."
                        link={blog.blog_id}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          }
        />
        <Route path="/:id" element={<Blog />} />
      </Routes>
    )
  );
}
