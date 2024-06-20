import React from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

function NavbarUserProfile() {
  return (
    <Menu>
      <MenuButton className={"rounded-full bg-[#4a6283] p-2 text-white"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
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
          className="mt-3 w-52 origin-top text-nowrap rounded-lg bg-slate-200 p-2 transition"
        >
          <MenuItem>
            <a
              className="my-1 block rounded p-1 data-[focus]:bg-blue-100"
              href="/settings"
            >
              My Dashboard
            </a>
          </MenuItem>
          <MenuItem>
            <a
              className="my-1 block rounded p-1 data-[focus]:bg-blue-100"
              href="/support"
            >
              Logout
            </a>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

export default NavbarUserProfile;
