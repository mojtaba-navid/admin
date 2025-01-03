import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./redux/store";
import RoutesSite from "./routes";
const App = () => {
  return (

    <Provider store={store}>
      <ToastContainer />
      <RoutesSite />
    </Provider>
  );
};

export default App;
