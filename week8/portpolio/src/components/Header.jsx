import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import bannerImg from "../assets/banner.jpg";
import profileImg from "../assets/profile_pic.jpg";
import About from "../pages/About";

function Header() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <div className="header">
      {/*  상단 검색 바 */}
      <div className="top-search-bar">
        <input
          type="text"
          placeholder="검색"
          className="search-input"
        />
      </div>
      <div className="banner">
      {/* 배너 이미지 */}
      <img
        src={bannerImg}
        alt="Banner"
        className="banner"
        style = {{
          width: '100%',
          maxWidth: '1000px',
          height: 'auto',
        }}
      />
      </div>
      {/* 프로필 + 소개 영역 */}
      <div className="channel-info">
        <img
          src={profileImg}
          alt="Profile"
          className="profile"
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />
        <div className="channel-details">
          <h1>Hoin의 포트폴리오</h1>
          <p>@Hoin의포트폴리오 • 구독자 40명</p>
          <p>React, JavaScript를 배우는 중입니다.{" "}
            <span className="more-text" onClick={openModal}>
              ...더보기
            </span></p>
            <div className="button-group">
        <button className="subscribe-button">구독</button>
        <button className="join-button">가입</button>
      </div>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="nav-tabs">
        <Link to="/">홈</Link>
        <Link to="/projects">프로젝트</Link>
        <Link to="/posting">게시물</Link>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // 배경 클릭 시 닫히고, 모달 내부 클릭 시 무시
          >
            <button className="modal-close" onClick={closeModal}>
              ✖
            </button>
            <About />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
