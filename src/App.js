import React, { useEffect } from "react";
import "./App.css";
import "./Main.css";

const App = () => {
  useEffect(() => {
    let yOffset = 0;
    let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된(눈 앞에 보이는) scene(scroll-section)
    let startNewScene = false; // 새로운 scene이 시작되면 true;

    const sceneInfo = [
      {
        // 0
        type: "sticky",
        heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0,
        objects: {
          container: document.querySelector("#scroll-section-0"),
          messageA: document.querySelector("#scroll-section-0 .main-message.a"),
          messageB: document.querySelector("#scroll-section-0 .main-message.b"),
          messageC: document.querySelector("#scroll-section-0 .main-message.c"),
          messageD: document.querySelector("#scroll-section-0 .main-message.d"),
        },
        values: {
          messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
          messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
          messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
          messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
          messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
          messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
          messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
          messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
          messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
          messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
          messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
          messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
          messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
          messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
          messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
          messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
        },
      },
      {
        // 1
        type: "normal",
        // normal은 기본 높이로 할 것
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
          messageA: document.querySelector("#scroll-section-2 .a"),
          messageB: document.querySelector("#scroll-section-2 .b"),
          messageC: document.querySelector("#scroll-section-2 .c"),
          pinB: document.querySelector("#scroll-section-2 .b .pin"),
          pinC: document.querySelector("#scroll-section-2 .c .pin"),
        },
        values: {
          messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
          messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
          messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
          messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
          messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
          messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
          messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
          messageB_translateY_in: [20, 0, { start: 0.5, end: 0.55 }],
          messageC_translateY_in: [20, 0, { start: 0.72, end: 0.77 }],
          messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
          messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
          messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
          pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
          pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
          pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
          pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
          pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
          pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        },
      },
      {
        // 3
        type: "sticky",
        heightNum: 5,
        scrollHeight: 0,
        objects: {
          container: document.querySelector("#scroll-section-3"),
          canvasCaption: document.querySelector(".canvas-caption"),
        },
      },
    ];

    const setLayout = () => {
      sceneInfo.forEach((info) => {
        if (info.type === "sticky") {
          info.scrollHeight = info.heightNum * window.innerHeight;
        } else {
          info.scrollHeight = info.objects.container.offsetHeight;
        }
        info.objects.container.style.height = `${info.scrollHeight}px`;
        console.log(info.scrollHeight);
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
      let rv;
      // 현재의 스크롤섹션에서 스크롤된 범위를 비율로 구하는 식
      const scrollHeight = sceneInfo[currentScene].scrollHeight;
      const scrollRatio = currentYOffset / scrollHeight;

      if (values.length === 3) {
        // start ~ end 사이에 애니메이션 실행
        const partScrollStart = values[2].start * scrollHeight;
        const partScrollEnd = values[2].end * scrollHeight;
        const partScrollHeight = partScrollEnd - partScrollStart;

        if (
          currentYOffset >= partScrollStart &&
          currentYOffset <= partScrollEnd
        ) {
          rv =
            ((currentYOffset - partScrollStart) / partScrollHeight) *
              (values[1] - values[0]) +
            values[0];
        } else if (currentYOffset < partScrollStart) {
          rv = values[0];
        } else if (currentYOffset > partScrollEnd) {
          rv = values[1];
        }
      } else {
        rv = scrollRatio * (values[1] - values[0]) + values[0];
      }
      return rv;
    };
    const playAnimation = () => {
      const objs = sceneInfo[currentScene].objects;
      const values = sceneInfo[currentScene].values;
      const currentYOffset = yOffset - prevScrollHeight;
      const scrollHeight = sceneInfo[currentScene].scrollHeight;
      const scrollRatio = currentYOffset / scrollHeight;

      switch (currentScene) {
        case 0:
          if (scrollRatio <= 0.22) {
            objs.messageA.style.opacity = calcValues(
              values.messageA_opacity_in,
              currentYOffset
            );
            objs.messageA.style.transform = `translateY(${calcValues(
              values.messageA_translateY_in,
              currentYOffset
            )}%)`;
          } else {
            objs.messageA.style.opacity = calcValues(
              values.messageA_opacity_out,
              currentYOffset
            );
            objs.messageA.style.transform = `translateY(${calcValues(
              values.messageA_translateY_out,
              currentYOffset
            )}%)`;
          }
          if (scrollRatio <= 0.42) {
            objs.messageB.style.opacity = calcValues(
              values.messageB_opacity_in,
              currentYOffset
            );
            objs.messageB.style.transform = `translateY(${calcValues(
              values.messageB_translateY_in,
              currentYOffset
            )}%)`;
          } else {
            objs.messageB.style.opacity = calcValues(
              values.messageB_opacity_out,
              currentYOffset
            );
            objs.messageB.style.transform = `translateY(${calcValues(
              values.messageB_translateY_out,
              currentYOffset
            )}%)`;
          }
          if (scrollRatio <= 0.62) {
            objs.messageC.style.opacity = calcValues(
              values.messageC_opacity_in,
              currentYOffset
            );
            objs.messageC.style.transform = `translateY(${calcValues(
              values.messageC_translateY_in,
              currentYOffset
            )}%)`;
          } else {
            objs.messageC.style.opacity = calcValues(
              values.messageC_opacity_out,
              currentYOffset
            );
            objs.messageC.style.transform = `translateY(${calcValues(
              values.messageC_translateY_out,
              currentYOffset
            )}%)`;
          }
          if (scrollRatio <= 0.82) {
            objs.messageD.style.opacity = calcValues(
              values.messageD_opacity_in,
              currentYOffset
            );
            objs.messageD.style.transform = `translateY(${calcValues(
              values.messageD_translateY_in,
              currentYOffset
            )}%)`;
          } else {
            objs.messageD.style.opacity = calcValues(
              values.messageD_opacity_out,
              currentYOffset
            );
            objs.messageD.style.transform = `translateY(${calcValues(
              values.messageD_translateY_out,
              currentYOffset
            )}%)`;
          }
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
        default:
          console.log("default");
          break;
      }
    };
    const scrollLoop = () => {
      startNewScene = false;
      prevScrollHeight = 0;
      for (let i = 0; i < currentScene; i++) {
        prevScrollHeight += sceneInfo[i].scrollHeight;
      }
      if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
        startNewScene = true;
        currentScene++;
        document.body.setAttribute("id", `show-scene-${currentScene}`);
      }
      if (yOffset < prevScrollHeight && currentScene !== 0) {
        startNewScene = true;
        currentScene--;
        document.body.setAttribute("id", `show-scene-${currentScene}`);
      }

      if (startNewScene) return;
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
        <div className="sticky-elem main-message d">
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
        <div className="sticky-elem main-message a">
          <p>
            <small>팀을 위하는 개발</small>
            '팀'을 생각하는 개발
          </p>
        </div>
        <div className="sticky-elem desc-message b">
          <p>
            '나'만을 위한 개발이 아닌 '팀'을 생각하는 개발 <br />그 안의
            부드러운 카리스마
          </p>
          <div className="pin"></div>
        </div>
        <div className="sticky-elem desc-message c">
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
