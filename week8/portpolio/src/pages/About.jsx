import React from "react";

function About() {
  return (
    <div className="about-page" style={{ padding: "1rem" }}>
      <h2>Hoin의 포트폴리오</h2>
      <h2>설명</h2>
      <p>안녕하세요! 저는 프론트엔드 개발을 좋아하는 개발자입니다.</p>
      <p>
        주로 React, JavaScript, TypeScript를 사용하며 사용자 친화적인 UI를 만드는
        것에 열정을 가지고 있어요.
      </p>
      <p>
        이 포트폴리오는 제 프로젝트와 성장 과정을 보여드리기 위해 만들었습니다.
      </p>

      <h2>링크</h2>
      <p>GitHub</p>
      <a href="https://github.com/hoinhoin">https://github.com/hoinhoin</a>
      <p>Blog</p>
      <a href="https://velog.io/@dolceeee00/posts">https://velog.io/@dolceeee00/posts</a>
      <h3>기술 스택</h3>
      <ul>
        <li>React</li>
        <li>JavaScript / TypeScript</li>
        <li>HTML / CSS</li>
        <li>Git & GitHub</li>
      </ul>

      <h2>추가 정보</h2>
      <p>Email: follow3448@gmail.com</p>
    </div>
  );
}

export default About;
