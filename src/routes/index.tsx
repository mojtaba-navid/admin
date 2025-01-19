
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ROUTES_TYPES, RoutesConfig } from "../config/routes.config";
import { Public, Private } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteTyps } from "../types/client/route-types";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import toast, { Toaster } from "react-hot-toast";
const RoutesSite = () => {

  const element = (type: RouteTyps, item: any) => {
    switch (type) {
      case ROUTES_TYPES.PRIVATE:
        return <Private {...item}> {item.component} </Private>;
      case ROUTES_TYPES.PUBLIC:
        return <Public {...item}>{item.component} </Public>;

    }
  };




  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
      },
      mutations: {
        onError: (error) => {
          console.log(error)
          toast.error("")
        },
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Toaster
        position="bottom-left"
      />
      <Router>
        <Routes>
          {RoutesConfig.map((item) => {
            return (
              <Route
                path={item.path}
                key={item.path}
                element={element(item.type, item)}
              />
            );
          })}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default RoutesSite;
