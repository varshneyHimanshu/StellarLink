import React, { useState } from "react";
import PostSide from "../components/PostSide/PostSide";
import ProfileSide from "../components/profileSide/ProfileSide";
import RightSide from "../components/RightSide/RightSide";
import "./Home.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const Home = () => {
  return (
    <div className="Home">
      <ProfileSide location = "homePage"/>
      <PostSide location="homePage" />
      <RightSide />
    </div>
  );
};

export default Home;
