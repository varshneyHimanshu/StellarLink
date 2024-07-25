import React, { useState } from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Posts from "../../components/Posts/Posts";

const Profile = () => {
  const params = useParams();
  const profileUserId = params.id;
  const { user } = useSelector((state) => state.authReducer.authData);
  const [isfollowing,setIsFollowing] = useState(false);

  return (
    <div className="Profile">
      <ProfileLeft />
      <div className="Profile-center">
        <ProfileCard location = 'profilePage' setIsFollowing = {setIsFollowing}/>
        <PostSide location="profilePage" isfollowing = {isfollowing}/>
      </div>
      <RightSide/>
    </div>
  );
};

export default Profile;
