export interface CoffeeProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  origin: string;
  roast_level: string;
  image_url: string;
}

export interface CartItem {
  product: CoffeeProduct;
  quantity: number;
}

export type Category = '全部' | '單品豆' | '配方豆' | '掛耳包';
