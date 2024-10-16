import { Outlet } from "react-router-dom";

// component imports
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";

// shadcn imports
import { Toaster } from "@/components/ui/toaster";

function Layout() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <Outlet />
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default Layout;
