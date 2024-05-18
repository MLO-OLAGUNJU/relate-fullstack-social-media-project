import React from "react";
import { useRecoilValue } from "recoil";
import SignupCard from "../components/SignUpCard";
import LoginInCard from "../components/LoginInCard";
import authScreenAtom from "../atoms/authAtom";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  return <>{authScreenState === "login" ? <LoginInCard /> : <SignupCard />}</>;
};

export default AuthPage;
