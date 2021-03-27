export const addCartItem =(item)=>{
    return {
        type: "ADD_ITEM_TO_CART",
        payload: item,
    }
}

export const removeCartItem =(item)=>{
    return {
        type: "REMOVE_ITEM_FROM_CART",
        payload: item,
    }
}