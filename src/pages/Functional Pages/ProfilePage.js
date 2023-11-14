import React from "react";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import RedirectEdit from "../../components/Profile/RedirectEdit";
import "./ProfilePage.css";

function ProfilePage() {
  return (
    <div className="profile-page">
      <ProfileInfo />
      <RedirectEdit />
    </div>
  );
}

export default ProfilePage;
