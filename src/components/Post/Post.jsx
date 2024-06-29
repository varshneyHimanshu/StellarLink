import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost,deletePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast"

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const params = useParams();
  const personId = params.id;

  
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
  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        {personId === user._id && 
          <MdDelete size={30} onClick={deleteHandler}/>
        }
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
