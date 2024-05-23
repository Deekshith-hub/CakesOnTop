import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface LoginWrapperProps {
  children: ReactNode;
}

const LoginWrapper: React.FC<LoginWrapperProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const router = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      if (!["/login", "/signup", "/forgotpass"].includes(location.pathname)) {
        router("/login");
      }
    } else {
      if (["/login", "/signup", "/forgotpass"].includes(location.pathname)) {
        router("/");
      }
      setIsLoggedIn(true);
    }
  }, [location.pathname, router]);

  return isLoggedIn || ["/login", "/signup", "/forgotpass"].includes(location.pathname) ? (
    <>{children}</>
  ) : null;
};

export default LoginWrapper;
