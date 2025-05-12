import React from "react";
import sleepImg from "../assets/sleeping.png";

function Home() {
  return (
    <div className="content">
      <img
              src={sleepImg}
              alt="Banner"
              className="banner"

        style={{
              width:'40%',
              maxWidth: '400px',
          height: 'auto',
        }}
            />
    </div>
  );
}

export default Home;
