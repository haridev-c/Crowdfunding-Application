import React from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <>
      <div className="m-auto rounded border-2 border-solid border-[#1f2937] p-3 shadow-xl md:w-1/2">
        <form className="flex flex-col">
          <h2 className="m-3 text-center text-2xl font-bold">
            Create new account
          </h2>
          <label htmlFor="fullName" className="my-2">
            <p>Full Name</p>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              className="form-input rounded-md md:w-full"
            />
          </label>
          <label htmlFor="email" className="my-2">
            <p>Email</p>
            <input
              type="email"
              placeholder="johndoe@abc.com"
              className="form-input rounded-md md:w-full"
              name="email"
            />
          </label>
          <label htmlFor="password" className="my-2">
            <p>Password</p>
            <input
              type="password"
              className="form-input rounded-md md:w-full"
              name="password"
              placeholder="sjd123!&^#"
            />
          </label>
          <button className="my-2 rounded-md bg-[#4a6283] py-2 text-lg font-bold text-gray-300">
            Sign Up
          </button>
          <div className="my-1 text-center text-lg md:w-full">
            <p>
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-600">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;
