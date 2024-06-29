import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserApi from "../../api/UserRequests.js";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { findChat } from "../../api/ChatRequests.js";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const params = useParams();
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState(user);
  const dispatch = useDispatch();

  const [following, setFollowing] = useState(
    profileUser.followers.includes(user._id)
  );
  const [loading, setLoading] = useState(false); // To prevent multiple rapid clicks

  useEffect(() => {
    const fetchProfileUser = async () => {
      try{
        if (profileUserId === user._id) {
          setProfileUser(user);
        } else {
          const profileUser = (await UserApi.getUser(profileUserId)).data;
          setProfileUser(profileUser);
        }
      }
      catch(error){
        console.log("here");
        console.log(error);
      }
    };
    fetchProfileUser();
  }, [profileUserId, user]);

  useEffect(() => {
    setFollowing(profileUser.followers.includes(user._id));
  }, [profileUser,following]);

  const handleFollow = async(req,res) => {
    try{
      setFollowing((prev) => !prev);
      following
      ? dispatch(unfollowUser(profileUser._id, user))
      : dispatch(followUser(profileUser._id, user));
      
    }
    catch(error){
      console.log(error);
    }
    
  };

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            profileUser.coverPicture
              ? serverPublic + profileUser.coverPicture
              : serverPublic + "defaultCover.jpg"
          }
          alt="CoverImage"
        />
        <img
          src={
            profileUser.profilePicture
              ? serverPublic + profileUser.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>
          {profileUser.firstname} {profileUser.lastname}
        </span>
        <span>
          {profileUser.worksAt ? profileUser.worksAt : "Write about yourself"}
        </span>
      </div>

      {location === "profilePage" && profileUserId !== user._id && (
        <div className="followMessage">
          <button
            className={
              following ? "button fc-button UnfollowButton" : "button fc-button"
            }
            onClick={handleFollow}
            disabled={loading} // Disable button while loading
          >
            {following ? "Unfollow" : "Follow"}
          </button>
          <Link to="../chat" style={{ textDecoration: "none" }}>
            <button className={"button fc-button"}>Message</button>
          </Link>
        </div>
      )}

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>
              {profileUser.followers ? profileUser.followers.length : 0}
            </span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>
              {profileUser.following ? profileUser.following.length : 0}
            </span>
            <span>Following</span>
          </div>
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === profileUser._id)
                    .length}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            to={`/profile/${profileUser._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
