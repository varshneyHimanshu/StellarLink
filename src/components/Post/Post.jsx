import React, { useEffect, useState } from "react";
import "./Post.css";
import { Comment } from "../Comment/Comment.jsx";
import CommentImage from "../../img/CommentImage.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost,deletePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast"
import * as UserApi from "../../api/UserRequests.js";
import * as CommentApi from "../../api/CommentRequests.js";

const Post = ({ data,location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const params = useParams();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const personId = params.id;
  const [PostUser,setPostUser] = useState({});
  const [comments,setComments] = useState([]);
  const [isClickedMessage,setisClickedMessage] = useState(false);
  const [cmt,setCmt] = useState("");

  useEffect(async(req,res) => {
    try{
      const PostUser = (await UserApi.getUser(data.userId)).data;
      const comments = (await CommentApi.getAllComments(data._id)).data;
      setComments(comments);
      setPostUser(PostUser);
    }
    catch(error){
      toast.error("unable to fetch User of the Post...");
      console.log(error);
    }
  }, []);

  
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };

  const deleteHandler = async(req,res)=>{
    try{
      await deletePost(data._id,user._id);
      toast.success("Post Deleted");
      window.location.reload();
    }
    catch(error){
      console.log(error);
      toast.error("Error In Deleting Post");
    }
  }
  const handleClick = ()=>{
    setisClickedMessage(!isClickedMessage);
  } 
  const addCommentHandler = async()=>{
    try{
      const user_id = user._id;
      const comment = cmt;
      const id = data._id;
      await CommentApi.createComment(id,user_id,comment);
      toast.success("Comment Added Successfully");
      setComments((prevComments) => [
        ...prevComments,
        { user_id, comment, createdAt: new Date().toISOString() } // Adjust according to the actual returned data structure
      ]);
    }
    catch(error){
      toast.error("Error in Posting Comment");
      console.log("Error in Posting Comment",error);
    }
  }
  const changeHandler = (e)=>{
    setCmt(e.target.value);
  }
  return (
    <div className="Post">

      {location === "homePage" &&
        <Link className="rpi" 
        to={`/profile/${PostUser._id}`} 
        style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={
              PostUser.profilePicture
                ? serverPublic + PostUser.profilePicture
                : serverPublic + "defaultProfile.png"
            }
            className="postUserProfile"
            alt="ProfileImage"
          />
          <div className="name">
            <div>{PostUser.firstname} {PostUser.lastname}</div>
            <div className="username">@{PostUser.username}</div>
          </div>
        </Link>
      }

      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>


      <div className="postReact">
        <div className="options">
          <img
            src={liked ? Heart : NotLike}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={handleLike}
          />
          <img src={CommentImage} alt="" onClick={handleClick} />
          {personId === user._id && 
            <MdDelete size={30} onClick={deleteHandler}/>
          }
        </div>
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      {isClickedMessage && 
        <div className="big-container">
          <div className="cont">
              <input className="search"
              type="text" placeholder="Write a Comment"
              name = "cmt" onChange={changeHandler} 
              ></input>
              <button className="button fc-button" onClick={addCommentHandler}>Comment</button>
          </div>
          {comments.length == 0 && 
            <h2>No Comments</h2>
          }
          {comments.length != 0 && 
            <h2>Comments</h2>
          }
          
          <ul>
            {comments.map((comment) => (
              <Comment comment={comment}/>
            ))}
          </ul>
        </div>
      }
      
    </div>
  );
};

export default Post;
