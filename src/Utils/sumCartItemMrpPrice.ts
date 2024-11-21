import { CartItem } from "../types/CartTypes";

export const sumCartItemMrpPrice=(cartItems: CartItem[]) =>{
    
    if(cartItems.length===0){
        console.log("deleted successfully")
    }
    return cartItems.reduce((acc,item)=> {
        const price = typeof item.mrpPrice ==='number' ? item.mrpPrice: 0;
        return price + acc
    },0)
}

export const sumCartItemSellingPrice=(cartItems: CartItem[])=>{

    if(cartItems.length===0){
        console.log("deleted successfully")
    }
    return cartItems.reduce((acc,item)=> {
        const price = typeof item.sellingPrice ==='number' ? item.sellingPrice: 0;
        return price + acc
    },0)
}

