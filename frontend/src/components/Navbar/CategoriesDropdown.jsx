import React from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

function CategoriesDropdown() {
  return (
    <div>
      <Menu>
        <MenuButton>Categories</MenuButton>
        <Transition
          enter="duration-200 ease-out"
          enterFrom="scale-95 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="duration-300 ease-out"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-95 opacity-0"
        >
          <MenuItems>
            <MenuItem>Medical</MenuItem>
            <MenuItem>Education</MenuItem>
            <MenuItem>Sports</MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}

export default CategoriesDropdown;
