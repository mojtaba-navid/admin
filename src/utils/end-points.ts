export const endpoints = {
  auth: {
    login: "auth/admin/login",
    register: "auth/admin/register",
    logout: "auth/logout",
  },
  product: {
    product: "product",
    getProduct: "product/bymodel/:model",
    editProduct: "product/:model",
    uploadImage: "product/upload-product-image",
    getAvailable: "product/available/:model",
  },

  orders: {
    orders: "orders",
    getOrder: "orders/get-order/:id",
    changeOrderStatus: "orders/change-order-status/:id",
    searchOrder: "orders/search-order-admin",
  },

  user: {
    users: "users",
    uploadUserImage: "user/upload-image",
    getUserImage: "user/user-image",
  },
  type: {
    type: "type",
    getProductType: "type/:id",
    addBrand: "type/add-brand",
    editBrand: "type/edit-brand/:id",
    deleteBrand: "type/delete-brand/:id",
    getBrands: "type/get-brands",
    getBrand: "type/get-brand/:id",
    addproperty: "type/add-property",
    getProperties: "type/get-properties",
  },
  propertyTitle: {
    propertyTitle: "properties",
    propertyTitlewithParmas: "properties/:id",
  },
  property: {
    properties: "properties",
    propertiesWithParam: "properties/property/:id",
  },
  category: {
    category: "category",
    categorywithParam: "category/:id",
    getCatergory: "category/get-cat",
    UploadPhoto: "category/upload-category-image",
  },
};
