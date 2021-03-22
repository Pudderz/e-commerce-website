import {
  Button,
  Checkbox,
  FormControl,
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
  ) {
    createProduct(
      files: $files
      productname: $productname
      price: $price
      stock: $stock
      slug: $slug
      description: $description
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

  createProductMutation

  const [createProduct, {data, error}] = useMutation(createProductMutation);

  console.log(data, error)
  const {register, handleSubmit} = useForm();


  const filePond = useRef(null);
  // const [uploadFile] = useMutation(uploadFileMutation, {
  //   refetchQueries: [{ query: filesQuery }],
  // });
  // const onDrop = useCallback(
  //   ([file]) => {
  //     uploadFile({ variables: { file } });
  //   },
  //   [uploadFile]
  // );

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleFormSubmit = (data) => {
    const fileArray = [];

    files.forEach(file=>{
      fileArray.push(file.file);
    })
    console.log({
      productname: data.productName,
      slug: data.slug,
      price: data.productPrice,
      description: data.description,
      files: fileArray,
      stock: stockArray,
    });
    createProduct({variables: {
      productname: data.productName,
      slug: data.slug,
      price: String(data.productPrice),
      description: data.description,
      files: fileArray,
      stock: stockArray,
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
              value={["", "test"]}
              // onChange={handleChange}
              fullWidth
              // input={<Input />}
              // MenuProps={MenuProps}
            >
              <MenuItem value={"test"} key ={"test"}>
                <Checkbox checked={["", "test"].indexOf("") > -1} />
                <ListItemText primary={"test"} />
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
