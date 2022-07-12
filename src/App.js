import React, { useEffect, useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import WAVES from "vanta/dist/vanta.waves.min";
import ModelViewer from "./ModelView";
import "./App.css";
import sheepImg from "./resources/img/sheep.png";
import sheepImg1 from "./resources/img/sheep2.png";
import sheepImg2 from "./resources/img/sheep3.png";
import sheepImg4 from "./resources/img/sheep5.png";

const App = () => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const [sheepCounter, setSheepCounter] = useState(0);
  const [sheeps, setSheeps] = useState([
    {
      id: uuid(),
      img: sheepImg,
    },
    {
      id: uuid(),
      img: sheepImg1,
    },
    {
      id: uuid(),
      img: sheepImg2,
    },
    {
      id: uuid(),
      img: sheepImg,
    },
    { id: uuid(), img: sheepImg4 },
  ]);
  const myRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        WAVES({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x8838,
          shininess: 1.0,
          waveHeight: 0.0,
          waveSpeed: 0.0,
          zoom: 1,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // const generateSheep = () => {
  //   const sheepObj = {
  //     id: uuid(),
  //     img: sheepImg,
  //   };
  //   setSheeps((sheeps) => [...sheeps, sheepObj]);
  // };

  var DragManager = new (function () {
    var dragObject = {};

    var self = this;

    function onMouseDown(e) {
      if (e.which !== 1) return;

      var elem = e.target.closest(".draggable");
      if (!elem) return;

      dragObject.elem = elem;

      // запомним, что элемент нажат на текущих координатах pageX/pageY
      dragObject.downX = e.pageX;
      dragObject.downY = e.pageY;

      return false;
    }

    function onMouseMove(e) {
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

      // инициировать начало переноса
      document.body.appendChild(avatar);
      avatar.style.zIndex = 9999;
      avatar.style.position = "absolute";
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

    this.onDragEnd = function (dragObject, dropElem) {
      setSheepCounter(sheepCounter + 1);
      //  console.log(sheepCounter + 1);
    };
    this.onDragCancel = function (dragObject) {
      dragObject.avatar.rollback();
    };
  })();

  function getCoords(elem) {
    // кроме IE8-
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + window.pageYOffset,
      left: box.left + window.pageXOffset,
    };
  }

  return (
    <div ref={myRef} className="app">
      <div className="countNumber">Count sheep 🐑: {sheepCounter}</div>
      {/* <ModelViewer scale="40" modelPath={"../resources/3dModels/tree.glb"} /> */}
      <div className="imgSheeps">
        {sheeps.map((sheep) => (
          <img
            style={{
              right: Math.random() * 250 - 10 + 10,
              bottom: Math.random() * 400 - 10 + 10,
            }}
            width="100"
            height="100"
            key={sheep.id}
            src={sheep.img}
            className="draggable"
            alt="sheep img"
          />
        ))}
      </div>
      <div className="droppable"></div>
    </div>
  );
};

export default App;
