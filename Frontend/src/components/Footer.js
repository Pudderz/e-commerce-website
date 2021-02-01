import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <div>
            <div>Subscribe to our newsletter
            <input type="text" />    
            </div>
            
        <footer className="grid">
          <hr
            style={{ width: "100%", maxWidth: "1300px", margin: "24px auto 0" }}
          />
          <div
            style={{ margin: "auto", padding: "20px" }}
            className="selection"
          >
            {/* <CategorySelection changeCategory={this.changeCategory}/> */}
          </div>
          <hr style={{ width: "100%", maxWidth: "1300px", margin: "auto" }} />
          <div
            className="flexFooter"
            style={{
              display:'flex',
              justifyContent:'space-between',
              width: "100%",
              maxWidth: "1300px",
              margin: "auto",
              padding: "10px",
              flexWrap: 'wrap',
            }}
          >
            <Link to="/">Home</Link>
            <Link to="/store">About </Link>
            <Link to="/findastore">Find a Store</Link>
            <Link to="/store">Products</Link>
          </div>
        </footer>

        </div>
    )
}
