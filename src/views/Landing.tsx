/** @format */

import { useAuthState } from "react-firebase-hooks/auth";

import { firebase_auth } from "../config/firebase";
import Home from "./Home";

import SignOn from "./SignOn";

const Landing = () => {
  const [user] = useAuthState(firebase_auth);
  return <div className="page">{user ? <Home /> : <SignOn />}</div>;
};

export default Landing;
