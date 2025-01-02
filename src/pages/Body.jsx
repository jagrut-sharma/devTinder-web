import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Body = () => {
  return (
    <div className="min-h-screen grid grid-rows-page">
      <NavBar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default Body;
