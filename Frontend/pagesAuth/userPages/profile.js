import { useAuth0 } from "@auth0/auth0-react";
import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import { LogoutButton } from "components/Authentication/LogoutButton";
import TabPanel from "components/Common/TabPanel";
import UserOrders from "components/profilePage/userOrders";
import UserReviews from "components/profilePage/UserReviews";
import styled from "styled-components";

const Background = styled.div`
  max-width: 100%;
  text-align: start;
  background-color: #ede8e8;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin: auto;
  padding: 40px 0px;
`;

const Item = styled.div`
  background-color: #fff;
  box-sizing: border-box;
`;

export const Profile = () => {
  const { user } = useAuth0();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <Background>
      <Wrapper>
        <Item
          style={{ padding: "20px",}}
        >
          <img src={user?.picture} alt={user?.name} />
          <h3>Email: {user?.email}</h3>

          {user?.email_verified === false ? (
            <p style={{ color: "red" }}>Verifiy Email</p>
          ) : (
            <p style={{ color: "green" }}>Email verified</p>
          )}
          <h3>Name: {user?.nickname}</h3>
          <div style={{ width: "150px" }}>
            <LogoutButton textStart={true} />
          </div>
        </Item>

        <Item style={{ margin: "40px auto" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="full width tabs of reviews and orders"
          >
            <Tab value={0} label="Reviews"></Tab>
            <Tab value={1} label="Orders"></Tab>
          </Tabs>

          <TabPanel value={value} index={0}>
            <UserReviews />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UserOrders />
          </TabPanel>
        </Item>
      </Wrapper>
    </Background>
  );
};

export default Profile;
