import { Button, IconButton, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../Authentication/LoginButton";
import { addReview } from "../../GraphQL/Mutations";
import {  useMutation } from "@apollo/client";
import CloseIcon from "@material-ui/icons/Close";
/*
check if authenicated before hand

if authenicated open modal popup

return snackbar on success or error message

*/
export const WriteAReview = ({
  productId,
  handleRefetch,
  productName,
  showForm,
  close
}) => {
  const { user, isAuthenticated } = useAuth0();
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [reviewSending, setReviewSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [
    createReview,
    { loading: mutationLoading, error: mutationError, data },
  ] = useMutation(addReview);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      productId,
      user?.nickname,
      user?.picture,
      description,
      title,
      Date()
    );
    createReview({
      variables: {
        productId: productId,
        productName: productName,
        name: user?.nickname,
        profileImage: user?.picture,
        rating: `${value}`,
        descriptionTitle: title,
        description: description,
      },
    });
    e.target.reset();
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    if (mutationLoading === true) {
      setReviewSending(true);
    } else if (mutationLoading === false && reviewSending === true) {
      setSent(true);
      handleRefetch();
    }
  }, [mutationLoading]);

  if (sent) return <h3>Thank you for reviewing the product</h3>;


  const handleClose = ()=> close();
  return (
    <div>
      {isAuthenticated ? (
       
          <form
            onSubmit={handleSubmit}
            style={{
              display: !showForm ? "none" : "grid",
              border: "1px solid gray",
              padding: "20px",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ margin: "10px 0 0", width: "fit-content" }}>
                  Edit a review
                </h3>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
            <div style={{display:'grid'}}>
              <label>Rating</label>
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
            </div>
            
            {/* <hr style={{ width: "100%" }} /> */}
            <div style={{ display: "grid" }}>
              <label>Title</label>
              <TextField
                required
                placeholder="Title..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>

            <div style={{ display: "grid" }}>
              <label>Description</label>
              <TextField
                required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                multiline
                placeholder="Description..."
              />
            </div>

            <Button
              variant="contained"
              style={{ width: "fit-content", backgroundColor:'#555', color:'white' }}
              type="submit"
              
            >
              Submit
            </Button>
          </form>
       
      ) : (
        <>
          <h3>You need to be logged in to write a review</h3>
          <LoginButton />
        </>
      )}
    </div>
  );
};
