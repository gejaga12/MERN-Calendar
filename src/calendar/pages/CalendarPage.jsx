import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addHours } from "date-fns";
import { NavBar, CalendarEvent } from "../";
import { localizer, getMessagesES } from "../../helpers";


const events = [
  {
    title: "Programar en JavaScript",
    notes: "Siempre con TypeScript",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      _id: "1",
      name: "Gerardo",
    },
  },
];

export const CalendarPage = () => {

  const eventStyleEvent = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return { style };
  };

  return (
    <>
      <NavBar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px )" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleEvent}
        components= {{
          event: CalendarEvent
        }}
      />
    </>
  );
};
