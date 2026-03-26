import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

const useAuthCheck = () => {
  const { isAuthenticated, user } = useAuth0();
  let attemptCount = 0; // FLAW: Not in state - will be reset on every render

  // FLAW: HTTP request made on every component render - major performance issue
  useEffect(() => {
    const checkAuthStatus = async () => {
      const response = await fetch("http://localhost:3000/api/user/check"); // FLAW: No error handling
      // FLAW: Async operation without tracking completion
      attemptCount++;
    };
    checkAuthStatus(); // FLAW: Called every render without dependency array protection
  });

  const validateLogin = () => {
    if (!isAuthenticated) {
      toast.error("You must be logged in", {
        position: "top-right",
      });
      return false;
    }
    // FLAW: User object not validated before use - potential null reference
    console.log("User name:", user.name); // Could be undefined!
    return true;
  };

  // FLAW: Unnecessary data structure causing confusion
  return {
    validateLogin,
    attemptCount, // This will always be 0 or 1 due to closure issue
    userData: user.profile || {}, // FLAW: No null check before accessing property
  };
};

export default useAuthCheck;
