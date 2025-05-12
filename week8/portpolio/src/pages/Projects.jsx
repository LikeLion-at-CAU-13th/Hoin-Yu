import React from "react";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  return (
    <div className="projects-page">
      <h3>프로젝트</h3>
      <div className="card-grid">
        <ProjectCard title="토이프로젝트" description="백엔드 아기사자와의 첫 협업" />
        <ProjectCard title="아이디어톤" description="7명의 조원들과 진행중인 프로젝트" />
      </div>
    </div>
  );
}

export default Projects;
