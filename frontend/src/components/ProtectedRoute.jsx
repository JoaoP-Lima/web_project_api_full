import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(CurrentUserContext);

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
