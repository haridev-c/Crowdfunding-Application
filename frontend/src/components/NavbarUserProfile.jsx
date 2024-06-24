import React, { useContext } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../GlobalStateRepository";

function NavbarUserProfile() {
  const navigate = useNavigate();

  const { setUser } = useContext(GlobalContext);

  const handleLogout = () => {
    axios
      .post("/user/logout")
      .then(({ data }) => {
        alert(data.serverMsg);
        setUser(null);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex rounded-full hover:shadow-lg">
      <Menu>
        <MenuButton
          className={"flex rounded-full bg-[#6A994E] p-2 text-[#F2E8CF]"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 rounded-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </MenuButton>
        <Transition
          enter="duration-200 ease-out"
          enterFrom="scale-95 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="duration-300 ease-out"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-95 opacity-0"
        >
          <MenuItems
            anchor="bottom"
            className="mt-3 w-52 origin-top text-nowrap rounded-lg bg-[#E9F1E4] p-2 shadow-lg transition"
          >
            <MenuItem>
              <Link
                to={"/create-new-fundraiser"}
                className="my-1 block w-full rounded p-1 font-bold text-[#386641] data-[focus]:bg-[#A7C957] md:hidden"
              >
                Start a Fundraiser
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to={"/dashboard"}
                className="my-1 block w-full rounded p-1 font-bold text-[#386641] data-[focus]:bg-[#A7C957]"
              >
                My Profile
              </Link>
            </MenuItem>
            <MenuItem>
              <button
                onClick={handleLogout}
                className="my-1 block w-full rounded p-1 text-left font-bold text-[#B44143] data-[focus]:bg-[#E9D9AF]"
              >
                Logout
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}

export default NavbarUserProfile;
