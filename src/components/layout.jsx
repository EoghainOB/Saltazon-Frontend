import React from "react";
import { Outlet } from "react-router-dom";
import ProfileBar from "./ProfileBar";
import NavBar from "./Navbar";
import Header from "./header";
import Footer from "./footer";

const Layout = () => {
  return (
    <>
      <header className="top_header">
        <ProfileBar />
        <Header />
      </header>
      <main className="App">
        <NavBar />
        <Outlet />
        <Footer />
      </main>
    </>
  );
};

export default Layout;
