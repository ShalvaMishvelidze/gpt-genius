"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Toaster position="top-center" />
      {children}
    </>
  );
};
export default providers;
