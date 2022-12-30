interface Category {
  id: number;
  image: string;
  name: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: Array<string>;
  isWishlist?: boolean;
}
