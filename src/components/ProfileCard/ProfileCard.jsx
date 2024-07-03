import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserApi from "../../api/UserRequests.js";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { findChat } from "../../api/ChatRequests.js";
import toast from "react-hot-toast";

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

  // const handleFollow = async(req,res) => {
  //     if(following){
  //       try{
  //         setFollowing((prev) => !prev);
  //         const makecall = async(req,res)=>{
  //           try{
  //             await dispatch(unfollowUser(profileUser._id, user))
  //           }
  //           catch(error) {console.log(error);}
  //         }
  //         makecall();
  //       }
  //       catch(error){
  //         console.log(error);
  //       }
  //     }
  //     else {
  //       try{
  //         setFollowing((prev) => !prev);
  //         const makecall = async(req,res)=>{
  //           try{
  //             await dispatch(followUser(profileUser._id, user))
  //           }
  //           catch(error) {console.log(error);}
  //         }
  //         makecall();
  //       }
  //       catch(error){
  //         console.log(error);
  //       }
  //     }

    
  // };

  const handleFollow = async () => {
    if (!user) {
      toast.error("You need to be logged in to follow or unfollow users.");
      return;
    }
  
    try {
      
      console.log(profileUser);
  
      const response = following
        ?  dispatch(unfollowUser(profileUser._id, user))
        :  dispatch(followUser(profileUser._id, user));
  
      if (response.error) {
        throw new Error(response.error.message);
      }

      setFollowing((prev) => !prev);
      window.location.reload();
    } catch (error) {
      console.log('Error in following/unfollowing:', error);
      toast.error("error occured");
    }
  };

  return (
    <div className="ProfileCard">
      <div className={location==="homepage"?"hoemProfileImages":"ProfileImages"}>
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
          {`@${profileUser.username}`}
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
