import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import
import { PATHS } from "../../config/routes.config";
import AppLayout from "../../layout";

interface PropsType {
  component: ReactNode
  layout: {
    type: "private" | "auth"
  }
  ifIsLoginGoBack: boolean;
}

const Public = ({ component, layout, ifIsLoginGoBack }: PropsType) => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user") || "{}";
    const token = JSON.parse(user)?.token;
    if (ifIsLoginGoBack && token && jwtDecode<{ exp: number }>(token).exp > Date.now() / 1000) {
      navigate(PATHS.home);
    }
  }, [ifIsLoginGoBack, navigate]); // Added dependencies

  return (
    <>
      <AppLayout layoutItems={layout}>
        {component}
      </AppLayout>
    </>
  );
};

export { Public };
