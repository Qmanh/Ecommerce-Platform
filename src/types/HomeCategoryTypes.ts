
import { lightBlue } from '@mui/material/colors';
import { Deal } from './DealTypes';
export interface HomeData{
    id:number;
    grid: HomeCategory[];
    shopByCategories: HomeCategory[];
    electricCategories: HomeCategory[];
    deals: Deal[];
    dealCategories:HomeCategory[];
}

export interface HomeCategory {
    id?: number;
    categoryId: string;
    section?: string;
    name?: string;
    image: string;
    parentCategoryId?: string;
}

export interface HomeCategoryUpdate {
    categoryId: string;
    section: HomeCategorySection | null;
    name?: string;
    image: string;
}

export enum HomeCategorySection{
    ELECTRIC_CATEGORIES,
    GRID,
    SHOP_BY_CATEGORIES,
    DEALS
}

export interface Size{
    id?: number;
    name:string;
    description:string;
    statusSize:string;
}
