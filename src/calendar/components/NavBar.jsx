import { useAuthStore } from "../../hooks/useAuthStore";

export const NavBar = () => {
  const { startLogout, user } = useAuthStore();

  return (
<div className="navbar navbar-dark bg-dark mb-4 px-4 d-md-flex flex-md-row align-items-md-center flex-column align-items-center">
  <span className="navbar-brand text-center">
    <i className="fas fa-calendar-alt"></i>
    <br />
    R&M Estudio Contable
  </span>

  <span className="text-center text-white">{user.name}</span>

  <button className="btn btn-outline-danger mt-2" onClick={startLogout}>
    <i className="fas fa-sign-out-alt"></i>
    <span> Salir </span>
  </button>
</div>


  );
};
