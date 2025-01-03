import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";  // Corrected import for jwt-decode
import { PATHS } from "../../config/routes.config";
import AppLayout from "../../layout";

interface DecodedToken {
  exp: number;
}

interface PropsType {
  component: React.ComponentType;
  layout: {
    type: "private" | "auth"
  }
}

const Private = ({ component: Component, layout }: PropsType) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user") || "{}";
    const token = JSON.parse(user)?.token;

    if (!token) {
      navigate(PATHS.login);
      return;
    }
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        navigate(PATHS.login);
      }
    } catch (error) {
      navigate(PATHS.login);
    }
  }, [navigate])

  return (
    <AppLayout layoutItems={layout}>
      <Component />
    </AppLayout>
  );
};

export { Private };
