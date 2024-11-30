import { discount } from './../data/filter/discount';
import { Seller } from './SellerType';
export interface Product{
    id:number,
    title: string,
    description: string,
    mrpPrice: number,
    sellingPrice: number,
    discountPercent: number,
    quantity: number,
    color: string,
    images: string[],
    numRating?: number,
    category?:Category,
    seller?: Seller,
    createdAt?: Date,
    sizes:sizes[],
}
interface sizes{
    id:number,
    description: string,
    name: string,
}
interface Category{
    id?: number;
    name: string;
    categoryId: string;
    parentCategory?: Category;
    level: number;
}

