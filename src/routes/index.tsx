
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ROUTES_TYPES, RoutesConfig } from "../config/routes.config";
import { Public, Private } from "./components";
import { Toaster } from 'sonner';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast } from "react-toastify";
import { RouteTyps } from "../types/client/route-types";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const RoutesSite = () => {

  const element = (type: RouteTyps, item: any) => {
    switch (type) {
      case ROUTES_TYPES.PRIVATE:
        return <Private {...item}> {item.component} </Private>;
      case ROUTES_TYPES.PUBLIC:
        return <Public {...item}>{item.component} </Public>;
      // case ROUTES_TYPES.PROTECTED:
      //   return <Protected {...item}> {item.component} </Protected>;
      // default:
      //   return <Private {...item}>{item.component} </Private>;
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
