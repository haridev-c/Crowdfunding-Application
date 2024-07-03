import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <div className="mt-auto flex h-24 items-center justify-around bg-[#386641] text-[#F2E8CF]">
      <div className="flex md:mr-auto">
        <div className="md:ml-20">&copy;SparkFund 2024</div>
      </div>
      <div className="flex justify-center md:mr-20">
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
