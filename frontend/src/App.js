import { SignUp } from "../src/pages/sign-up/SignUp";
import { SignIn } from "../src/pages/signIn/SignIn";
import { Home, Product, Products } from "./pages";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useUserContext } from "./context/UserContext";
import "./mainStyle.css";
import Profile from "./pages/profile/Profile";

export const App = () => {
  const { currentUser, userContextLoading } = useUserContext();

  if (userContextLoading) {
    return <div>...Loading</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in"
          element={!currentUser ? <SignIn /> : <Navigate to="/" />}
        />
        <Route
          path="/sign-up"
          element={!currentUser ? <SignUp /> : <Navigate to="/" />}
        />

        <Route
          path="/products"
          element={currentUser ? <Products /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/profile"
          element={currentUser ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/products/:id"
          element={currentUser ? <Product /> : <Navigate to="/sign-in" />}
        />
      </Routes>
    </BrowserRouter>
  );
};
