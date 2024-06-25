import React, { useContext, useState } from "react";
import { GlobalContext } from "../GlobalStateRepository";
import axios from "axios";

function EditProfile() {
  const { user, setRenderGSR } = useContext(GlobalContext);
  const [name, setName] = useState(user.name);
  const [phoneNo, setPhoneNo] = useState(user.phoneNo);

  const imageUpload = (dp) => {
    const formData = new FormData();
    formData.append("profilePic", dp);
    formData.append("userID", user._id);

    axios.post("/user/update-dp", formData).then(({ data }) => {
      console.log(data);
      setRenderGSR((prev) => prev + 1);
    });
  };

  return (
    <div className="flex-grow flex-col border border-black">
      <form className="m-auto rounded-md border border-dashed border-yellow-400 md:w-1/2">
        <div id="profilePhotoSection" className="flex items-center">
          {user.profilePic ? (
            <div className="size-28 rounded-full">
              <img
                src={`http://localhost:5050/user/get-dp/${user.profilePic}`}
                className="size-28 rounded-full"
              />
            </div>
          ) : (
            <div
              id="profilePhoto"
              className="flex size-28 flex-col items-center justify-center rounded-full border border-dashed border-[#DAD7CD]"
            >
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
            </div>
          )}
          {/* Profile pic picker */}
          <div className="m-auto">
            <label
              htmlFor="profilePicturePicker"
              className="rounded-full border border-solid border-[#A3B18A] p-2 hover:bg-[#E9F1E4]"
            >
              Update Profile Picture
              <input
                type="file"
                onChange={(e) => {
                  imageUpload(e.target.files[0]);
                }}
                className="hidden"
                id="profilePicturePicker"
              />
            </label>
          </div>
        </div>
        <div id="textElements" className="my-8 w-full">
          <div className="my-6">
            <label htmlFor="">
              <p>Full Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-3/4 rounded-lg"
              />
            </label>
          </div>
          <div className="my-6">
            <label htmlFor="">
              <p>Email</p>
              <input
                type="email"
                placeholder={user.email}
                disabled
                className="w-3/4 rounded-lg"
              />
            </label>
          </div>
          <div className="my-6">
            <label htmlFor="">
              <p>Phone Number</p>
              <input
                type="number"
                onChange={(e) => setPhoneNo(e.target.value)}
                value={phoneNo}
                className="w-3/4 rounded-lg"
              />
            </label>
          </div>
        </div>

        <div className="flex w-full">
          <button className="mx-auto rounded-full bg-[#588157] px-8 py-2 text-xl font-bold text-[#DAD7CD]">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
