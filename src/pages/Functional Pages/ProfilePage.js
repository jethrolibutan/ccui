import React from "react";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import RedirectEdit from "../../components/Profile/RedirectEdit";
import "./ProfilePage.css";

function ProfilePage() {
  return (
    <div className="profile-page">
      <div className="profile">
        <ProfileInfo />
      </div>
      <div className="edit">
        <RedirectEdit />
      </div>
    </div>
  );
}

export default ProfilePage;
