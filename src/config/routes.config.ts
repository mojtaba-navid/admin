import { ReactNode } from "react";
import * as pages from "../pages";
import { RouteTyps } from "../types/client/route-types";
export const ROUTES_TYPES: {
  PROTECTED: RouteTyps;
  PUBLIC: RouteTyps;
  PRIVATE: RouteTyps;
} = {
  PROTECTED: "protected",
  PUBLIC: "public",
  PRIVATE: "private",
};

export const PATHS = {
  brands: "/brands",
  createProduct: "/create-product",
  createProductCat: "/create-product-cat",
  editProfile: "/edit-profile",
  filter: "/filter",
  home: "/",
  login: "/login",
  orders: "/orders",
  productTypes: "/product-types",
  property: "/property",
  register: "/register",
};

export const RoutesConfig: {
  path: string;
  name: string;
  component: ReactNode;
  layout: {
    type: "private" | "auth";
  };
  type: RouteTyps;
}[] = [
  // {
  //   path: PATHS.home,
  //   name: "home",
  //   component: pages.Home,
  //   layout: {
  //     type: "home",
  //   },
  //   type: ROUTES_TYPES.PRIVATE,
  // },

  // {
  //   path: PATHS.brands,
  //   name: "brands",
  //   component: pages.Brand,
  //   layout: {
  //     type: "home",
  //   },
  //   type: ROUTES_TYPES.PRIVATE,
  // },

  // {
  //   path: PATHS.property,
  //   name: "property",
  //   component: pages.Property,
  //   layout: {
  //     type: "home",
  //   },
  //   type: ROUTES_TYPES.PRIVATE,
  // },

  // {
  //   path: PATHS.createProduct,
  //   name: "createProduct",
  //   component: pages.CreateProduct,
  //   layout: {
  //     type: "home",
  //   },
  //   type: ROUTES_TYPES.PRIVATE,
  // },
  // {
  //   path: PATHS.editProfile,
  //   name: "edit-profile",
  //   component: pages.EditProfile,
  //   ifIsLoginGoBack: true,
  //   layout: {
  //     type: "home",
  //   },
  //   type: ROUTES_TYPES.PRIVATE,
  // },

  {
    path: PATHS.login,
    name: "login",
    component: pages.Login,
    ifIsLoginGoBack: true,
    layout: {
      type: "auth",
    },
    type: ROUTES_TYPES.PUBLIC,
  },

  {
    path: "navid",
    name: "login",
    component: pages.Navid,
    ifIsLoginGoBack: true,
    layout: {
      type: "private",
    },
    type: ROUTES_TYPES.PRIVATE,
  },
  {
    path: PATHS.register,
    name: "register",
    component: pages.Register,
    layout: {
      type: "auth",
    },
    type: ROUTES_TYPES.PUBLIC,
  },

  // {
  //   path: PATHS.register,
  //   name: "register ",
  //   component: pages.Register,
  //   ifIsLoginGoBack: true,
  //   layout: {
  //     type: "login",
  //   },
  //   type: ROUTES_TYPES.PUBLIC,
  // },
  // {
  //   path: PATHS.orders,
  //   name: "orders",
  //   component: pages.Orders,
  //   ifIsLoginGoBack: true,
  //   layout: {
  //     type: "home",
  //   },
  //   type: ROUTES_TYPES.PRIVATE,
  // },
  // {
  //   path: PATHS.productTypes,
  //   name: "product-types ",
  //   component: pages.ProductTypes,
  //   ifIsLoginGoBack: true,
  //   layout: {
  //     type: "home",
  //   },
  //   type: ROUTES_TYPES.PRIVATE,
  // },
  // {
  //   path: PATHS.filter,
  //   name: "product-types ",
  //   component: pages.Filter,
  //   ifIsLoginGoBack: true,
  //   layout: {
  //     type: "home",
  //   },
  //   type: ROUTES_TYPES.PRIVATE,
  // },
  {
    path: PATHS.createProduct,
    name: "create-product",
    component: pages.CreateProduct,
    ifIsLoginGoBack: true,
    layout: {
      type: "private",
    },
    type: ROUTES_TYPES.PRIVATE,
  },
  {
    path: PATHS.brands,
    name: "brand",
    component: pages.Brand,
    ifIsLoginGoBack: true,
    layout: {
      type: "private",
    },
    type: ROUTES_TYPES.PRIVATE,
  },
  {
    path: PATHS.productTypes,
    name: "brand",
    component: pages.Property,
    ifIsLoginGoBack: true,
    layout: {
      type: "private",
    },
    type: ROUTES_TYPES.PRIVATE,
  },
];
