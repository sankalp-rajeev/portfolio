import React from "react";
import GlassBackground from "./nn";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <GlassBackground />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
