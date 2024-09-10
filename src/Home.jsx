import logo from "../assets/logo.png";

function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-black p-8 rounded-lg shadow-lg border max-w-lg w-full md:px-20">
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="h-16 mx-auto"
            style={{ width: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
