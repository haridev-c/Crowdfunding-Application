import { Link, useNavigate, Navigate } from "react-router-dom";

// redux imports
import { useSelector } from "react-redux";
import { useRegisterUserMutation } from "../features/apiSlice";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// shadcn imports
import { useToast } from "@/hooks/use-toast";

function RegisterPage() {
  const { user } = useSelector((state) => state.user);
  const [registerUser] = useRegisterUserMutation();

  // zod schema definition
  const formSchema = z.object({
    name: z
      .string()
      .min(3, { message: "Name must be atleast 3 characters long" })
      .max(20, { message: "Name cannot be longer than 20 characters" })
      .trim(),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email format" })
      .trim(),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password should be min 8 characters long" })
      .max(14, { message: "Password should be max 14 characters long" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      })
      .trim(),
  });

  // react-hook-form initialization
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
      const responseData = await registerUser(data).unwrap();
      console.log(responseData);
      toast({ description: responseData.serverMsg });
    } catch (error) {
      console.error(error);
      toast({ description: error.data.serverMsg });
      navigate("/login");
    }
  };

  if (user) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="m-auto flex flex-grow flex-col justify-center md:w-1/2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-4 flex flex-col rounded-md border-2 border-solid p-6 shadow-xl"
        >
          <h2 className="m-3 text-center text-2xl font-bold text-[#386641]">
            Join the SparkFund Community
          </h2>
          <label htmlFor="name" className="my-2">
            <p>Full Name</p>
            <input
              {...register("name")}
              type="text"
              name="name"
              placeholder="John Doe"
              className="form-input w-full rounded-md border-none bg-gray-200"
            />
          </label>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          <label htmlFor="email" className="my-2">
            <p>Email</p>
            <input
              {...register("email")}
              type="email"
              placeholder="johndoe@abc.com"
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
              placeholder="sjd123!&^#"
            />
          </label>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <button
            type="submit"
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
