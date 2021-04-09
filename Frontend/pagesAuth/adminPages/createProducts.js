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
import React, { useState, useEffect, useRef } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilepondPluginDragReorder from "filepond-plugin-drag-reorder";
import { ChangeStock } from "../../components/Admin/ChangeStock";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilepondPluginDragReorder
);

const ALL_SIZES = [
  3.5,
  4,
  4.5,
  5,
  5.5,
  6,
  6.5,
  7,
  7.5,
  8,
  8.5,
  9,
  9.5,
  10,
  10.5,
];

const createProductMutation = gql`
  mutation UploadProduct(
    $files: [Upload!]
    $productname: String!
    $price: Int!
    $stock: [Int!]
    $description: String!
    $categories: [String!]
    $gender: String!
  ) {
    createProduct(
      files: $files
      productname: $productname
      price: $price
      stock: $stock
      description: $description
      categories: $categories
      gender: $gender
    ) {
      productName
      price
      stock {
        shoeSize
        stock
      }
      description
    }
  }
`;

export const CreateProducts = () => {
  const [stockTotal, setTotalStock] = useState(0);
  const [stockArray, setStockArray] = useState(
    Array.from({ length: ALL_SIZES.length }, () => 0)
  );
  const [files, setFiles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const form = useRef(null);
  const [createProduct, { data, error }] = useMutation(createProductMutation);

  const [categories, setCategories] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  console.log(data, error);

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

    console.log(data)
    try {
      await createProduct({
        variables: {
          productname: data.productName,
          price: Number(data.productPrice),
          description: data.description,
          files: fileArray,
          stock: stockArray,
          categories: categories,
          gender: data.gender
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

  useEffect(() => {
    console.log(files);
  }, [files]);

  const changeFiles = (files) => {
    console.log(files);
    setFiles(files);
  };

  const handleStockChange = (index, value) => {
    let newValue = stockArray[index] + value;
    stockArray[index] = newValue >= 0 ? newValue : 0;
    setStockArray([...stockArray]);
  };

  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    setCategories(e.target.value);
  };

  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <h3>Create a Product</h3>
      <form onSubmit={handleSubmit(handleFormSubmit)} ref={form}>
        <div
          style={{
            backgroundColor: "#fff",
            maxWidth: "100%",
            width: "900px",
            margin: "auto",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <h4 style={{ textAlign: "start", margin: "0" }}>Product Details</h4>
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
            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              inputRef={register}
              name="productPrice"
              // value={values.amount}
              // onChange={handleChange('amount')}
              step={"0.01"}
              type="number"
              startAdornment={
                <InputAdornment position="start">£</InputAdornment>
              }
              labelWidth={60}
              required
            />
          </FormControl>
          <div style={{ display: "grid" }}>
            {/* <h5 style={{textAlign:'start', margin:'0'}}>Gender</h5> */}

            <hr style={{ width: "100%" }} />
            <FormControl component="fieldset" required>
              <FormLabel component="legend" style={{ textAlign: "start" }}>
                Gender
              </FormLabel>

              <RadioGroup
                aria-label="gender"
                name="gender"
                required
              >
                <FormControlLabel
                  value="female"
                  control={<Radio 
                    inputRef={register}
                    required
                  />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  
                  control={<Radio 
                    inputRef={register}
                    required
                  />}
                  label="Male"
                />
                <FormControlLabel
                  value="unisex"
                  control={<Radio 
                    inputRef={register}
                    required
                  />}
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
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            maxWidth: "100%",
            width: "900px",
            margin: "20px auto",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <FormControl style={{ width: "100%" }}>
            <InputLabel id="demo-mutiple-checkbox-label">Categories</InputLabel>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              multiple
              inputRef={register}
              name="categories"
              value={categories}
              onChange={handleCategoryChange}
              defaultValue
              // onChange={handleChange}
              fullWidth
              // input={<Input />}
              // MenuProps={MenuProps}
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
        </div>
        <div
          style={{
            backgroundColor: "#fff",
            maxWidth: "100%",
            width: "900px",
            padding: "10px",
            borderRadius: "10px",
            margin: "20px auto",
          }}
        >
          <ChangeStock
            availableSizes={[4]}
            stockArray={stockArray}
            changeStock={handleStockChange}
          />
        </div>

        <div
          style={{
            height: "fit-content",
            backgroundColor: "#fff",
            maxWidth: "100%",
            width: "900px",
            margin: "auto",
            padding: " 5px 10px 10px",
            borderRadius: "20px",
          }}
        >
          <h4 style={{ textAlign: "start", margin: "0" }}>Images</h4>
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
        </div>

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
