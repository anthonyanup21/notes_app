import React from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router";
const Navbar = () => {
  return (
    <div className="bg-base-300 w-full">
      {/*desktop view*/}
      <div className="hidden md:flex justify-between items-center p-5 px-10">
        <div className="font-extrabold text-2xl text-success">ThinkBoard</div>
        <Link to="/create">
          <button className="btn btn-success p-3">
            <IoMdAdd /> New Note
          </button>
        </Link>
      </div>

      {/*mobile view */}
      <div className="md:hidden p-5 px-10">
        <Link to="/create">
          <button className="btn btn-success p-3">
            <IoMdAdd /> New Note
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
