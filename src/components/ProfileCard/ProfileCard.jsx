import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserApi from "../../api/UserRequests.js";
import toast from "react-hot-toast";

const ProfileCard = ({ location, setIsFollowing }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const params = useParams();
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState(user);
  const [following, setFollowing] = useState(profileUser.followers.includes(user._id));
  const [followersCount, setFollowersCount] = useState(profileUser.followers ? profileUser.followers.length : 0);
  const [followingCount, setFollowingCount] = useState(profileUser.following ? profileUser.following.length : 0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = async () => {
    setLoading(true);
    try {
      if (!following) {
        await UserApi.followUser(profileUserId, user);
      } else {
        await UserApi.unfollowUser(profileUserId, user);
      }
      // Fetch updated profile user data
      const updatedProfileUser = (await UserApi.getUser(profileUserId)).data;
      setProfileUser(updatedProfileUser);
      setFollowing(!following);
      setFollowersCount(updatedProfileUser.followers.length);
      setFollowingCount(updatedProfileUser.following.length);
      setIsFollowing(state => !state);
    } catch (error) {
      setFollowing(following);
      toast.error("Error in doing the operation");
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchProfileUser = async () => {
      try {
        if (profileUserId === user._id) {
          setProfileUser(user);
        } else {
          const profileUser = (await UserApi.getUser(profileUserId)).data;
          setProfileUser(profileUser);
          setFollowersCount(profileUser.followers.length);
          setFollowingCount(profileUser.following.length);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileUser();
  }, [profileUserId, user]);

  useEffect(() => {
    setFollowing(profileUser.followers.includes(user._id));
    setFollowersCount(profileUser.followers.length);
    setFollowingCount(profileUser.following.length);
  }, [profileUser]);


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
              {followersCount}
            </span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>
              {followingCount}
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
