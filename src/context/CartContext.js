import React, {useEffect, useState} from 'react' 
import { clearCart, fetchCart, handleAddToCart, removeItemFromCart, updateCartQty } from '../lib/commerce';

const CartContext = React.createContext();

export const CartContextProvider = (props) => {
    const [cart, setCart] = useState(initialState)
    useEffect(() => {
        fetchCart(setCart);
    }, [])

    const addToCart = (item, quantity)=>{
        handleAddToCart(item, quantity, setCart)
    }

    const removeItem = itemId =>{
        removeItemFromCart(itemId,setCart);
    }

    const handleNewItemQuantity = (id, newQty)=>{
        updateCartQty(id, newQty, setCart);
    }
    return (
            <CartContext.Provider value={{
                changeCart:(value)=>setCart(value),
                cart,
                addToCart: (item, quantity)=>addToCart(item, quantity),
                removeFromCart: (itemId)=> removeItem(itemId),
                clearCart: ()=> clearCart(setCart),
                updateQty: (itemId, newQty)=> handleNewItemQuantity(itemId, newQty)
            }

            }>
                {props.children}
            </CartContext.Provider>
    )
}


