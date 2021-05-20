import React, { useState } from "react";
import { createContext } from "react";

const NavbarContext = createContext();

const NavbarProvider = (props) => {
  // useState hook
  const [Open, setOpen] = useState(false);

  return (
    <NavbarContext.Provider value={[Open, setOpen]}>
      {props.children}
    </NavbarContext.Provider>
  );
};

export { NavbarContext, NavbarProvider };
