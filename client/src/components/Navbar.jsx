import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkIsAuth } from "../redux/features/auth/authSelector";
import { logout } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();

  const handlerLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("Ви вийшли з системи");
  };

  const activeStyle = {
    color: "white",
  };

  const isAuth = useSelector(checkIsAuth);

  return (
    <div className="flex py-4 justify-between items-center">
      <span className="flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm">
        @
      </span>

      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              className="text-xs text-gray-400 hover:text-white"
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Головна
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-xs text-gray-400 hover:text-white"
              to="posts"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Мої пости
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-xs text-gray-400 hover:text-white"
              to="new"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Додати пост
            </NavLink>
          </li>
        </ul>
      )}
      <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
        {isAuth ? (
          <button onClick={handlerLogout}>Вийти</button>
        ) : (
          <Link to={"/login"}>Увійти</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
