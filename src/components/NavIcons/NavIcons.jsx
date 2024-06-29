import React from "react";

import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";
import { RiMessage2Fill } from "react-icons/ri";
import { logout } from "../../actions/AuthActions";
import toast from "react-hot-toast";
import "./NavIcons.css";


const NavIcons = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  const handleLogOut = ()=> {
    dispatch(logout())
    toast.success("LogOut successfully");
  }
  return (
    <div className="navIcons">
      <Link to="../home">
        <img src={Home} alt="" />
      </Link>
      <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <MdAccountCircle size={30} color="#EF5757"/>
      </Link>
      
      <button style={{background:"none", border:"none"}} onClick={handleLogOut}><AiOutlineLogout className="hi" size={30} color="#EF5757"/></button>
      <Link to="../chat">
      <RiMessage2Fill size={30} color="#EF5757"/>
      </Link>
    </div>
  );
};

export default NavIcons;
