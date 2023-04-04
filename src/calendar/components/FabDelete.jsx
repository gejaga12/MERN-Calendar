import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSeleted } = useCalendarStore();

  const handleDelete = () => {
    startDeletingEvent();
  };

  return (
    <button
      className="btn btn-danger fab-danger"
      style={{ display: hasEventSeleted ? "" : "none" }}
      onClick={handleDelete}
    >
      {" "}
      <i className="fas fa-trash-alt" />{" "}
    </button>
  );
};
