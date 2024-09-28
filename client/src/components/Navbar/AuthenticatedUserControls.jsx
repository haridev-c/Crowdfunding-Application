import { Link } from "react-router-dom";

// component imports
import NavbarUserProfile from "./NavbarUserProfile";

function AuthenticatedUserControls() {
  return (
    <div className="flex items-center">
      <div className="hidden md:block">
        <Link to={"/create-new-fundraiser"}>
          <button className="mr-4 rounded-full border-2 border-solid border-[#F2E8CF] p-1 px-4 font-bold text-[#F2E8CF] transition-all duration-300 hover:border-[#8bc34a] hover:bg-[#8bc34a] hover:text-black hover:shadow-lg">
            Create a Fundraiser
          </button>
        </Link>
      </div>
      <div>
        <NavbarUserProfile />
      </div>
    </div>
  );
}

export default AuthenticatedUserControls;
