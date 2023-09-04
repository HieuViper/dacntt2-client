import React from "react";

const ErrorPage = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-primary-600 to-dark-700 ">
        <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center ">
          <div className="bg-white shadow overflow-hidden sm:rounded-2xl pb-8">
            <div className="border-t border-gray-200 text-center pt-8">
              <h1 className="text-9xl font-bold text-primafrom-primary-600">
                404
              </h1>
              <h1 className="text-6xl font-medium py-8">
                Oops! Page not found
              </h1>
              <p className="text-2xl pb-8 px-12 font-medium">
                Oops! The page you are looking for does not exist. It might have
                been moved or deleted.
              </p>
              <button
                onClick={() => (window.location.href = "/")}
                className="bg-gradient-to-r from-primary-600 to-dark-700 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-lg mr-6"
              >
                BACK TO HOME
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
