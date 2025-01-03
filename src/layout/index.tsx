import { ReactNode } from "react";
import layoutTypes from "./comonents";
const AppLayout = ({ children, layoutItems }: { children: ReactNode, layoutItems: { type: "private" | "auth" } }) => {
  const Layout = layoutTypes.filter(
    (item) => {
      return item.name.toLowerCase() === layoutItems.type.toLowerCase()
    }
  )[0].layout;

  return (
    <>
      <Layout>{children}</Layout>
    </>
  );
};

export default AppLayout;
