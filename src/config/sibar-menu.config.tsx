export const PATHS = {
  home: "/",
  login: "/login",
  register: "/register",
  createProduct: "/create-product",
  orders: "/order",
  createProductCat: "/create-product-category",
  productTypes: "/product-types",
  brands: "/brands",
  filter: "/filter",
  property: "/property",
};

const items = [
  {
    name: "محصولات",
    label: "محصولات",
    icon: "mdi:home",
    path: PATHS.createProduct,
  },

  {
    name: "سفارش ها",
    label: "سفارش ها",
    icon: "mdi:clipboard-list",
    path: PATHS.orders,
  },

  {
    name: "ایجاد دسته بندی",
    label: "ایجاد دسته بندی",
    icon: "mdi:category",
    path: PATHS.createProductCat,
  },

  {
    name: "برندها",
    label: "برندها",
    icon: "mdi:briefcase-outline",
    path: PATHS.brands,
  },

  {
    name: "نوع محصول",
    label: "نوع محصول",
    icon: "mdi:shape",
    path: PATHS.productTypes,
  },

  // {
  //   name: "فیلترها",
  //   label: "فیلترها",
  //   icon: "mdi:filter-variant",
  //   path: PATHS.filter,
  // },

  {
    name: "ویژگی ها",
    label: "ویژگی ها",
    icon: "mdi:format-list-bulleted",
    path: PATHS.property,
  },

  // {
  //   name: "setting",
  //   label: "Setting",
  //   icon: <Icon icon="mdi:settings" />,
  // },
  // {
  //   name: "billing",
  //   label: "Billing",
  //   icon: <Icon icon="mdi:credit-card" />,
  // },
  // {
  //   name: "home",
  //   label: "Home",
  //   icon: <Icon icon="mdi:home" />,
  // },
  // {
  //   name: "home",
  //   label: "Home",
  //   icon: <Icon icon="mdi:home" />,
  //   items: [
  //     {
  //       name: "statements",
  //       label: "Statements",
  //       icon: <Icon icon="mdi:file-document" />,
  //     },
  //     {
  //       name: "reports",
  //       label: "Reports",
  //       icon: <Icon icon="mdi:file-chart" />,
  //     },
  //   ],
  // },
];

const colors = [
  { backgroundColor: "#BEDBFE", color: "black " },
  { backgroundColor: "#08A45C", color: "white" },
  { backgroundColor: "red", color: "white" },
  { backgroundColor: "purple", color: "blue" },
  { backgroundColor: "gray", color: "black" },
  { backgroundColor: "gray", color: "black" },
];

export { colors, items };
