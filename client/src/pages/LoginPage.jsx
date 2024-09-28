import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginUserMutation } from "../features/apiSlice";
import { setUser } from "../features/userSlice";
import { Navigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loginUser] = useLoginUserMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await loginUser({ email, password }).unwrap();
      console.log(data);
      if (data.success) {
        alert(data.serverMsg);
        dispatch(setUser(data.user));
        navigate("/");
      } else {
        alert(data.serverMsg);
      }
    } catch (error) {
      console.log("Error submitting form", error);
    }
  };

  if (user) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="flex flex-grow bg-[#E9F1E4]">
        <div className="m-auto flex flex-col justify-center md:w-1/2">
          <form className="my-4 flex flex-col rounded-md border-2 border-solid bg-white p-6 shadow-xl">
            <h2 className="m-3 text-center text-2xl font-bold text-[#386641]">
              Welcome Back to SparkFund
            </h2>
            <label htmlFor="email" className="my-2">
              <p>Email</p>
              <input
                type="email"
                placeholder="nivin@gmail.com"
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
                placeholder="1234"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button
              onClick={handleSubmit}
              className="my-6 rounded-md bg-[#6A994E] py-2 text-lg font-bold text-[#F2E8CF]"
            >
              Login
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
      </div>
    </>
  );
}

export default LoginPage;
