import { Navigate, useNavigate } from "react-router-dom";

// redux imports
import { useSelector } from "react-redux";
import { useCreateCampaignMutation } from "../features/apiSlice";

// zod and form imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// shadcn imports
import { useToast } from "@/hooks/use-toast";

function CreateFundraiserPage() {
  const navigate = useNavigate();

  // redux hooks
  const { user } = useSelector((state) => state.user);
  const [createCampaign] = useCreateCampaignMutation();

  // zod schema definition
  const campaignSchema = z.object({
    category: z.enum([
      "Medical",
      "Education",
      "Sports",
      "Environment",
      "Emergency",
      "Animal",
    ]),

    title: z
      .string()
      .min(1, { message: "Title is required" })
      .min(10, { message: "Title must be atleast 10 characters long" })
      .max(50, { message: "Title cannot be longer than 50 characters" })
      .trim(),

    description: z
      .string()
      .min(1, { message: "Description is required" })
      .min(10, { message: "Description must be atleast 10 characters long" })
      .max(500, { message: "Description cannot exceed 500 characters" })
      .trim(),

    targetAmount: z.coerce
      .number()
      .min(1, { message: "Amount is required" })
      .int({ message: "Amount should be an integer" })
      .positive({ message: "Amount should be positive" }),

    deadline: z.coerce
      .date()
      .min(new Date(), { message: "Please select a deadline in the future" }),
  });

  // react-hook-form initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(campaignSchema) });

  const { toast } = useToast();
  const handleCreateCampaign = async (data) => {
    try {
      const responseData = await createCampaign(data).unwrap();
      toast({ description: responseData.serverMsg });
      navigate("/");
    } catch (error) {
      console.log("Error creating campaign");
      console.error(error);
    }
  };

  if (!user) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="w-full bg-[#E9F1E4]">
        <div className="m-auto p-2 md:w-1/2">
          <form
            onSubmit={handleSubmit(handleCreateCampaign)}
            className="m-2 flex flex-col rounded-lg border-2 bg-white p-4 shadow-lg"
          >
            <div className="m-3">
              <h1 className="text-center text-xl font-bold text-[#386641]">
                Create New Fundraiser
              </h1>
            </div>
            <div className="m-3">
              <label>
                <p>Campaign Type</p>
                <select
                  {...register("category", { required: true })}
                  name="category"
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
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>
            <div className="m-3">
              <label>
                <p>Campaign Title</p>
                <input
                  {...register("title")}
                  type="text"
                  className="form-input w-full rounded-md border-none bg-gray-200 focus:ring-0"
                  placeholder="Enter campaign title"
                />
              </label>
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="m-3">
              <label>
                <p>Campaign Description</p>
                <textarea
                  {...register("description")}
                  className="form-textarea w-full rounded-md border-none bg-gray-200 focus:ring-0"
                  placeholder="Enter campaign description"
                ></textarea>
              </label>
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
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
                    {...register("targetAmount")}
                    type="number"
                    className="form-input w-full rounded-r-md border-none bg-gray-200 focus:outline-none focus:ring-0"
                    placeholder="Enter target amaount"
                  />
                </div>
              </label>
              {errors.targetAmount && (
                <p className="text-red-500">{errors.targetAmount.message}</p>
              )}
            </div>
            <div className="m-3">
              <label>
                <p>Deadline</p>
                <input
                  {...register("deadline")}
                  type="date"
                  className="form-input w-full rounded-md border-none bg-gray-200 focus:ring-0"
                  min={new Date().toISOString().split("T")[0]}
                />
              </label>
              {errors.deadline && (
                <p className="text-red-500">{errors.deadline.message}</p>
              )}
            </div>
            <div className="mt-3 flex justify-center">
              <button
                type="submit"
                className="m-2 rounded-md bg-[#6A994E] p-2 text-lg text-[#F2E8CF] shadow-md"
              >
                Create Fundraiser
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateFundraiserPage;
