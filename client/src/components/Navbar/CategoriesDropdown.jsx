import { Link } from "react-router-dom";

// component and icon imports
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";

function CategoriesDropdown() {
  return (
    <div>
      <Menu>
        <MenuButton>
          <div className="flex items-center">
            Categories <FiChevronDown className="ml-2 mt-1" />
          </div>
        </MenuButton>
        <MenuItems
          anchor="bottom"
          transition
          className="mt-5 w-36 origin-top rounded bg-[#E9F1E4] p-2 shadow-lg transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem className="my-2 px-2 font-medium text-[#386641]">
            <Link
              className="block rounded px-4 transition-all duration-300 data-[focus]:bg-[#a7c957]"
              to={"/category/medical"}
            >
              Medical
            </Link>
          </MenuItem>
          <MenuItem className="my-2 px-2 font-medium text-[#386641]">
            <Link
              className="block rounded px-4 data-[focus]:bg-[#a7c957]"
              to={"/category/education"}
            >
              Education
            </Link>
          </MenuItem>
          <MenuItem className="my-2 px-2 font-medium text-[#386641]">
            <Link
              className="block rounded px-4 transition-all duration-300 data-[focus]:bg-[#a7c957]"
              to={"/category/sports"}
            >
              Sports
            </Link>
          </MenuItem>
          <MenuItem className="my-2 px-2 font-medium text-[#386641]">
            <Link
              className="block rounded px-4 transition-all duration-300 data-[focus]:bg-[#a7c957]"
              to={"/category/environment"}
            >
              Environment
            </Link>
          </MenuItem>
          <MenuItem className="my-2 px-2 font-medium text-[#386641]">
            <Link
              className="block rounded px-4 transition-all duration-300 data-[focus]:bg-[#a7c957]"
              to={"/category/emergency"}
            >
              Emergency
            </Link>
          </MenuItem>
          <MenuItem className="my-2 px-2 font-medium text-[#386641]">
            <Link
              className="block rounded px-4 transition-all duration-300 data-[focus]:bg-[#a7c957]"
              to={"/category/animal"}
            >
              Animal
            </Link>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}

export default CategoriesDropdown;
