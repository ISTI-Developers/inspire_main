import React, { useState, useEffect } from "react";
import moment from "moment";
import { Calendar as Cal, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "../CustomToolbar";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import usePrograms from "../../Context/ProgramsContext";
import Header from "../Header";
import "tailwindcss/tailwind.css"; 

const Calendar = () => {
  const navigate = useNavigate();
  const localizer = momentLocalizer(moment);
  const [programs, setPrograms] = useState(null);

  const eventPropGetter = (event) => {
    const defaultBackground = "#DF0000";
    const style = {
      backgroundColor: event.backgroundColor ? event.backgroundColor : defaultBackground,
      color: "white",
    };
    return { style };
  };

  const { retrievePrograms } = usePrograms();
  useEffect(() => {
    const setup = async () => {
      const results = await retrievePrograms();
      setPrograms(
        results.map((result) => {
          const date = format(new Date(result.program_date), "yyyy-MM-dd");
          const startTime = format(new Date(result.time_start), "HH:mm");
          const endTime = format(new Date(result.time_end), "HH:mm");
          const startDate = new Date(`${date}T${startTime}`);
          const endDate = new Date(`${date}T${endTime}`);

          return {
            id: result.program_id,
            title: result.title,
            start: startDate,
            end: endDate,
          };
        })
      );
    };
    setup();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center px-16 py-20 text-8xl font-bold text-white whitespace-nowrap bg-white shadow-2xl max-md:px-5 max-md:text-4xl">
        <div className="justify-center p-2.5 mt-1.5 bg-[#DF0000] max-md:max-w-full max-md:text-4xl">
          CALENDAR
        </div>
      </div>
      <div className="w-full p-5 md:p-20">
        {programs && (
          <Cal
            className="border-2 rounded-lg shadow"
            localizer={localizer}
            events={programs}
            views={["month", "week", "day"]}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={eventPropGetter}
            selectable
            onSelectEvent={(e) => navigate(`/programs/${e.id}`)}
            onSelectSlot={(e) => console.log(e)}
            style={{ height: "600px" }}
            components={{
              toolbar: CustomToolbar,
            }}
          />
        )}
      </div>
    </>
  );
};

export default Calendar;
