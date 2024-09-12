import PropTypes from "prop-types";

function Header({ title }) {
  return (
    <div
      className="flex justify-center items-center text-8xl font-bold text-white whitespace-nowrap bg-white shadow-2xl w-full py-20"
      style={{ boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)" }}
    >
      <p className="justify-center p-4 px-6 bg-[#DF0000] uppercase ">{title}</p>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
