import Link from 'next/link'
import React from 'react'

export const Index = () => {
    return (
        <div>
            <h1>Admin Page</h1>
            


        <div>
            <Link href="/admin/orders">All Orders</Link>
        </div>
        <div>
            <Link href="/admin/createProducts">Create a product</Link>
        </div>
        <div>
            <Link href="/admin/allProducts">All Products</Link>
        </div>
        <div>
            <Link href="/admin/stock">Update and edit stock</Link>
        </div>   
        </div>
    )
}

export default Index;