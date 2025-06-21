import React from "react";
import { Loader } from "./Loader";
import { useLoading } from "@/contexts/LoadingContext";

interface ContentWrapperProps {
  children: React.ReactNode;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  const { isLoading } = useLoading();

  return (
    <div className="relative flex-1">      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <Loader />
        </div>
      ) : null}
      {children}
    </div>
  );
};
