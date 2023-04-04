import { useUiStore, useCalendarStore } from "../../hooks";
import { addHours } from 'date-fns';

export const FabAddNew = () => {

  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Gerardo",
      },
    });
    openDateModal();
  };

  return (
    <button className="btn btn-danger fab" onClick={handleClickNew}>
      {" "}
      <i className="fas fa-plus" />{" "}
    </button>
  );
};
