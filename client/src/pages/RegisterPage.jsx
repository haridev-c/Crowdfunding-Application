import { useContext, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../GlobalStateRepository";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/user/register", { name, email, password }).then((result) => {
      console.log(result.data);
      if (result.data.success) {
        alert(result.data.serverMsg);
        navigate("/login");
      } else {
        alert(result.data.serverMsg);
        navigate("/login");
      }
    });
  };

  if (user) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="m-auto flex flex-grow flex-col justify-center md:w-1/2">
        <form className="my-4 flex flex-col rounded-md border-2 border-solid p-6 shadow-xl">
          <h2 className="m-3 text-center text-2xl font-bold text-[#386641]">
            Join the SparkFund Community
          </h2>
          <label htmlFor="name" className="my-2">
            <p>Full Name</p>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className="form-input w-full rounded-md border-none bg-gray-200"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="email" className="my-2">
            <p>Email</p>
            <input
              type="email"
              placeholder="johndoe@abc.com"
              className="form-input w-full rounded-md border-none bg-gray-200"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password" className="my-2">
            <p>Password</p>
            <input
              type="password"
              className="form-input w-full rounded-md border-none bg-gray-200"
              name="password"
              placeholder="sjd123!&^#"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            onClick={handleSubmit}
            className="my-6 rounded-md bg-[#6A994E] py-2 text-lg font-bold text-[#F2E8CF]"
          >
            Sign Up
          </button>
          <div className="my-1 text-center text-lg md:w-full">
            <p>
              Already have an account?{" "}
              <Link to={"/login"} className="font-bold text-[#386641]">
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
