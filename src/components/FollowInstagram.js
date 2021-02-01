import React from 'react'
import mountainRun from '../images/mountainRun.jpg'
import hikingBackground from '../images/hikingBackground.jpg'
import dog from '../images/dog.jpg'
import shoesInWater from '../images/shoesInWater.jpg'
import hikingBackground2 from '../images/hikingBackground2.jpg'

export const FollowInstagram = () => {
    return (
        <div style={{minHeight:'600px'}}>
       <h3 style={{margin:'80px 0 15px'}}>Follow us on instagram for more updates</h3>
       <button>Follow us</button>
       <div style={{display:'flex', margin:'50px auto', width:'fit-content', gap:'50px'}}>
         <img src={mountainRun} alt="" width="272px"/>
         <img src={hikingBackground} width="272px" alt="" />
         <img src={dog} width="272px" alt="" />
         <img src={shoesInWater} width="272px" alt="" />
         <img src={hikingBackground2} width="272px" alt="" />
       </div>

       <h3 style={{margin:'80px 0 15px'}}>Or connect with us on social media</h3>
        <p>icons</p>
     </div>
    )
}
