export class Item {
  id: string;
  image: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  details?: ItemDetails;
  detailsId?: string;
}

export class ItemDetails {
  id: string;
  sizes: string[];
  colors: string[];
  fabric: string;
  pattern: string;
  fit: string;
  neck: string;
  sleeve: string;
  style: string;
  comments?: ItemComment[];
}

export class ItemComment {
  id: string;
  text: string;
  author: string;
  rating: number;
  createdAt: Date;
  itemDetails?: ItemDetails;
  itemDetailsId?: string;
}
