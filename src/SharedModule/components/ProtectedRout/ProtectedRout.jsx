import { Navigate } from "react-router-dom"

export default function ProtectedRout({children}) {



    if (!localStorage.getItem("token")) {
    return <Navigate to={"/Login"} />    
    }
  return children
}
