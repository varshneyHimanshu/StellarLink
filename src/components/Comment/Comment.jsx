import React, { useEffect, useState } from 'react'
import "../Comment/Comment.css"
import { FaRegCommentAlt } from "react-icons/fa";
import * as UserApi from "../../api/UserRequests.js"
import { Link } from 'react-router-dom';
export const Comment = ({comment}) => {
  const [user,setUser] = useState({});
  useEffect(async(req,res)=>{
    try{
      const userId = comment.comment_user_id;
      const user = (await UserApi.getUser(userId)).data;
      // console.log(user);
      setUser(user);
    }
    catch(error){
      console.log(error);
    }
  },[]);
  return (
    <div>
      <div className='hima'>
        <Link to={`/profile/${user._id}`} className='username'>@{user.username}</Link>
          {comment.comment}
      </div>
    </div>
  )
}
