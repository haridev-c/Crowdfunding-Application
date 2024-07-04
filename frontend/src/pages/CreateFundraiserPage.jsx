import React, { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../GlobalStateRepository";

function CreateFundraiserPage() {
  const navigate = useNavigate();

  const { user } = useContext(GlobalContext);

  // state declarations
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState();
  const [category, setCategory] = useState("Medical");
  const [deadline, setDeadline] = useState();

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    axios
      .post("/campaign/create", {
        title,
        description,
        targetAmount,
        deadline,
        category,
      })
      .then(({ data }) => {
        if (data.success) {
          alert(data.serverMsg);
          navigate("/");
        } else {
          alert(data.serverMsg);
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
            <h1 className="text-center text-xl font-bold text-[#386641]">
              Create New Fundraiser
            </h1>
          </div>
          <div className="m-3">
            <label>
              <p>Campaign Type</p>
              <select
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-md border-none bg-gray-200 focus:ring-0"
              >
                <option value="Medical">Medical</option>
                <option value="Education">Education</option>
                <option value="Sports">Sports</option>
                <option value="Environment">Environment</option>
                <option value="Emergency">Emergency</option>
                <option value="Animal">Animal</option>
              </select>
            </label>
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
              className="m-2 rounded-md bg-[#6A994E] p-2 text-lg text-[#F2E8CF] shadow-md"
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
