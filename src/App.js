import React from "react";
import "./App.css";
import "./Main.css";

function App() {
  return (
    <div className="container">
      <nav className="global-nav">
        <div className="global-nav-links">
          <a href="/" className="global-nav-item">
            Who Am I?
          </a>
          <a href="/" className="global-nav-item">
            Why Me?
          </a>
          <a href="/" className="global-nav-item">
            About
          </a>
          <a href="/" className="global-nav-item">
            Contact
          </a>
        </div>
      </nav>
      <nav className="local-nav">
        <div className="local-nav-links">
          <a href="/" className="my-name">
            Mark Yoo
          </a>
          <a href="/">Github</a>
          <a href="/">Instagram</a>
          <a href="/">blog</a>
        </div>
      </nav>
      <section className="scroll-section" id="scroll-section-0">
        <h1>나는 누구?</h1>
        <div className="sticky-elem main-message">
          <p>
            개발 공부 1년차
            <br />
            프론트엔드 지망생
          </p>
        </div>
        <div className="sticky-elem main-message">
          <p>
            영어 과외도 해보고
            <br />
            사진도 찍어보고
          </p>
        </div>
        <div className="sticky-elem main-message">
          <p>
            그런 내가 개발자가 된 이유
            <br />
            내가 만든 서비스가 사람들에게 도움이 될 수 있다는 것
          </p>
        </div>
      </section>
      <section className="scroll-section" id="scroll-section-1">
        <p className="description">
          <strong>개발자로서의 나</strong>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
        </p>
      </section>
      <section className="scroll-section" id="scroll-section-2">
        <div className="sticky-elem main-message">
          <p>
            <small>팀을 위하는 개발</small>
            '나'만을 위한 개발이 아닌 '팀'을 생각한 개발
          </p>
          <div className="pin"></div>
        </div>
        <div className="sticky-elem desc-message">
          <p>
            '나'만을 위한 개발이 아닌 '팀'을 생각한 개발 <br />그 안의 부드러운
            카리스마
          </p>
          <div className="pin"></div>
        </div>
      </section>
      <section className="scroll-section" id="scroll-section-3">
        <p className="mid-message">
          <strong>If you don't have a developer like this,</strong>
          well... <br />
          you don't have a developer like this
        </p>
        <p className="canvas-caption">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
        </p>
      </section>
      <footer className="footer">2020, Mark Yoo</footer>
    </div>
  );
}

export default App;
