import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { SelectSize } from "../../components/ProductPages/SelectSize";
import { gql } from "@apollo/client";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilepondPluginDragReorder from "filepond-plugin-drag-reorder";
import { ChangeStock } from "../../components/Admin/ChangeStock";
import {useForm} from "react-hook-form";



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

const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      averageRating
    }
  }
`;
const createProductMutation = gql`
  mutation UploadProduct(
    $files: [Upload!]
    $productname: String!
    $price: String!
    $stock: [Int!]
    $slug: String!
    $description: String!
    $categories: [String!]
    $female: Boolean
    $male: Boolean
  ) {
    createProduct(
      files: $files
      productname: $productname
      price: $price
      stock: $stock
      slug: $slug
      description: $description
      categories: $categories
      male: $male
      female: $female
    ) {
      productName
      price
      stock
      description
    }
  }
`;

export const CreateProducts = () => {
  const [stockTotal, setTotalStock] = useState(0);
  const [stockArray, setStockArray] = useState(Array.from({length: ALL_SIZES.length}, ()=> 0))
  const [files, setFiles] = useState([]);


  const [createProduct, {data, error}] = useMutation(createProductMutation);

  const [categories, setCategories] = useState([]);



  console.log(data, error)
  const {register, handleSubmit} = useForm();


  const filePond = useRef(null);

  const handleFormSubmit = (data) => {
    const fileArray = [];

    files.forEach(file=>{
      fileArray.push(file.file);
    })
    // console.log({
    //   productname: data.productName,
    //   slug: data.slug,
    //   price: data.productPrice,
    //   description: data.description,
    //   files: fileArray,
    //   stock: stockArray,
    //       categories: categories,
    //   male:data.male,
    //   female:data.female,
    //   males: typeof data.male,
    //   females: typeof data.female,
    // });
    createProduct({variables: {
      productname: data.productName,
      slug: data.slug,
      price: String(data.productPrice),
      description: data.description,
      files: fileArray,
      stock: stockArray,
      categories: categories,
      male:data.male,
      female:data.female
    }})
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  const changeFiles = (files) => {
    console.log(files);
    setFiles(files);
  };

  const handleStockChange = (index, value)=>{
    let newValue = stockArray[index] + value
    stockArray[index] = newValue>=0? newValue: 0;
    setStockArray([...stockArray]);
  }

  const handleCategoryChange=(e)=>{

    console.log(e.target.value)
    setCategories(e.target.value)
  }


  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <h3>Create a Product</h3>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
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
          <div>
            <TextField
              required
              name="slug"
              inputRef={register}
              label="Slug"
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
              type="number"
              startAdornment={
                <InputAdornment position="start">£</InputAdornment>
              }
              labelWidth={60}
              required
            />
          </FormControl>

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
          renderValue={(selected) => selected.join(', ')}
            >
              
              <MenuItem value={"running"} key ={"running"}>
                <Checkbox checked={categories.indexOf("running") > -1} />
                <ListItemText primary={"Running"} />
              </MenuItem>
              <MenuItem value={"hiking"} key ={"hiking"}>
                <Checkbox checked={categories.indexOf("hiking") > -1} />
                <ListItemText primary={"Hiking"} />
              </MenuItem>
              <MenuItem value={"casual"} key ={"casual"}>
                <Checkbox checked={categories.indexOf("casual") > -1} />
                <ListItemText primary={"casual"} />
              </MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
        control={<Checkbox inputRef={register} name="male" />}
        label="Male"
      />
         <FormControlLabel
        control={<Checkbox inputRef={register} name="female" />}
        label="Female"
      />
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

          <ChangeStock availableSizes={[4]} stockArray={stockArray} changeStock={handleStockChange}/>


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

        {/* <Files />
        <div
          {...getRootProps()}
          style={{
            width: "500px",
            height: "400px",
            margin: "auto",
            border: "1px solid gray",
          }}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div> */}

        {/* <input type="file" /> */}
        <div>
          <ul>{/* list of uploaded Images */}</ul>
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
