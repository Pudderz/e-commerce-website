import { Button } from "@material-ui/core";
import React, { useState, useCallback } from "react";
import { SelectSize } from "../../components/ProductPages/SelectSize";
import { gql } from "@apollo/client";
import { useDropzone } from "react-dropzone";
import {  useMutation } from "@apollo/client";
import {  useLazyQuery } from "@apollo/client";
const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file){
      averageRating
    }
  }
`;


export const filesQuery = gql`
  {
    files
  }
`;

 const Files = () => {
  const { data, loading } = useLazyQuery(filesQuery);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      {data?.files?.map(x => (
        <img
          style={{ width: 200 }}
          key={x}
          src={`https://storage.cloud.google.com/e-commerce-image-storage-202/${x}`}
          alt={x}
        />
      ))}
    </div>
  );
};


export const CreateProducts = () => {
  const [stockTotal, setTotalStock] = useState(0);

  const [uploadFile] = useMutation(uploadFileMutation, {
    refetchQueries: [{ query: filesQuery }]
  });
  const onDrop = useCallback(
    ([file]) => {
      uploadFile({ variables: { file } });
    },
    [uploadFile]
  );


  const { getRootProps, getInputProps, isDragActive  } = useDropzone({ onDrop });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = () => {};
  return (
    <div>
      <h3>Create a Product</h3>
      <form onSubmit={handleSubmit}>
        <Files/>
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
        </div>

        {/* <input type="file" /> */}
        <div>
          <ul>{/* list of uploaded Images */}</ul>
        </div>
        <div>
          <p>Title</p>
          <input type="text" />
        </div>
        <div>
          <p>slug</p>
          <input type="text" />
        </div>
        <div>
          <p>Price</p>
          <input type="text" />
        </div>
        <div>
          <p>Description</p>
          <textarea />
        </div>
        <div>
          <p>Categories</p>
          {/* Multi select */}
        </div>

        <p>Total Stock {stockTotal}</p>
        <div style={{ margin: "auto", width: "fit-content" }}>
          <SelectSize availableSizes={[4]} />
        </div>
        <Button type="submit">Create Product</Button>
      </form>
    </div>
  );
};

export default CreateProducts;
