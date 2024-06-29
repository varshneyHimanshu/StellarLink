import React, { useState } from "react";
import Logo from "../../img/logo.png";
import './LogoSearch.css'
import { UilSearch } from '@iconscout/react-unicons'
import * as UserApi from "../../api/UserRequests.js";
import * as ChatApi from "../../api/ChatRequests.js";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const LogoSearch = ({location}) => {
  const [data,setData] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducer.authData);

  const changeHandler = (e)=>{
    setData(e.target.value);
  }

  const fetchProfileUser = async () => {
    
      console.log("fetching");
      const profileUser = (await UserApi.getUserByName(data)).data;
      console.log(profileUser);
      if (profileUser && profileUser._id) {
        toast.success("User found");
        navigate(`/profile/${profileUser._id}`);
      }
      else {
        toast.error("No user found");
      }
  };

  const createNewChat = async() =>{
    console.log("creating")
    const profileUser = (await UserApi.getUserByName(data)).data;
    console.log(profileUser);
    if(profileUser && profileUser._id){
      const newChat = (await ChatApi.createChat({
        senderId:user._id,
        receiverId: profileUser._id
      }));
      toast.success("Added Successfully..Please Refresh...");
    }
    else {
      toast.error("user Not found");
    }
  }

  const clickHandler = (e)=>{
    e.preventDefault();
    if(location === 'homePage' || location === 'profilePage'){
      fetchProfileUser();
    }
    if(location == "chatPage"){
      createNewChat();
    }
  }
  
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="" />
      <div className="Search">
          <input 
            type="text" placeholder="Search User..."
            name = "data" onChange={changeHandler}
          />
          <button className="s-icon" onClick={clickHandler}>
            <UilSearch/>     
          </button>
      </div>
    </div>
  );
};

export default LogoSearch;
