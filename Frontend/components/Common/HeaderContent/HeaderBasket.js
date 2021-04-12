import { Button, IconButton, Tooltip } from '@material-ui/core';
import Link from 'next/link';
import React from 'react'
import DeleteIcon from "@material-ui/icons/Delete";
import Image from 'next/image';

export const HeaderBasket = ({updateItemQty, cart=[], closeBasket, removeItem}) => {

    const handleUpdateItemQty=(...items) => updateItemQty(...items)

    const handleBasketClose = () => closeBasket();

    const handleRemoveItem= (...items) => removeItem(...items);

    return (
        <div style={{ padding: "10px" }}>
            <div
              style={{
                position: "sticky",
                top: "0px",
                backgroundColor: "#fff",
                zIndex: "5",
              }}
            >
              <h1>Shopping Cart</h1>
              <hr />
            </div>

            
              {cart?.length === 0 ? (
                <div>
                  <h3>Your Basket is empty</h3>
                  <p>
                    Continue shopping on the <Link href="/">homepage</Link>,
                    browse our discounts, or visit your Wish List
                  </p>
                </div>
              ) : (
                <ul
                style={{
                  listStyle: "none",
                  display: "grid",
                  padding: "0",
                  maxWidth: "100%",
                }}
                >
                  {cart?.map((item) => (
                    <li key={`${item.id}${item.size}`}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          gap: "20px",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "gray",
                            height: "100px",
                            width: "100px",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={handleBasketClose}
                          >
                            <Image
                              src={`${process.env.GOOGLE_CLOUD_PUBLIC_URL}${item?.images[0]}`}
                              width={100}
                              height={100}
                              alt={item.name}
                            />
                          </Link>
                        </div>

                        <div style={{ display: "grid" }}>
                          <h3
                            style={{
                              margin: "0",
                              width: "fit-content",
                            }}
                          >
                            {item.name}
                          </h3>
                          <p
                            style={{
                              margin: "0",
                              width: "fit-content",
                            }}
                          >
                            UK {item?.size} £{(item?.price/100).toFixed(2)}
                          </p>
                          <p
                            style={{
                              margin: "0",
                              width: "fit-content",
                            }}
                          >
                            Quantity: {item.quantity}
                          </p>
                          <div style={{ width: "fit-content" }}>
                            <Tooltip title="Add 1">
                              <Button
                                onClick={() =>
                                    handleUpdateItemQty(
                                    item.name,
                                    item.size,
                                    item.quantity + 1
                                  )
                                }
                              >
                                +
                              </Button>
                            </Tooltip>
                            <Tooltip title="Remove 1">
                              <Button
                                onClick={() =>
                                    handleUpdateItemQty(
                                    item.name,
                                    item.size,
                                    item.quantity - 1
                                  )
                                }
                              >
                                -
                              </Button>
                            </Tooltip>
                            <Tooltip title="Remove Item">
                              <IconButton
                                onClick={() => handleRemoveItem(item.name, item.size)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    
                    </li>
                  ))}
                </ul>
              )}
            <div
              style={{
                position: "sticky",
                bottom: "0",
                backgroundColor: "#fff",
              }}
            >
              <hr />
              <div
                style={{
                  margin: "auto",
                  padding: " 5px 0 10px",
                  width: "fit-content",
                  boxSizing: "border-box",
                  textAlign: "center",
                }}
              >
                <p style={{ margin: "5px 0" }}>
                  {/* Subtotal({cart?.total_items || 0} item
                          {cart?.total_items > 1 && "s"}):{" "}
                          {cart?.subtotal?.formatted_with_symbol} */}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "20px",
                  }}
                >
                  <Link
                    href="/basket"
                    onClick={handleBasketClose}
                    style={{ padding: "0 20px 0 0" }}
                  >
                    Go To Basket
                  </Link>

                  <Link href="/checkout" onClick={handleBasketClose}>
                    Go To Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
    )
}


export default HeaderBasket;