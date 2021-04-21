import React from "react";
import AuthenticatedRoute from "components/Authentication/AuthenticatedRoute";
import dynamic from 'next/dynamic';
const Profile = dynamic(() => import("pagesAuth/userPages/profile"));

export const ProfilePage = () => {

  return (
    <AuthenticatedRoute>
      <Profile/>
    </AuthenticatedRoute>
  );
};

export default ProfilePage;
