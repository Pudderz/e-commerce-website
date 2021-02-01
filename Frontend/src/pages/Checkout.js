import React from 'react'

export const Checkout = () => {
    return (
        <div style={{display:'flex'}}>
            <div>items


                <div>Powered by Stripe </div>
                <div>Terms
                </div>
                <div>
                    Privacy
                </div>
            </div>
            <div>
                <div>Apple Pay</div>
                <div>Google Pay</div>
                <p>or pay with card</p>
                <label>Email
                    <input type="text" />
                </label>
                <label>Card information
                    <input type="text" />
                </label>
                <label>Name on card
                    <input type="text" />
                </label>
                <label>Country or region
                    <input type="text" />
                </label>
                <button>Pay £Price</button>
            </div>
        </div>
    )
}
