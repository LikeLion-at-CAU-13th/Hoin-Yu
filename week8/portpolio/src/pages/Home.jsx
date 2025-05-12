import React from "react";
import ProjectCard from "../components/ProjectCard";

function Home() {
  return (
    <div className="content">
      <h3>대표 프로젝트</h3>
      <div className="card-grid">
        <ProjectCard title="포트폴리오 웹사이트" description="React로 만든 나만의 사이트" />
        <ProjectCard title="Todo 앱" description="상태 관리 연습용 프로젝트" />
      </div>
    </div>
  );
}

export default Home;
