/** @format */

import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

import { firebaseLib } from "../lib/firebase";

const Landing: NextPage = () => {
  const nextRouter = useRouter();
  const [user, loading, error] = useAuthState(firebaseLib.config.firebaseAuth);

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
