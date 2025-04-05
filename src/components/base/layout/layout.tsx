import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";
import SideBar from "./nav-bar";

export default function GuestLayout() {
  return (
    <>
      <Header />
      <SideBar />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
}
