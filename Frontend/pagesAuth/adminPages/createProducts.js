import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilepondPluginDragReorder from "filepond-plugin-drag-reorder";
import { ChangeStock } from "components/Admin/ChangeStock";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import styled from "styled-components";
import { ALL_SHOE_SIZES } from "../../globals/globals";
import { CREATE_PRODUCT } from "GraphQL/Mutations";


registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilepondPluginDragReorder
);



const Container = styled.div`
  background-color: #fff;
  max-width: 100%;
  width: 900px;
  margin: 20px auto;
  padding: 10px;
  border-radius: 10px;

  & > h4 {
    text-align: start;
    margin: 0;
  }
`;

export const CreateProducts = () => {
  const [stockArray, setStockArray] = useState(
    Array.from({ length: ALL_SHOE_SIZES.length }, () => 0)
  );
  const [files, setFiles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const form = useRef(null);
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const [categories, setCategories] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  const filePond = useRef(null);

  const resetForm = () => {
    setFiles([]);
    setCategories([]);
    reset();
  };

  const handleFormSubmit = async (data) => {
    const fileArray = [];
    files.forEach((file) => {
      fileArray.push(file.file);
    });
    try {
      await createProduct({
        variables: {
          productname: data.productName,
          price: Number(data.productPrice),
          description: data.description,
          files: fileArray,
          stock: stockArray,
          categories: categories,
          gender: data.gender,
        },
      });

      enqueueSnackbar("product created", {
        variant: "success",
      });
      resetForm();
    } catch (err) {
      console.log(err.message);
      enqueueSnackbar(err.message, {
        variant: "error",
      });
    }
  };

  const changeFiles = (files) => setFiles(files);
 

  const handleStockChange = (index, value) => {
    const newValue = stockArray[index] + value;
    stockArray[index] = newValue >= 0 ? newValue : 0;
    setStockArray([...stockArray]);
  };

  const handleCategoryChange = (e) => setCategories(e.target.value);
 

  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <h3>Create a Product</h3>
      <form onSubmit={handleSubmit(handleFormSubmit)} ref={form}>
        <Container style={{ margin: "auto" }}>
          <h4>Product Details</h4>
          <hr />
          <div>
            <TextField
              required
              inputRef={register}
              name="productName"
              label="Product Name"
              fullWidth
              variant="outlined"
              style={{ margin: "10px 0" }}
            ></TextField>
          </div>

          <FormControl
            fullWidth
            variant="outlined"
            style={{ margin: "10px 0" }}
          >
            <InputLabel htmlFor="productPrice">Price</InputLabel>
            <OutlinedInput
              id="product-price"
              inputRef={register}
              name="productPrice"
              step={0.01}
              type="number"
              startAdornment={
                <InputAdornment position="start">£</InputAdornment>
              }
              labelWidth={60}
              required
            />
          </FormControl>
          <div style={{ display: "grid" }}>
            <hr style={{ width: "100%" }} />
            <FormControl component="fieldset" required>
              <FormLabel component="legend" style={{ textAlign: "start" }}>
                Gender
              </FormLabel>

              <RadioGroup aria-label="gender" name="gender" required>
                <FormControlLabel
                  value="female"
                  control={<Radio inputRef={register} required />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio inputRef={register} required />}
                  label="Male"
                />
                <FormControlLabel
                  value="unisex"
                  control={<Radio inputRef={register} required />}
                  label="Unisex"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <TextField
            required
            inputRef={register}
            name="description"
            label="Description"
            multiline
            fullWidth
            variant="outlined"
            rows={4}
            style={{ margin: "10px 0" }}
          ></TextField>
        </Container>

        <Container>
          <FormControl style={{ width: "100%" }}>
            <InputLabel id="categories-checkbox-label">Categories</InputLabel>
            <Select
              labelId="categories-checkbox-label"
              id="categories-checkbox"
              multiple
              inputRef={register}
              name="categories"
              value={categories}
              onChange={handleCategoryChange}
              defaultValue
              fullWidth
              required
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value={"running"} key={"running"}>
                <Checkbox checked={categories.indexOf("running") > -1} />
                <ListItemText primary={"Running"} />
              </MenuItem>
              <MenuItem value={"hiking"} key={"hiking"}>
                <Checkbox checked={categories.indexOf("hiking") > -1} />
                <ListItemText primary={"Hiking"} />
              </MenuItem>
              <MenuItem value={"casual"} key={"casual"}>
                <Checkbox checked={categories.indexOf("casual") > -1} />
                <ListItemText primary={"casual"} />
              </MenuItem>
            </Select>
          </FormControl>
        </Container>
        <Container>
          <ChangeStock
            availableSizes={[4]}
            stockArray={stockArray}
            changeStock={handleStockChange}
          />
        </Container>

        <Container style={{ padding: " 5px 10px 10px" }}>
          <h4>Images</h4>
          <hr />

          <FilePond
            ref={filePond}
            files={files}
            allowReorder={true}
            allowMultiple={true}
            imagePreviewHeight={250}
            onupdatefiles={changeFiles}
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
        </Container>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: "20px auto" }}
        >
          Create Product
        </Button>
      </form>
    </div>
  );
};

export default CreateProducts;
