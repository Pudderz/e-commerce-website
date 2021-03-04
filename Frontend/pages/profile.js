import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Button, IconButton, TextField } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import { LoginButton } from "../components/Authentication/LoginButton";
import { LogoutButton } from "../components/Authentication/LogoutButton";
import { useLazyQuery, useMutation } from "@apollo/client";
import { LOAD_USER_REVIEWS } from "../GraphQL/Queries";
import Rating from "@material-ui/lab/Rating";
import { DELETE_USER_REVIEW, EDIT_USER_REVIEW } from "../GraphQL/Mutations";
import Link from "next/link";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // useLazyQuery so query can be sent with jwt token
  const [getReviews, { data, refetch, called }] = useLazyQuery(
    LOAD_USER_REVIEWS
  );

  const [deleteReviews, { data: deleteData }] = useMutation(DELETE_USER_REVIEW);
  const [editReviews, { data: editData }] = useMutation(EDIT_USER_REVIEW);

  useEffect(() => {
    console.log(user);
    console.log(deleteData);
    console.log(editData);
    console.log(data?.getUserReviews);
    handleClose();

    if (called) {
      refetch();
    } else {
      getReviews();
    }
  }, [deleteData, editData]);

  const handleDelete = async (id) => {
    if (id) {
      console.log(
        await deleteReviews({
          variables: { id: id, sub: "auth0|601004a08e5f53006a834978" },
        })
      );
    }
  };

  //  const classes = useStyles();
  // Modal Code

  const [open, setOpen] = useState(false);

  //Information fro editing a review
  const id = useRef("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [productName, setProductName] = useState("");
  const handleOpen = (review) => {
    //sets info to review that was clicked
    id.current = review._id;
    setProductName(review.productName);
    setTitle(review.descriptionTitle);
    setRating(1 * review.rating);
    setDescription(review.description);

    setOpen(true);
  };

  const handleClose = () => {
    id.current = "";
    setOpen(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (id.current) {
      editReviews({
        variables: {
          id: id.current,
          title: title,
          description: description,
          rating: `${rating}`,
        },
      });
    }
  };

  return (
    <div style={{ maxWidth: "100%", textAlign: "start" }}>
      {isAuthenticated ? (
        <div>
          <div style={{ padding: "20px" }}>
            <img src={user?.picture} alt={user?.name} />
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            {user?.email_verified === false ? (
              <p style={{ color: "red" }}>Verifiy Email</p>
            ) : (
              <p style={{ color: "green" }}>Email verified</p>
            )}
            <LogoutButton />
          </div>

          <div style={{ padding: "10px" }}>
            <h3>Reviews: {data?.getUserReviews?.length}</h3>

            <ul
              style={{
                textAlign: "start",
                padding: "20px",
                listStyle: "none",
                boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.3)",
                width: "fit-content",
                // margin: "auto",
                display: "flex",
                flexDirection: "column",
                // justifyContent:
              }}
            >
              {data?.getUserReviews?.map((review, index) => (
                <li key={index} style={{ margin: "20px 0" }}>
                  <Link
                    href={`/product/${review.productName.split(" ").join("-")}`}
                  >
                    {review?.productName}
                  </Link>
                  <hr />
                  <div style={{ display: "flex" }}>
                    <Avatar src={review?.profileImage} />
                    <p
                      style={{
                        display: "table-cell",
                        verticalAlign: "middle",
                        margin: "auto 20px",
                      }}
                    >
                      {review?.name}
                    </p>
                  </div>
                  <div style={{ display: "flex" }}>
                    {/* Review stars */}
                    <Rating value={1*review?.rating} readOnly />

                    <h4 style={{ margin: "5px 0" }}>
                      {review?.descriptionTitle}
                    </h4>
                  </div>
                  <div>
                    <p style={{ margin: "5px 0" }}>
                      Reviewed in the United Kingdom on 3 August 2018
                    </p>
                  </div>
                  <div>
                    <p>{review?.description}</p>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() => handleDelete(review._id)}
                    >
                      Delete Review
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() => handleOpen(review)}
                    >
                      Edit Review
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-review-modal"
            aria-describedby="edits a chosen users review on submit"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <form
              onSubmit={handleEdit}
              style={{
                display: "grid",
                border: "1px solid gray",
                padding: "20px",
                gap: "20px",
                backgroundColor: "#fff",
                maxWidth: "500px",
                margin: "auto",
                width: "100%",
                textAlign: "start",
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

              <p style={{ margin: "0" }}>
                For:{" "}
                <Link href={`/product/${productName.split(" ").join("-")}`}>
                  {productName}
                </Link>
              </p>

              <div style={{ display: "grid" }}>
                <label>Rating</label>
                <Rating
                  name="hover-feedback"
                  value={rating}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setRating(newValue);
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
                Edit
              </Button>
            </form>
          </Modal>
        </div>
      ) : (
        <LoginButton />
      )}
      {/* {JSON.stringify(data, null, 2)} */}
    </div>
  );
};

export default Profile;
