import { Button, TextField } from "@material-ui/core";
import React, { useState, useRef, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./LoginButton";
import { addReview } from "../GraphQL/Mutations";
import { useLazyQuery, useMutation } from "@apollo/client";
/*
check if authenicated before hand

if authenicated open modal popup

return snackbar on success or error message

*/
export const WriteAReview = ({ productId, handleRefetch, productName }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [reviewSending, setReviewSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
console.log(user)
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


  if(sent) return(
    <h3>Thank you for reviewing the product</h3>
  )

  return (
    <div>
      {isAuthenticated ? (
        <>
 
          <form style={{ display: "grid" }} onSubmit={handleSubmit}>
            <h3>Write a review</h3>
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
            <hr style={{ width: "100%" }} />
            <label>Title</label>
            <TextField
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            <label>Description</label>
            <TextField
              required
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <Button type="submit">Submit</Button>
          </form>
        </>
      ) : (
        <>
          <h3>You need to be logged in to write a review</h3>
          <LoginButton />
        </>
      )}
    </div>
  );
};
