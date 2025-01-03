export const endpoints = {
  auth: {
    login: "auth/admin/login",
    register: "auth/admin/register",
    logout: "auth/logout",
  },
  product: {
    product: "/product",
    getProduct: "/product/:id",
    editProduct: "/product/:model",
    uploadImage: "/product/upload-product-image",
  },

  orders: {
    orders: "/orders",
    getOrder: "/orders/get-order/:id",
    changeOrderStatus: "orders/change-order-status/:id",
    searchOrder: "orders/search-order-admin",
  },

  user: {
    users: "/users",
    uploadUserImage: "/user/upload-image",
    getUserImage: "/user/user-image",
  },
  type: {
    type: "type",
    addBrand: "type/add-brand",
    editBrand: "type/edit-brand/:id",
    deleteBrand: "type/delete-brand/:id",
    getBrands: "type/get-brands",
    getBrand: "type/get-brand/:id",
    addproperty: "type/add-property",
    getProperties: "type/get-properties",
  },
  category: {
    getCatergoris: "category",
    getCatergory: "category/get-cat",
  },
};
