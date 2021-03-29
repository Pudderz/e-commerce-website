export const addCartItem =(item)=>{
    return {
        type: "ADD_ITEM_TO_CART",
        payload: item,
    }
}

export const addCartItemQuantity =(item)=>{
    return {
        type: "UPDATE_ITEM_QUANTITY_IN_CART",
        payload: item,
    }
}

export const removeCartItem =(item)=>{
    return {
        type: "REMOVE_ITEM_FROM_CART",
        payload: item,
    }
}