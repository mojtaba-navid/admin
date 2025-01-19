import { Property } from "./property.type";
import { Share } from "./share.type";

export interface PropertyTitle extends Share {
  id: string;
  category: string;
  properties: Property[];
  title: string;
}
