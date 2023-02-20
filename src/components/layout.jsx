import React from "react";
import { Outlet } from "react-router-dom";
import ProfileBar from "./ProfileBar";
import NavBar from "./Navbar";

const Layout = () => {
  return (
    <main className="App">
      <header className="top_header">
        <ProfileBar />
        <NavBar />
      </header>
      <Outlet />
    </main>
  );
};

export default Layout;
