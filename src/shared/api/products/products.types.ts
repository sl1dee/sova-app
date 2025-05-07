export interface IImagesArray {
  title: string;
  description: string;
  url: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  ean: string;
  upc: string;
  image: string;
  images: IImagesArray[];
  net_price: number;
  taxes: number;
  price: number;
  categories: string[];
  tags: string[];
}

export interface IProductsResponse {
  status: string;
  code: number;
  total: number;
  data: IProduct[];
}

export interface IProductsRequestParams {
  total_items?: number;
  limit?: number;
  page?: number;
  price_min?: string;
  price_max?: string;
}