import {useEffect} from "react";
import { useRecoilValue } from "recoil";
import userState from "../store";


function Auth(props) {
  const user = useRecoilValue(userState);
  useEffect(() => {
    if (!user.token) {
      window.location.href = "/login";
    }
  }, []);

  return props.children;
}

export default Auth;