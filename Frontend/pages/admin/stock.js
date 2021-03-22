import React, {useState} from 'react'
import { ChangeStock } from '../../components/Admin/ChangeStock';
// gets all products names and stock
// lists all the products




export const Stock = () => {

    const [stockArray, setStockArray] = useState(Array.from({length: ALL_SIZES.length}, ()=> 0))
  const handleStockChange = (index, value)=>{
    let newValue = stockArray[index] + value
    stockArray[index] = newValue>=0? newValue: 0;
    setStockArray([...stockArray]);
  }


    return (
        <div>
            <h2>Stock Page</h2>
        
            <ChangeStock availableSizes={[4]} stockArray={stockArray} changeStock={handleStockChange}/>


        </div>
    )
}


export default Stock;