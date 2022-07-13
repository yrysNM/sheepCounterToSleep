import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import arrayShuffle from "array-shuffle";

import "./App.css";
import sheepImg from "./resources/img/sheep.png";
import sheepImg1 from "./resources/img/sheep2.png";
import sheepImg2 from "./resources/img/sheep3.png";
import sheepImg4 from "./resources/img/sheep5.png";
import musicSheep from "./resources/music/sheepVoice.mp3";
import yurtImg from "./resources/img/yurt.png";
import fencesImg from "./resources/img/fences.png";

const App = () => {
  const generateSheep = () => {
    const sheepObj = {
      id: uuid(),
      img: arrayShuffle(sheepImgs)[0],
      x: Math.random() * 250 - 10 + 10,
      y: Math.random() * 400 - 10 + 10,
      in_yard: false,
    };
    return sheepObj;
  };

  const sheepImgs = [sheepImg, sheepImg1, sheepImg2, sheepImg4];
  const [sheepCounter, setSheepCounter] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [sheeps, setSheeps] = useState([
    {
      id: uuid(),
      img: arrayShuffle(sheepImgs)[0],
      x: Math.random() * 250 - 10 + 10,
      y: Math.random() * 400 - 10 + 10,
      in_yard: false,
    },
    {
      id: uuid(),
      img: arrayShuffle(sheepImgs)[0],
      x: Math.random() * 250 - 10 + 10,
      y: Math.random() * 400 - 10 + 10,
      in_yard: false,
    },
    {
      id: uuid(),
      img: arrayShuffle(sheepImgs)[0],
      x: Math.random() * 250 - 10 + 10,
      y: Math.random() * 400 - 10 + 10,
      in_yard: false,
    },
    {
      id: uuid(),
      img: arrayShuffle(sheepImgs)[0],
      x: Math.random() * 250 - 10 + 10,
      y: Math.random() * 400 - 10 + 10,
      in_yard: false,
    },
    {
      id: uuid(),
      img: arrayShuffle(sheepImgs)[0],
      x: Math.random() * 250 - 10 + 10,
      y: Math.random() * 400 - 10 + 10,
      in_yard: false,
    },
  ]);

  useEffect(() => {
    const data = localStorage.getItem("mysheep");
    console.log(JSON.parse(data));
    if (data !== null) {
      setLastScore(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mysheep", JSON.stringify({ score: sheepCounter }));
  }, [sheepCounter]);

  // Перетаскивание овечек
  var DragManager = new (function () {
    var dragObject = {};
    const audio = new Audio(musicSheep);
    audio.volume = 0.3;
    var self = this;

    function onTouchStart(e) {
      var elem = e.target.closest(".draggable");
      if (!elem) return;

      dragObject.elem = elem;
      // запомним, что элемент нажат на текущих координатах pageX/pageY
      dragObject.key = e.target.getAttribute("data-id");
      dragObject.downX = e.changedTouches[0].pageX;
      dragObject.downY = e.changedTouches[0].pageY;
      console.log(dragObject);

      return false;
    }

    function onTouchMove(e) {
      if (!dragObject.elem) return; // элемент не зажат
      console.log("ядвигаюсь");

      if (!dragObject.avatar) {
        // если перенос не начат...
        var moveX = e.changedTouches[0].pageX - dragObject.downX;
        var moveY = e.changedTouches[0].pageY - dragObject.downY;

        // если мышь передвинулась в нажатом состоянии недостаточно далеко
        if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
          return;
        }

        // начинаем перенос
        dragObject.avatar = createAvatar(e); // создать аватар
        if (!dragObject.avatar) {
          // отмена переноса, нельзя "захватить" за эту часть элемента
          dragObject = {};
          return;
        }

        // аватар создан успешно
        // создать вспомогательные свойства shiftX/shiftY
        var coords = getCoords(dragObject.avatar);
        dragObject.shiftX = dragObject.downX - coords.left;
        dragObject.shiftY = dragObject.downY - coords.top;

        startDrag(e); // отобразить начало переноса
      }

      // отобразить перенос объекта при каждом движении мыши
      dragObject.avatar.style.left =
        e.changedTouches[0].pageX - dragObject.shiftX + "px";
      dragObject.avatar.style.top =
        e.changedTouches[0].pageY - dragObject.shiftY + "px";

      return false;
    }

    function onTouchUp(e) {
      if (dragObject.avatar) {
        // если перенос идет
        finishDragMobile(e);
      }
      // перенос либо не начинался, либо завершился
      // в любом случае очистим "состояние переноса" dragObject
      dragObject = {};
    }

    function onMouseDown(e) {
      if (e.which !== 1) return;

      var elem = e.target.closest(".draggable");
      if (!elem) return;

      dragObject.elem = elem;
      // запомним, что элемент нажат на текущих координатах pageX/pageY
      dragObject.key = e.target.getAttribute("data-id");
      dragObject.downX = e.pageX;
      dragObject.downY = e.pageY;
      console.log(dragObject);

      return false;
    }

    function onMouseMove(e) {
      console.log("Я двигаюсь");
      if (!dragObject.elem) return; // элемент не зажат

      if (!dragObject.avatar) {
        // если перенос не начат...
        var moveX = e.pageX - dragObject.downX;
        var moveY = e.pageY - dragObject.downY;

        // если мышь передвинулась в нажатом состоянии недостаточно далеко
        if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
          return;
        }

        // начинаем перенос
        dragObject.avatar = createAvatar(e); // создать аватар
        if (!dragObject.avatar) {
          // отмена переноса, нельзя "захватить" за эту часть элемента
          dragObject = {};
          return;
        }

        // аватар создан успешно
        // создать вспомогательные свойства shiftX/shiftY
        var coords = getCoords(dragObject.avatar);
        dragObject.shiftX = dragObject.downX - coords.left;
        dragObject.shiftY = dragObject.downY - coords.top;

        startDrag(e); // отобразить начало переноса
      }

      // отобразить перенос объекта при каждом движении мыши
      dragObject.avatar.style.left = e.pageX - dragObject.shiftX + "px";
      dragObject.avatar.style.top = e.pageY - dragObject.shiftY + "px";

      return false;
    }

    function onMouseUp(e) {
      console.log("Its mouse up");
      if (dragObject.avatar) {
        // если перенос идет
        finishDrag(e);
      }

      // перенос либо не начинался, либо завершился
      // в любом случае очистим "состояние переноса" dragObject
      dragObject = {};
    }

    function finishDrag(e) {
      var dropElem = findDroppable(e);

      if (!dropElem) {
        self.onDragCancel(dragObject);
      } else {
        self.onDragEnd(dragObject, dropElem);
      }
    }

    function finishDragMobile(e) {
      var dropElem = findDroppableMobile(e);

      if (!dropElem) {
        self.onDragCancel(dragObject);
      } else {
        self.onDragEnd(dragObject, dropElem);
      }
      console.log(document.body);
    }

    function createAvatar(e) {
      // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
      var avatar = dragObject.elem;
      var old = {
        parent: avatar.parentNode,
        nextSibling: avatar.nextSibling,
        position: avatar.position || "",
        left: avatar.left || "",
        top: avatar.top || "",
        zIndex: avatar.zIndex || "",
      };

      // функция для отмены переноса
      avatar.rollback = function () {
        old.parent.insertBefore(avatar, old.nextSibling);
        avatar.style.position = old.position;
        avatar.style.left = old.left;
        avatar.style.top = old.top;
        avatar.style.zIndex = old.zIndex;
      };

      return avatar;
    }

    function startDrag(e) {
      var avatar = dragObject.avatar;
      console.log("avatar ", avatar);
      // инициировать начало переноса
      document.body.appendChild(avatar);
      avatar.style.zIndex = 9999;
      avatar.style.position = "absolute";
    }

    function findDroppableMobile(event) {
      // спрячем переносимый элемент
      dragObject.avatar.hidden = true;

      // получить самый вложенный элемент под курсором мыши
      var elem = document.elementFromPoint(
        event.changedTouches[0].clientX,
        event.changedTouches[0].clientY
      );
      // показать переносимый элемент обратно
      dragObject.avatar.hidden = false;

      if (elem == null) {
        // такое возможно, если курсор мыши "вылетел" за границу окна
        return null;
      }

      return elem.closest(".droppable");
    }
    function findDroppable(event) {
      // спрячем переносимый элемент
      dragObject.avatar.hidden = true;

      // получить самый вложенный элемент под курсором мыши
      var elem = document.elementFromPoint(event.clientX, event.clientY);

      // показать переносимый элемент обратно
      dragObject.avatar.hidden = false;

      if (elem == null) {
        // такое возможно, если курсор мыши "вылетел" за границу окна
        return null;
      }

      return elem.closest(".droppable");
    }

    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;
    document.onmousedown = onMouseDown;
    document.ontouchstart = onTouchStart;
    document.ontouchmove = onTouchMove;
    document.ontouchend = onTouchUp;
    // document.addEventListener("touchstart", onTouchStart, {passive:false});
    // document.addEventListener("touchmove", onTouchMove, {passive:true});
    // document.addEventListener("touchend", onTouchUp, {passive:false});

    this.onDragEnd = function (dragObject, dropElem) {
      audio.play();
      var is_generate = false;
      const tempSheeps = sheeps.map((sheep) => {
        if (sheep.id === dragObject.key) {
          if (!sheep.in_yard) {
            is_generate = true;
            // generateSheep()
          }
          return { ...sheep, in_yard: true };
        }
        return { ...sheep };
      });
      console.log(tempSheeps);
      if (is_generate) {
        setSheepCounter((prev) => prev + 1);
        setSheeps([...tempSheeps, generateSheep()]);
      }
    };
    this.onDragCancel = function (dragObject) {
      dragObject.avatar.rollback();
    };
  })();
  // Получить координаты перетаскиваемого элемента
  function getCoords(elem) {
    // кроме IE8-
    var box = elem.getBoundingClientRect();
    console.log(box);
    return {
      top: box.top + window.pageYOffset,
      left: box.left + window.pageXOffset,
    };
  }

  return (
    <>
      <div className="app">
        <div className="bgContainer">
          <div>Last time you slept with {lastScore.score} sheeps</div>
          <div className="countNumber"> 🐑 {sheepCounter}</div>

          <div className="imgSheeps">
            {sheeps.map((sheep) => (
              <img
                style={{
                  right: sheep.x,
                  bottom: sheep.y,
                }}
                width="100"
                height="100"
                key={sheep.id}
                data-id={sheep.id}
                src={sheep.img}
                className="draggable"
                alt="sheep img"
              />
            ))}
          </div>
          <div className="arrowFlex">
            <img
              src="https://www.adelmantravel.com/wp-content/uploads/2021/08/arrow-gif.gif"
              alt="arrow"
            />
          </div>

          <div className="yurt">
            <img src={yurtImg} alt="yurt img" />
          </div>
          <div className="droppable">
            <img src={fencesImg} alt="fence" />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
