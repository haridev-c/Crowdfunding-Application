import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <div className="mt-auto flex h-24 items-center justify-around bg-[#6A994E] text-[#F2E8CF]">
      <div className="flex md:w-1/3">
        <div className="md:ml-10">&copy;SparkFund 2024</div>
      </div>
      <div className="hidden justify-center md:flex md:w-1/3"></div>
      <div className="flex justify-center md:w-1/3">
        <div className="flex">
          <FaFacebook className="mx-2" />
          <FaSquareInstagram className="mx-2" />
          <FaXTwitter className="mx-2" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
