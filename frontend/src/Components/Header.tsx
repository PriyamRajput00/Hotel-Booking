import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header: React.FC = () => {
  // Assume the context also provides a signOut function
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl text-white font-bold tracking-tighter hover:text-blue-200 transition-colors duration-200"
        >
          MyHoliday.com
        </Link>

        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link to="/my-booking" className="flex items-center text-white px-3 font-bold hover:bg-blue-600">My Booking</Link>
              <Link to="/my-hotels " className="flex items-center text-white px-3 font-bold hover:bg-blue-600">My Hotels</Link>
             <SignOutButton/>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="bg-white text-blue-600 font-bold px-4 py-2 rounded hover:bg-gray-100 transition-colors duration-200"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
