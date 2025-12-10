export type Fruits =
  | 'apple'
  | 'banana'
  | 'orange'
  | 'pear'
  | 'grape'
  | 'kiwi'
  | 'peach'
  | 'mango'
  | 'pineapple'
  | 'cherry'
  | 'plum'
  | 'apricot'
  | 'lemon'
  | 'grapefruit'
  | 'avocado'
  | 'strawberry'
  | 'watermelon'
  | 'melon'
  | 'pomegranate'
  | 'coconut';

export type Vegetables =
  | 'potato'
  | 'carrot'
  | 'onion'
  | 'garlic'
  | 'tomato'
  | 'pepper'
  | 'cucumber'
  | 'broccoli'
  | 'cauliflower'
  | 'spinach'
  | 'cabbage'
  | 'radish'
  | 'eggplant'
  | 'artichoke'
  | 'celery';

export type ProductType = 'fruits' | 'vegetables';

export type Product = {
  id: string;
  type: ProductType;
  name: Fruits | Vegetables;
  image_url: string;
};
export type Card = {
  id: string;
  product_id: string;
  price: number;
  info?: string;
  date: string;
  islike: boolean;
};

export type CardsList = {
  id: string;
  type: ProductType;
  name: Fruits | Vegetables;
  image_url: string;
  price: number;
  info: string;
  date: string;
  islike: boolean;
};
