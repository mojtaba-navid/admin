import React, { ReactNode } from "react";
import AppLayout from "../../layout";

interface PropsType {
  component: ReactNode,
  layout: ReactNode
}

const Protected = ({ component, layout }: PropsType) => {
  return (
    <AppLayout layoutItems={layout}>
      {component}
    </AppLayout>
  );
};

export { Protected };
