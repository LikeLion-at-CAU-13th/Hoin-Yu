import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { AiOutlinePlaySquare, AiOutlineHome  } from "react-icons/ai";
import { BsPlayBtnFill } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-item">
        <AiOutlineHome size="25"/><p>홈</p></Link>
      <Link to="/shorts" className="sidebar-item">
      <AiOutlinePlaySquare size="25"/>
        <p>Shorts</p></Link>
      <Link to="/subscriptions" className="sidebar-item">
      <BsPlayBtnFill size = "25"/>
        <p>구독</p></Link>
      <Link to="/mypage" className="sidebar-item">
        <IoPersonCircleOutline size="25"/><p>내 페이지</p></Link>
    </div>
  );
}

export default Sidebar;
