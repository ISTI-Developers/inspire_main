import { useRef } from "react";
import logo1 from "../src/assets/logo1.png";
import { Button, TextInput } from "flowbite-react";
import useLogin from "./Context/LoginContext";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const { insertCredentials } = useLogin();
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();
  const login = async (e) => {
    e.preventDefault();
    if (username === null || password === null) return;
    const response = await insertCredentials(
      username.current.value,
      password.current.value
    );
    username.current.value = null;
    password.current.value = null;
    if (response.success) {
      localStorage.setItem("isLoggedIn", true);
      navigate("/clients");
    } else {
      alert(response.message);
    }
  };
  const isAuthenticated = localStorage.getItem("isLoggedIn") ? true : false;

  return isAuthenticated ? (
    <Navigate to="/clients" />
  ) : (
    <div className="flex justify-center items-center min-h-screen py-10">
      <form
        onSubmit={login}
        className="bg-white p-10 rounded-3xl shadow-2xl border max-w-lg w-full"
      >
        <div className="text-center mb-6">
          <img
            src={logo1}
            alt="Logo"
            className="h-24 mx-auto mb-6"
            style={{ width: "auto" }}
          />
        </div>
        <div className="flex justify-center py-2 px-2 mx-auto rounded-xl  border-solid border-neutral-400 text-black text-opacity-60 w-full max-md:px-5 max-md:max-w-full items-center">
          <TextInput
            type="text"
            placeholder="Username"
            name="username"
            ref={username}
            className="w-full"
            required
          />
        </div>
        <div className="flex justify-center py-2 px-2 mx-auto rounded-xl  border-solid border-neutral-400 text-black text-opacity-60 w-full max-md:px-5 max-md:max-w-full items-center">
          <TextInput
            type="password"
            placeholder="Password"
            name="password"
            ref={password}
            className="w-full"
            required
          />
        </div>
        <br />
        <Button
          size="lg"
          className="w-full"
          theme={{
            color: {
              failure:
                "text-white bg-[#DF0000] border border-[#DF0000] enabled:hover:bg-transparent enabled:hover:text-[#DF0000] focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:text-white dark:border-red-600 dark:enabled:hover:bg-red-700 dark:enabled:hover:border-red-700 dark:focus:ring-red-700",
            },
          }}
          color="failure"
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
