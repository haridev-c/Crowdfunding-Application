import React, { useContext, useState } from "react";
import { GlobalContext } from "../GlobalStateRepository";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function CreateFundraiserPage() {
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();

  // state declarations
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState();
  const [deadline, setDeadline] = useState();

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    axios
      .post("/campaign/create", {
        createdBy: user._id,
        title,
        description,
        targetAmount,
        deadline,
      })
      .then(({ data }) => {
        if (data.success) {
          alert(data.serverMsg);
          navigate("/dashboard");
        }
      });
  };

  if (!user) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="m-auto p-2 md:w-1/2">
        <form className="m-2 flex flex-col rounded-lg border-2 p-4 shadow-lg">
          <div className="m-3">
            <h1 className="text-center text-xl font-bold">
              Create New Fundraiser
            </h1>
          </div>
          <div className="m-3">
            <label>
              <p>Campaign Title</p>
              <input
                type="text"
                className="form-input w-full rounded-md border-none bg-gray-200 focus:ring-0"
                placeholder="Enter campaign title"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="m-3">
            <label>
              <p>Campaign Description</p>
              <textarea
                className="form-textarea w-full rounded-md border-none bg-gray-200 focus:ring-0"
                placeholder="Enter campaign description"
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </label>
          </div>
          <div className="m-3">
            <label>
              <p>Target Amount</p>
              <div className="flex items-center">
                <div className="flex h-10 flex-col justify-center rounded-l-md bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 pl-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="number"
                  className="form-input w-full rounded-r-md border-none bg-gray-200 focus:outline-none focus:ring-0"
                  placeholder="Enter target amaount"
                  onChange={(e) => setTargetAmount(e.target.value)}
                  required
                />
              </div>
            </label>
          </div>
          <div className="m-3">
            <label>
              <p>Deadline</p>
              <input
                type="date"
                className="form-input w-full rounded-md border-none bg-gray-200 focus:ring-0"
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="mt-3 flex justify-center">
            <button
              onClick={handleCreateCampaign}
              className="m-2 rounded-md bg-green-500 p-2 text-lg shadow-md"
            >
              Create Fundraiser
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateFundraiserPage;
