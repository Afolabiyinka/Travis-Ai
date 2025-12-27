import { Outlet } from "react-router-dom";
import NavBar from "./nav/NavBar";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

import Footer from "./nav/Footer";

const MainLayout = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
