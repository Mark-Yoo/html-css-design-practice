import React from "react";
import "./App.css";
import "./main.css";

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
          <a href="/" className="product-name">
            Mark Yoo
          </a>
          <a href="/">Github</a>
          <a href="/">Instagram</a>
          <a href="/">blog</a>
        </div>
      </nav>
    </div>
  );
}

export default App;
