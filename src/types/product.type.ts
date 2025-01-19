import { Brand } from "./brand.type";
import { Cart } from "./cart.type";
import { Catergory } from "./catergory.type";
import { Order } from "./order.type";
import { ProductPhoto } from "./productPhoto.type";
import { ProductType } from "./productType.type";
import { Property } from "./property.type";
import { Share } from "./share.type";
import { User } from "./user.type";

export interface Product extends Share {
  author: User;
  baskets: Array<Cart>;
  brand: Brand;
  category: Catergory;
  deliveryMethod: string;
  exist: boolean;
  model: string;
  off: number;
  order: Order;
  photos: ProductPhoto[];
  priceForUser: string;
  priceForWorkmate: string;
  productTypes: Array<ProductType>;
  properties: Array<Property>;
  shippingCost: string;
  status: string;
  warranty: string;
}
