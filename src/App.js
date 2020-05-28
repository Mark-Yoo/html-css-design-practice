import React, { useEffect } from "react";
import "./App.css";
import "./Main.css";

const App = () => {
  useEffect(() => {
    let yOffset = 0;
    let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된(눈 앞에 보이는) scene(scroll-section)
    const sceneInfo = [
      {
        // 0
        type: "sticky",
        heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0,
        objects: {
          container: document.querySelector("#scroll-section-0"),
          messageA: document.querySelector("#scroll-section-0.main-message.a"),
          messageB: document.querySelector("#scroll-section-0.main-message.b"),
          messageC: document.querySelector("#scroll-section-0.main-message.c"),
          messageD: document.querySelector("#scroll-section-0.main-message.d"),
        },
        values: {
          messageA_opacity: [0, 1],
        },
      },
      {
        // 1
        type: "normal",
        heightNum: 5,
        scrollHeight: 0,
        objects: {
          container: document.querySelector("#scroll-section-1"),
        },
      },
      {
        // 2
        type: "sticky",
        heightNum: 5,
        scrollHeight: 0,
        objects: {
          container: document.querySelector("#scroll-section-2"),
        },
      },
      {
        // 3
        type: "sticky",
        heightNum: 5,
        scrollHeight: 0,
        objects: {
          container: document.querySelector("#scroll-section-3"),
        },
      },
    ];

    const setLayout = () => {
      sceneInfo.forEach((info) => {
        info.scrollHeight = info.heightNum * window.innerHeight;
        info.objects.container.style.height = `${info.scrollHeight}px`;
      });

      yOffset = window.pageYOffset;
      let totalScrollHeight = 0;
      for (let i = 0; i < sceneInfo.length; i++) {
        totalScrollHeight += sceneInfo[i].scrollHeight;
        if (totalScrollHeight >= yOffset) {
          currentScene = i;
          break;
        }
      }
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    };
    const calcValues = (values, currentYOffset) => {
      console.log(currentYOffset);
    };

    const playAnimation = () => {
      const values = sceneInfo[currentScene].values;
      const currentYOffset = yOffset - prevScrollHeight;

      switch (currentScene) {
        case 0:
          let messageA_opacity0 = values.messageA_opacity[0];
          let messageA_opacity1 = values.messageA_opacity[1];
          calcValues(values.messageA_opacity, currentYOffset);
          break;
        case 1:
          console.log("1 play");
          break;
        case 2:
          console.log("2 play");
          break;
        case 3:
          console.log("3 play");
          break;
      }
    };
    const scrollLoop = () => {
      prevScrollHeight = 0;
      for (let i = 0; i < currentScene; i++) {
        prevScrollHeight += sceneInfo[i].scrollHeight;
      }
      if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
        currentScene++;
        document.body.setAttribute("id", `show-scene-${currentScene}`);
      }
      if (yOffset < prevScrollHeight && currentScene !== 0) {
        currentScene--;
        document.body.setAttribute("id", `show-scene-${currentScene}`);
      }
      playAnimation();
    };

    window.addEventListener("scroll", () => {
      yOffset = window.pageYOffset;
      scrollLoop();
    });
    setLayout();
    window.addEventListener("resize", setLayout);
    window.addEventListener("load", setLayout);
  }, []);

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
        <div className="sticky-elem main-message a">
          <p>
            개발 공부 1년차
            <br />
            프론트엔드 지망생
          </p>
        </div>
        <div className="sticky-elem main-message b">
          <p>
            영어 과외도 해보고
            <br />
            사진도 찍어보고
          </p>
        </div>
        <div className="sticky-elem main-message c">
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
            '팀'을 생각하는 개발
          </p>
        </div>
        <div className="sticky-elem desc-message">
          <p>
            '나'만을 위한 개발이 아닌 '팀'을 생각하는 개발 <br />그 안의
            부드러운 카리스마
          </p>
          <div className="pin"></div>
        </div>
        <div className="sticky-elem desc-message">
          <p>커뮤니케이션의 중요성을 누구보다 높게 생각하는 개발자</p>
          <div className="pin"></div>
        </div>
      </section>
      <section className="scroll-section" id="scroll-section-3">
        <p className="mid-message">
          <strong>If you don't have a developer like this,</strong>
          <br />
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
};

export default App;
