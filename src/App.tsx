
import { Provider } from "react-redux";
import store from "./redux/store";
import RoutesSite from "./routes";
const App = () => {
  return (

    <Provider store={store}>
      <RoutesSite />
    </Provider>
  );
};

export default App;
