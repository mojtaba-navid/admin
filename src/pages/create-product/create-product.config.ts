
export const BORD = "bord";
export const DELIVERY_METHOD = "deliveryMethod";
export const OFF = "off";
export const LENZ = "lenz";
export const MODEL = "model";
export const NUMBER_OF_EXIST = "numberOfExist";
export const PHOTO = "photo";
export const PRICE_FOR_USER = "priceForUser";
export const PRICE_FOR_WORKMATE = "priceForWorkmate";
export const WARRANTY = "warranty";
export const BRAND = "brand";
export const TYPE = "types";
export const CATERGORY = "category";
export const FIELDS = {
  MODEL: "model",
};

export const defaultValues = {
  [OFF]: "",
  [MODEL]: "",
  [NUMBER_OF_EXIST]: "",
  [PHOTO]: undefined,
  [PRICE_FOR_USER]: "",
  [PRICE_FOR_WORKMATE]: "",
  [WARRANTY]: "",
  [BRAND]: "",
  [TYPE]: "",
  [CATERGORY]: "",
  properties: [] as { id: string; value: string }[],
  image: "",
  type:""

};
