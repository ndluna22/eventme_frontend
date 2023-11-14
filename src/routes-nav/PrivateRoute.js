import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../auth/UserContext";

function PrivateRoute({ children }) {
  const { currentUser } = useContext(UserContext);

  console.debug(
    "PrivateRoute",
    "children=",
    children,
    "currentUser=",
    currentUser
  );

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
