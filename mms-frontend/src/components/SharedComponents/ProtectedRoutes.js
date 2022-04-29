import { Navigate } from "react-router-dom"
import { isUserLoggedIn } from "../../API/apiHelpers"

function ProtectedRoutes({ children }) {


  return isUserLoggedIn() ? children : <Navigate to="/" replace />
}

export default ProtectedRoutes