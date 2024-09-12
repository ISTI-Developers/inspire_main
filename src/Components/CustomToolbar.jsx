import PropTypes from "prop-types";
import { Button } from "flowbite-react";
import { format, isThisMonth } from "date-fns";
import classNames from "classnames";

function CustomToolbar({ onNavigate, onView, date, view }) {
  const navigations = ["previous", "today", "next"];
  const views = ["month", "week", "day"];

  const handleNavigation = (where) => {
    onNavigate(where);
  };
  const handleViewChange = (view) => {
    onView(view);
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-2 gap-2">
      <Button.Group className="w-full md:w-fit">
        {navigations.map((loc, index) => {
          return (
            <Button
              className={classNames(
                "w-full disabled:bg-black capitalize text-white bg-[#ff9f9f] hover:bg-[#DF0000]",
                loc === "today" &&
                  isThisMonth(new Date(date)) &&
                  "bg-[#DF0000] disabled:bg-[#DF0000]"
              )}
              type="submit"
              color="transparent"
              key={index}
              disabled={loc === "today" && isThisMonth(new Date(date))}
              onClick={() =>
                handleNavigation(
                  loc === "previous" ? "PREV" : loc.toUpperCase()
                )
              }
            >
              {loc === "previous" ? "<" : loc === "next" ? ">" : loc}
            </Button>
          );
        })}
      </Button.Group>
      <h1 className="text-center font-bold ">
        {format(new Date(date), "MMMM dd, yyyy")}
      </h1>
      <Button.Group className="w-full md:w-fit">
        {views.map((item, index) => {
          return (
            <Button
              className={classNames(
                "w-full text-white  disabled:bg-black capitalize bg-[#ff9f9f] hover:bg-[#DF0000] hover:text-white",
                item === view && "bg-[#DF0000]"
              )}
              type="submit"
              color="transparent"
              key={index}
              onClick={() => handleViewChange(item)}
            >
              {item}
            </Button>
          );
        })}
      </Button.Group>
    </div>
  );
}

CustomToolbar.propTypes = {
  onNavigate: PropTypes.func,
  onView: PropTypes.func,
  date: PropTypes.object,
  view: PropTypes.string,
};

export default CustomToolbar;
