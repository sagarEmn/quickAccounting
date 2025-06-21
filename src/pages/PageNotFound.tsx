import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import PageNotFoundIcon from "../assets/PageNotFoundIcon";
import { Button } from "../components/ui/button";
import { useLoading } from "@/contexts/LoadingContext";

export const PageNotFound: React.FC = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  useEffect(() => {
    // Stop loading immediately for this error page
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleTakeHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-between px-4 w-full max-w-5xl mx-auto">
      <div className="text-left ">
        {/* 404 error text */}
        <p className="text-blue-600 font-semibold text-sm mb-4">404 error</p>

        {/* Main heading */}
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Page not found
        </h1>

        {/* Description */}
        <p className="text-gray-600 font-semibold mb-8">
          Sorry, the page you are looking for doesn't exist.
          <br />
          Here are some helpful links:
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-start">
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go back
          </Button>
          <Button
            onClick={handleTakeHome}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Take me home
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <PageNotFoundIcon />
      </div>
    </div>
  );
};
