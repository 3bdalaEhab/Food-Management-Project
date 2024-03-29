import axios from 'axios';
// import {jwtDecode} from 'jwt-decode'; 
import { createContext,  useState } from 'react';
import toast from 'react-hot-toast';

export let tokenContext = createContext(null);

export default function TokenContextProvider({ children }) {
  
  const [Token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [JwtToken, setJwtToken] = useState({});

//  useEffect(() => {
//   jwtToken()
//  }, [])
 

  // let jwtToken = ()=> {
  //   let token = localStorage.getItem("token");
  //   if (token) {
  //     let jwtTok = jwtDecode(token);
  //     setJwtToken(jwtTok);
  //   } else {
  //     setJwtToken({});
  //   }
  // }


  async function collLogin(values) {
    console.log(values);
    setIsLoading(true);
    try {
      let { data } = await axios.post("https://upskilling-egypt.com:443/api/v1/Users/Login", values);
      setToken(data.token);
      toast.success('Successfully logged in!', { duration: 2000 });
      localStorage.setItem("token", data.token);
      setIsLoading(false);

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message, { duration: 800 });
      setIsLoading(false);
    }
  }

  return (
    <tokenContext.Provider value={{ collLogin, Token, setToken, isLoading }}>
      {children}
    </tokenContext.Provider>
  );
}
