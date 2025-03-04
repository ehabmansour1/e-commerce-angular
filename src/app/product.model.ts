export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  thumbnail: string;
  stock: number;
  description: string;
  reviews: Review[];
  category: string;
  discountPercentage: number;
  quantity: number;
}
export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
