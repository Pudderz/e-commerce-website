import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Button, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { LoginButton } from "../components/Authentication/LoginButton";
import { LogoutButton } from "../components/Authentication/LogoutButton";
import { useLazyQuery, useMutation } from "@apollo/client";
import { LOAD_USER_REVIEWS } from "../GraphQL/Queries";
import Rating from "@material-ui/lab/Rating";
import { DELETE_USER_REVIEW, EDIT_USER_REVIEW } from "../GraphQL/Mutations";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();


  // useLazyQuery so query can be sent with jwt token
  const [getReviews, { data, refetch, called}] = useLazyQuery(LOAD_USER_REVIEWS);


  const [deleteReviews, { data: deleteData }] = useMutation(DELETE_USER_REVIEW);
  // const [editReviews, { data: editData}] = useMutation(EDIT_USER_REVIEW);


  useEffect(() => {
    console.log(user);
    console.log(data);
    console.log(data?.getUserReviews);
  }, [data]);


  useEffect(() => {
    console.log(user);
    console.log(deleteData);
    console.log(data?.getUserReviews);

    
    if(called){
      refetch();
    }else{
      getReviews();
    }
      
  }, [deleteData]);


  const handleDelete= async (id)=>{
    if(id){
     console.log(await deleteReviews({variables: {id: id, sub: "auth0|601004a08e5f53006a834978"}}));

    }
  }

//   const handleEdit = (id)=>{
// if(id){
//   editReviews
// }
//   }

  return (
    <div style={{ maxWidth: "100%" }}>
      {isAuthenticated ? (
        <div>
          <img src={user?.picture} alt={user?.name} />
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          {user?.email_verified === false ? (
            <p style={{ color: "red" }}>Verifiy Email</p>
          ) : (
            <p style={{ color: "green" }}>Email verified</p>
          )}
          <p>Bio</p>
          <div>
            <TextField />
            <Button variant="contained" color="primary">
              Save
            </Button>
          </div>

          {JSON.stringify(user, null, 2)}
          <LogoutButton />

          <div>
            <h3>Reviews</h3>
            <p>{data?.getUserReviews?.length}</p>
            <ul
              style={{
                textAlign: "start",
                padding: "20px",
                listStyle: "none",
                boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.3)",
                width: "fit-content",
                // margin: "auto",
                display: "flex",
                flexDirection:'column',
                // justifyContent:
              }}
            >
              {data?.getUserReviews?.map((review, index) => (
                <li key={index} style={{ margin: "20px 0" }}>
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
                    <Rating value={review?.rating} readOnly />

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
                  <div>
                    <Button variant="contained" onClick={()=>handleDelete(review._id)}>Delete Review</Button>
                    {/* <Button variant="contained"  onClick={()=>editReview(review._id)}>Edit Review</Button> */}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <LoginButton />
      )}
      {JSON.stringify(data, null, 2)}
    </div>
  );
};

export default Profile;
