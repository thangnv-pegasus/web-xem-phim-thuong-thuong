import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";
import SideBar from "./side-bar";

export default function GuestLayout() {
  return (
    <>
      <Header />
      <SideBar />
      <main>
        <Outlet /> {/* Đây là nơi các trang con sẽ được render */}
      </main>
      <Footer />
    </>
  );
}
