// Redux imports
import { useSelector, useDispatch } from "react-redux";
import {
  useUpdateProfileMutation,
  useChangeDPMutation,
} from "../features/apiSlice";
import { setUser } from "../features/userSlice";

// zod and form imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// shadcn imports
import { useToast } from "@/hooks/use-toast";

function EditProfile() {
  // redux hooks
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [updateProfile] = useUpdateProfileMutation();
  const [changeDP] = useChangeDPMutation();

  // zod schema definition
  const profileSchema = z.object({
    name: z
      .string()
      .min(3, { message: "Name must be atleast 3 characters long" })
      .max(20, { message: "Name cannot be longer than 20 characters" })
      .trim()
      .optional(),

    phoneNo: z.coerce
      .number()
      .gte(1000000000, { message: "Phone number should be 10 digits" })
      .lte(9999999999, { message: "Phone number should be 10 digits" })
      .optional(),

    age: z.coerce
      .number()
      .int()
      .positive()
      .gte(18, { message: "Age should be atleast 18" })
      .lte(130, { message: "Enter a valid number" })
      .optional(),
  });

  // react-hook-form initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      phoneNo: user.phoneNo,
      age: user.age,
    },
  });

  // Image upload function
  const imageUpload = async (dp) => {
    const formData = new FormData();
    formData.append("profilePic", dp);

    const data = await changeDP(formData).unwrap();
    console.log(data);
    dispatch(setUser(data.updatedDoc));
  };

  const { toast } = useToast();

  // User details update function
  const handleUserDetailsUpdate = async (data) => {
    try {
      console.log(data);
      const responseData = await updateProfile(data).unwrap();
      console.log(responseData);
      dispatch(setUser(responseData.updatedDoc));
      toast({ description: responseData.serverMsg });
    } catch (error) {
      console.log("Error submitting form");
      console.error(error);
    }
  };

  return (
    <div className="flex-grow flex-col">
      <div className="m-auto rounded-lg p-6 shadow-lg md:w-1/2">
        <div id="profilePhotoSection" className="flex items-center">
          {user.profilePic ? (
            <div className="size-28 overflow-hidden rounded-full">
              <img
                src={`http://localhost:5050/api/user/dp/${user.profilePic}`}
                className="size-28 rounded-full object-cover"
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
              className="rounded-full border border-solid border-[#A3B18A] p-2 font-semibold hover:bg-[#E9F1E4]"
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

        {/* User details form */}
        <form onSubmit={handleSubmit(handleUserDetailsUpdate)}>
          <div id="textElements" className="my-8 w-full">
            <div className="my-6">
              <label htmlFor="">
                <p className="font-medium">Full Name</p>
                <input
                  {...register("name")}
                  type="text"
                  className="form-input w-full rounded-md border-none bg-gray-200 shadow-inner"
                />
              </label>
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="my-6">
              <label htmlFor="">
                <p className="font-medium">Email</p>
                <input
                  type="email"
                  placeholder={user.email}
                  disabled
                  className="w-full rounded-md border-none bg-gray-200 shadow-inner"
                />
              </label>
            </div>
            <div className="my-6">
              <label htmlFor="">
                <p className="font-medium">Age</p>
                <input
                  {...register("age")}
                  type="number"
                  className="w-full rounded-md border-none bg-gray-200 shadow-inner"
                />
              </label>
              {errors.age && (
                <p className="text-red-500">{errors.age.message}</p>
              )}
            </div>
            <div className="my-6">
              <label htmlFor="">
                <p className="font-medium">Phone Number</p>
                <input
                  {...register("phoneNo")}
                  type="number"
                  className="w-full rounded-md border-none bg-gray-200 shadow-inner"
                />
              </label>
              {errors.phoneNo && (
                <p className="text-red-500">{errors.phoneNo.message}</p>
              )}
            </div>
          </div>

          <div className="flex w-full">
            <button
              type="submit"
              className="mx-auto rounded-full bg-[#588157] px-10 py-2 text-xl font-bold text-[#f2e8cf] hover:shadow-lg"
            >
              Update
            </button>
          </div>
        </form>
        {/* Update profile section ends */}
      </div>
    </div>
  );
}

export default EditProfile;
