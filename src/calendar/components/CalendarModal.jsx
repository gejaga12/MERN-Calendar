import { useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useUiStore } from "../../hooks";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const [formSubmitted, setformSubmitted] = useState(false);
  const [formValue, setFormValue] = useState({
    title: "Gerardo",
    notes: "Estudia React Native",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValue.title.length > 0 ? "" : "is-invalid";
  }, [formValue.title, formSubmitted]);

  const onInputChange = ({ target }) => {
    setFormValue({
      ...formValue,
      [target.name]: target.value,
    });
  };

  const onDateChange = (event, changing) => {
    setFormValue({ ...formValue, [changing]: event });
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setformSubmitted(true);
    const difference = differenceInSeconds(formValue.end, formValue.start);
    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");
      return;
    }
    if (formValue.title.length <= 0) return;
    console.log(formValue);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValue.start}
            className="form-control"
            onChange={(event) => onDateChange(event, "start")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValue.start}
            selected={formValue.end}
            className="form-control"
            onChange={(event) => onDateChange(event, "end")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={` form-control ${titleClass} `}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValue.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValue.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
