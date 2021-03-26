import React, {useState} from 'react'
import { ChangeStock } from '../../components/Admin/ChangeStock';
// gets all products names and stock
// lists all the products

const ALL_SIZES = [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5];





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