import { jwtDecode } from "jwt-decode";


export function handleJwtToken() {
    if (localStorage.getItem("token")) {
        let jwtTok = jwtDecode(localStorage.getItem("token"));
        return jwtTok
    }else console.log("Error in jwtToken")
   
}

