import { useState } from "react";
import { Link } from "react-router-dom";

// redux imports
import { useSelector } from "react-redux";

// component imports
import AuthenticatedUserControls from "./AuthenticatedUserControls";
import CategoriesDropdown from "./CategoriesDropdown";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user } = useSelector((state) => state.user);

  return (
    <nav className="bg-[#6A994E]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div id="test" className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-[#F2E8CF] hover:bg-[#6A994E] hover:text-[#F2E8CF] focus:bg-[#6A994E] focus:outline-none"
            >
              {/* Icon for menu button */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              {/* Icon for close button */}
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            {/* Brand Name and Logo */}
            <Link to={"/"} className="p-2">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-8"
                  src="https://cdn3.iconfinder.com/data/icons/parks-and-rec/400/parks-10-512.png"
                  alt="Your Logo"
                />
                <p className="mx-2 font-bold text-[#FFB703]">SparkFund</p>
              </div>
            </Link>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* Navigation Links */}
                <Link
                  to={"/"}
                  className="rounded-md px-3 py-2 text-sm font-medium text-[#F2E8CF] transition-all duration-500 hover:bg-[#8bc34a] hover:text-black"
                >
                  Home
                </Link>
                <Link
                  to={"/about"}
                  className="rounded-md px-3 py-2 text-sm font-medium text-[#F2E8CF] transition-all duration-500 hover:bg-[#8bc34a] hover:text-black"
                >
                  About
                </Link>

                <div className="rounded-md px-3 py-2 text-sm font-medium text-[#F2E8CF] transition-all duration-500 hover:bg-[#8bc34a] hover:text-black">
                  <CategoriesDropdown />
                </div>
              </div>
            </div>
          </div>
          {/* Login Button */}
          <div className="flex justify-end">
            {user ? (
              <div>
                <AuthenticatedUserControls />
              </div>
            ) : (
              <Link to={"/login"}>
                <button className="rounded bg-[#8bc34a] px-4 py-2 font-bold text-[#F2E8CF] transition-all duration-300 hover:shadow-lg">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <Link
            to={"/"}
            className="block rounded-md px-3 py-2 text-base font-medium text-[#F2E8CF] hover:bg-[#6A994E]"
          >
            Home
          </Link>
          <Link
            to={"/"}
            className="block rounded-md px-3 py-2 text-base font-medium text-[#F2E8CF] hover:bg-[#6A994E]"
          >
            About
          </Link>
          <Link className="block rounded-md px-3 py-2 text-base font-medium text-[#F2E8CF] hover:bg-[#6A994E]">
            <CategoriesDropdown />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
