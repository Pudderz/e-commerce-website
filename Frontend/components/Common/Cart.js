import React, { useEffect } from 'react';
import PropTypes from 'prop-types';


export const Cart = ({cart, emptyCart, updateCartQty,  removeItemFromCart}) => {
    useEffect(() => {
        console.log(cart)
        console.log(cart.line_items)
        return () => {
        }

    }, [cart])


    const handleUpdateQty = (id, quantity)=>{
        updateCartQty(id,quantity)
    }
    const handleRemove = id =>{
        removeItemFromCart(id)
    }

    const handleEmpty = ()=>{
        emptyCart()
    }
    return (
        <div>
            <h3>Cart</h3>
            <p>Num of Items - {cart.total_items}</p>
            <p>{cart?.subtotal?.formatted_with_symbol}</p>
            <button onClick={handleEmpty}>Empty Cart</button>
            <ul style={{display:'flex', listStyle:'none', gap:'20px'}}>
                {cart?.line_items?.map((item,index)=>(
                    <li key={index} >
                        <h4>{item.name}</h4>
                        <img src={item.media.source} alt={item.name} height="75"/>
                        <p>Number - {item.quantity}</p>
                        <p>Price - {item.price.formatted_with_symbol}</p>
                        <p>total for item - {item.line_total.formatted_with_symbol}</p>
                        <button  onClick={()=>handleUpdateQty(item.id, item.quantity+1)}>Add</button>
                        {item.quantity*1>1 && (
                        <>
                        <button onClick={()=>handleUpdateQty(item.id, item.quantity-1)}>Decrease</button>
                        </>)}
                        <button onClick={()=>handleRemove(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

Cart.propTypes={
    cart:   PropTypes.object.isRequired,
    emptyCart: PropTypes.func.isRequired,
    updateCartQty: PropTypes.func.isRequired,
}
