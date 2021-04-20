import { Button, IconButton, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../Authentication/LoginButton";
import { addReview } from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import CloseIcon from "@material-ui/icons/Close";
import { useSnackbar } from "notistack";
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
  close,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth0();
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [reviewSending, setReviewSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  console.log(user);

  const [
    createReview,
    { loading: mutationLoading, error: mutationError, data },
  ] = useMutation(addReview);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({
        productId: productId,
        productName: productName,
        name: user?.nickname,
        profileImage: user?.picture,
        rating: `${value}`,
        descriptionTitle: title,
        description: description,
      });
      await createReview({
        variables: {
          productId: productId,
          productName: productName,
          name: user?.nickname,
          profileImage: user?.picture,
          rating: value*10,
          descriptionTitle: title,
          description: description,
        },
      });
      e.target.reset();
      setTitle("");
      setDescription("");
      handleRefetch();
    } catch {
      console.log("failed to connect with server");
      enqueueSnackbar(
        "Failed to connect with backend server, please try again later",
        {
          variant: "error",
        }
      );
    }
  };

  useEffect(() => {
    if (mutationError) {
      console.error(mutationError);
    }
  }, [mutationError]);

  useEffect(() => {
    if (mutationLoading === true) {
      setReviewSending(true);
    } else if (
      mutationLoading === false &&
      reviewSending === true &&
      !!mutationError === false
    ) {
      setSent(true);
      // handleRefetch();
    }
  }, [mutationLoading]);

  if (sent) return <h3>Thank you for reviewing the product</h3>;

  const handleClose = () => close();
  return (
    <div>
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
        <div style={{ display: "grid" }}>
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
          style={{
            width: "fit-content",
            backgroundColor: "#555",
            color: "white",
          }}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
