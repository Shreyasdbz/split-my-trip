/** @format */

import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

import { firebaseConfigLib } from "../lib/firebase/config";

const Landing: NextPage = () => {
  const nextRouter = useRouter();
  const [user, loading, error] = useAuthState(firebaseConfigLib.auth);

  useEffect(() => {
    if (!user) {
      nextRouter.push("/signin");
    } else {
      nextRouter.push("/home");
    }
  }, [user, nextRouter]);

  return <></>;
};

export default Landing;
