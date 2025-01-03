import Home from "./home";
import Login from "./login";

const layoutTypes = [
  {
    name: "private",
    layout: Home,
  },
  {
    name: "auth",
    layout: Login,
  },
];

export default layoutTypes;
