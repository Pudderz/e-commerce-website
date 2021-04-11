import { Button, Checkbox, FormControlLabel } from '@material-ui/core'
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import { FilterSize } from './FilterSize';

export const StoreFilter = ({handleFormChange}) => {
    const {register, handleSubmit} = useForm();
    
    const [sizes, setSizes] = useState([]);

    const handleSizeChange = (size)=>{
      if(sizes.includes(size*10)){
        sizes.splice(sizes.indexOf(size*10), 1);
        setSizes([...sizes]);
      }else{
        sizes.push(size*10);
        setSizes([...sizes]);
      }
    }

    const onSubmit = (data)=>{
      console.log(data)
      handleFormChange(data, sizes);
    }
    return (
        <form style={{ width: "300px", height: "100%" }} onSubmit={handleSubmit(onSubmit)}>
            <ul
              style={{ listStyle: "none", padding: "10px", textAlign: "start" }}
            >
              <li>
                <Button style={{ width: "100%" }}>Gender</Button>
                <hr/>
                <FormControlLabel
                style={{width:'100%'}}
                  control={
                    <Checkbox
                      inputRef={register}
                      name="male"
                      color="primary"
                    />
                  }
                  label="Male"
                />
                <FormControlLabel
                style={{width:'100%'}}
                  control={
                    <Checkbox
                      inputRef={register}
                      name="female"
                      color="primary"
                    />
                  }
                  label="Female"
                />
                <FormControlLabel
                style={{width:'100%'}}
                  control={
                    <Checkbox
                      inputRef={register}
                      name="unisex"
                      color="primary"
                    />
                  }
                  label="Unisex"
                />
              </li>

              <li>
                <Button style={{ width: "100%" }}>Shop By Price</Button>
                <FormControlLabel
                style={{width:'100%'}}
                  control={
                    <Checkbox
                      inputRef={register}
                      name="under100"
                      color="primary"
                    />
                  }
                  label="Under £100"
                />
                <FormControlLabel
                style={{width:'100%'}}
                  control={
                    <Checkbox
                      inputRef={register}
                      name="between100And150"
                      color="primary"
                    />
                  }
                  label="£100-£150"
                />
                <FormControlLabel
                style={{width:'100%'}}
                  control={
                    <Checkbox
                      inputRef={register}
                      name="over150"
                      color="primary"
                    />
                  }
                  label="£150+"
                />
              </li>

              <li>
                <Button style={{ width: "100%"}}>On Sale</Button>
                <FormControlLabel
                style={{width:'100%'}}
                  control={
                    <Checkbox
                      inputRef={register}
                      name="discounted"
                      color="primary"
                    />
                  }
                  label="Discounted"
                />
              </li>

              <li >
                <Button style={{ width: "100%" }}>Size</Button>

                <FilterSize changeSize={(size)=>handleSizeChange(size)} sizes={sizes}/>
                {/* <SelectSize availableSizes={[2,4,5]}></SelectSize> */}
              </li>
              <li>
                <label htmlFor="sortBy"></label>
                <select name="sortBy" ref={register}>
                  <option value="" key="date">Newest</option>
                  <option value="LowToHigh" key="LowToHigh">Low - High</option>
                  <option value="HighToLow" key="HighToLow">High - Low</option>
                  <option value="sold" key="sold">BestSellers</option>
                </select>
              </li>
              <li>
                <Button style={{ width: "100%" }}>Shop By Price</Button>
                <FormControlLabel
                style={{width:'100%'}}
                  control={
                    <Checkbox
                      inputRef={register}
                      name="running"
                      color="primary"
                    />
                  }
                  label="Running"
                />
                <FormControlLabel
                style={{width:'100%'}}
                  control={
                    <Checkbox
                      inputRef={register}
                      name="casual"
                      color="primary"
                    />
                  }
                  label="Casual"
                />
                <FormControlLabel
                style={{width:'100%'}}
                  control={
                    <Checkbox
                      inputRef={register}
                      name="hiking"
                      color="primary"
                    />
                  }
                  label="Hiking"
                />
              </li>
            </ul>
            <Button variant="contained" color="primary" type="submit">Submit</Button>
          </form>
    )
}

export default StoreFilter;