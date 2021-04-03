import { Button, Checkbox, FormControlLabel } from '@material-ui/core'
import React from 'react';
import {useForm} from 'react-hook-form';

export const StoreFilter = ({handleFormChange}) => {
    const {register, handleSubmit} = useForm();
    

    const onSubmit = (data)=>{
      console.log(data)
      handleFormChange(data);
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
                  control={
                    <Checkbox
                      inputRef={register}
                      name="female"
                      color="primary"
                    />
                  }
                  label="Female"
                />
              </li>

              <li>
                <Button style={{ width: "100%" }}>Shop By Price</Button>
                <FormControlLabel
                  control={
                    <Checkbox
                      inputRef={register}
                      name="under50"
                      color="primary"
                    />
                  }
                  label="Under £50"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      inputRef={register}
                      name="under100"
                      color="primary"
                    />
                  }
                  label="Under £100"
                />
              </li>

              <li>
                <Button style={{ width: "100%"}}>On Sale</Button>
                <FormControlLabel
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

              <li>
                <Button style={{ width: "100%" }}>Size</Button>
                {/* <SelectSize availableSizes={[2,4,5]}></SelectSize> */}
              </li>
              {/* <li>
                <Button style={{ width: "100%" }}>Colours</Button>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="green"
                      color="primary"
                      inputRef={register}
                    />
                  }
                  label="Green"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                    inputRef={register}
                      name="red"
                      color="primary"
                    />
                  }
                  label="Green"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={state.checkedB}
                      // onChange={handleChange}
                      name="blue"
                      inputRef={register}
                      color="primary"
                    />
                  }
                  label="blue"
                />
              </li> */}
            </ul>
            <Button variant="contained" color="primary" type="submit">Submit</Button>
          </form>
    )
}

export default StoreFilter;