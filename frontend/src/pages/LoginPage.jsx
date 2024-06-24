import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { GlobalContext } from "../GlobalStateRepository";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setRenderGSR, user } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/user/login", { email, password }).then(({ data }) => {
      if (data.success) {
        alert(data.serverMsg);
        setRenderGSR((prev) => prev + 1);
        navigate("/");
      } else {
        alert(data.serverMsg);
      }
    });
  };

  if (user) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="m-auto rounded border-2 border-solid border-[#BC4749] p-3 shadow-xl md:w-1/2">
        <form className="flex flex-col">
          <h2 className="m-3 text-center text-2xl font-bold">Log In</h2>
          <label htmlFor="email" className="my-2">
            <p>Email</p>
            <input
              type="email"
              placeholder="johndoe@abc.com"
              className="form-input rounded-md md:w-full"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password" className="my-2">
            <p>Password</p>
            <input
              type="password"
              className="form-input rounded-md md:w-full"
              name="password"
              placeholder="sjd123!&^#"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            onClick={handleSubmit}
            className="my-2 rounded-md bg-[#6A994E] py-2 text-lg font-bold text-[#F2E8CF]"
          >
            Submit
          </button>
          <div className="my-1 text-center text-lg md:w-full">
            <p>
              Dont have an account?{" "}
              <Link to={"/register"} className="font-bold text-[#386641]">
                Create new
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
