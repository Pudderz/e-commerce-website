import React,{useState} from 'react'

export const ProductImages = ({images}) => {
    console.log(images)
    const [main, setMain] = useState(0) 

    const changeMain = (index)=> setMain(index);
    return (
        <div style={{display:'flex'}}>
            <div> 
                <ul style={{listStyle:'none'}}>
                {images?.map((image, index)=>(
                    <li key={index} onClick={()=>changeMain(index)}>
                        <img src={image.url} height="50"/>
                    </li>
                ))}
                </ul>{/* All Images */}
               
            </div>
            <div>
                <button>{"<"}</button>
                {/* Selected image in full with  buttons for nexxt and previous images*/}
                <img src={images?.[main]?.url} alt="" height="500"/>
                <button>{">"}</button>
            </div>
        </div>
    )
}
