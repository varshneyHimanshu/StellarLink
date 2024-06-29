import React, { useEffect } from "react";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import "./PostSide.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PostSide = ({location}) => {
  const params = useParams();
  const profileUserId = params.id;
  const { user } = useSelector((state) => state.authReducer.authData);

  return (
    <div className="PostSide">
      {location === "homePage" &&
        <PostShare/>
      }
      {location === "profilePage" && profileUserId === user._id && 
            <PostShare/>
      }
        
      <Posts/>
    </div>
  );
};

export default PostSide;
