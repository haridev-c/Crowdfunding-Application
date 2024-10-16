import { Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

// zod and form imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { useLoginUserMutation } from "../features/apiSlice";
import { setUser } from "../features/userSlice";

// shadcn imports
import { useToast } from "@/hooks/use-toast";

function LoginPage() {
  // redux hooks
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loginUser] = useLoginUserMutation();

  // zod schema definition
  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }).trim(),
    password: z
      .string({ required_error: "Password is required" })
      .trim()
      .refine((val) => val !== "", { message: "Password is required" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();
  const { toast } = useToast();
  const onSubmit = async (data) => {
    try {
      const responseData = await loginUser(data).unwrap();
      toast({
        description: responseData.serverMsg,
      });
      dispatch(setUser(responseData.user));
      navigate("/");
    } catch (error) {
      console.error("Error submitting form", error);
      toast({
        variant: "destructive",
        description: error.data.serverMsg,
      });
    }
  };

  if (user) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="flex flex-grow bg-[#E9F1E4]">
        <div className="m-auto flex flex-col justify-center md:w-1/2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="my-4 flex flex-col rounded-md border-2 border-solid bg-white p-6 shadow-xl"
          >
            <h2 className="m-3 text-center text-2xl font-bold text-[#386641]">
              Welcome Back to SparkFund
            </h2>
            <label htmlFor="email" className="my-2">
              <p>Email</p>
              <input
                {...register("email")}
                type="email"
                placeholder="nivin@gmail.com"
                className="form-input w-full rounded-md border-none bg-gray-200"
                name="email"
              />
            </label>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <label htmlFor="password" className="my-2">
              <p>Password</p>
              <input
                {...register("password")}
                type="password"
                className="form-input w-full rounded-md border-none bg-gray-200"
                name="password"
                placeholder="1234"
              />
            </label>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <button
              type="submit"
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
