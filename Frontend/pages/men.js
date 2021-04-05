import React from 'react'
import { Categories } from '../components/FrontPage/Categories';
import { RecentProducts } from "../components/FrontPage/RecentProducts";
import webBanner from "../images/WebBannerPNG.png";
import casualBackground from '../images/casualBackground.jpg'
export const Men = () => {
    return (
        <div>
           <div style={{ backgroundColor: "#CE1121" }}>
           <img src={casualBackground} alt="" />
      </div>
      
     
      <div>
        <h3>Best Sellers Mens</h3>
        <hr/>
      </div>
      <div>
        <h3>Newest men products</h3>
        <hr/>
        <RecentProducts/>
      </div>
      <div>
        <h3>Men discounts</h3>
        <hr/>
        <RecentProducts/>
      </div>
      <div>
        <h3>Men Categorys</h3>
        <hr/>
        <Categories/>
      </div> 
        </div>
    )
}


export default Men;
