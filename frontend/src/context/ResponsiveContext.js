import { createContext, useContext } from "react";
import { useMediaQuery } from "@mui/material";

const ResponsiveContext = createContext();

export const ResponsiveContextProvider = (props) => {
  const { children } = props;

  const mobile = useMediaQuery("(max-width:650px)");
  const tablet = useMediaQuery("(min-width:650px) and (max-width:1050px)");
  const desktop = useMediaQuery("(min-width:1050px)");

  return (
    <ResponsiveContext.Provider value={{ mobile, tablet, desktop }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsiveContext = () => {
  return useContext(ResponsiveContext);
};
