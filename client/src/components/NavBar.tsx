import { NavLink } from "react-router-dom";

const NavBar = () => {
  const token = localStorage.getItem("token");
  const handleLogout = () => {   
    localStorage.removeItem("token");
    window.location.reload()
  }
  return (
    <div className="w-full flex justify-around items-center shadow-sm bg-white">
      <img src="/logo.jpg" className="w-24" />
      <div className="flex space-x-10">
        <NavLink to="/" className="text-lg hover:text-red-500 font-semibold">
          Home
        </NavLink>
        <NavLink
          to={"/about"}
          className="text-lg hover:text-red-500 font-semibold"
        >
          About
        </NavLink>
        <NavLink
          to={"/contact"}
          className="text-lg hover:text-red-500 font-semibold"
        >
          Contact
        </NavLink>
      </div>
      {!token ? (
        <div className="flex gap-5">
          <NavLink
            to={"/login"}
            className="text-lg bg-red-500 rounded-3xl px-7 text-white py-2 border-2 border-white hover:bg-white hover:text-red-500 hover:border-2 hover:border-red-500 font-semibold"
          >
            Login
          </NavLink>
          <NavLink
            to={"/signup"}
            className="text-lg bg-red text-red-500 rounded-3xl px-7 border-2 py-2   border-red-500  hover:text-white  hover:bg-red-500 font-semibold"
          >
            Signup
          </NavLink>
        </div>
      ):(
        <div className="flex gap-5">
          <button
            onClick={handleLogout}
            className="text-lg bg-red text-red-500 rounded-3xl px-7 border-2 py-2   border-red-500  hover:text-white  hover:bg-red-500 font-semibold"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
