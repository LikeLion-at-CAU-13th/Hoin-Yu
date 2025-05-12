import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import Posting from "./pages/Posting";

import Shorts from "./pages/Shorts";
import Subscriptions from "./pages/Subscriptions";
import MyPage from "./pages/MyPage";
import Sidebar from "./components/Sidebar";
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/posting" element={<Posting />} />
              <Route path="/shorts" element={<Shorts />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/mypage" element={<MyPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}


export default App;
