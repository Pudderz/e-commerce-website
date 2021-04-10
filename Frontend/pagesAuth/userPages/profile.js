import { useAuth0 } from "@auth0/auth0-react";
import { Box, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import { LogoutButton } from "../../components/Authentication/LogoutButton";
import UserOrders from "../../components/profilePage/UserOrders";
import UserReviews from "../../components/profilePage/UserReviews";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export const Profile = () => {
  const { user } = useAuth0();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <div
      style={{
        maxWidth: "100%",
        textAlign: "start",
        backgroundColor: "#ede8e8",
      }}
    >
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            margin: "auto",
            padding: "40px 0 ",
          }}
        >
          <div
            style={{
              padding: "20px",
              backgroundColor: "#fff",
              boxSizing: "border-box",
            }}
          >
            <img src={user?.picture} alt={user?.name} />
            <h3>Email: {user?.email}</h3>

            {user?.email_verified === false ? (
              <p style={{ color: "red" }}>Verifiy Email</p>
            ) : (
              <p style={{ color: "green" }}>Email verified</p>
            )}
            <h3>Name: {user?.nickname}</h3>
            <LogoutButton />
          </div>

          <div style={{ backgroundColor: "#fff", margin: "40px auto" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              aria-label="full width tabs of products information"
            >
              <Tab value={0} label="Reviews"></Tab>
              <Tab value={1} label="Orders"></Tab>
            </Tabs>

            <TabPanel value={value} index={0}>
                <UserReviews/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <UserOrders/>
            </TabPanel>
          </div>
        </div>
     
      {/* {JSON.stringify(data, null, 2)} */}
    </div>
  );
};

export default Profile;
