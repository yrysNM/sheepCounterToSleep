import { Draggable, Droppable } from "react-drag-and-drop";
import { Component } from "react";
import { v4 as uuid } from "uuid";

import "./App.css";
import sheepImg from "./resources/img/sheep.png";
import sheepImg1 from "./resources/img/sheep2.png";
import sheepImg2 from "./resources/img/sheep3.png";
import sheepImg4 from "./resources/img/sheep5.png";
class DragDropContainerApp extends Component {
  state = {
    sheeps: [
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
    ],

    sheepCounter: 0,
  };

  onDrop = (data) => {
    console.log(data);
    // => banana
  };

  render() {
    return (
      <div>
        {/* <ul>
          <Draggable type="fruit" data="banana">
            <li>Banana</li>
          </Draggable>
          <Draggable type="fruit" data="apple">
            <li>Apple</li>
          </Draggable>
          <Draggable type="metal" data="silver">
            <li>Silver</li>
          </Draggable>
        </ul>
        <Droppable
          types={["fruit"]} // <= allowed drop types
          onDrop={this.onDrop.bind(this)}
          style={{ backgroundColor: "red", width: 500, height: 500 }}
        >
          <ul className="Smoothie"></ul>
        </Droppable> */}

        <div className="app">
          <div className="countNumber">
            Count sheep 🐑: {this.state.sheepCounter}
          </div>

          <div className="imgSheeps">
            {this.state.sheeps.map((sheep) => (
              <Draggable key={sheep.id} type="animal" data="sheeps">
                <img
                  style={{
                    right: Math.random() * 250 - 10 + 10,
                    bottom: Math.random() * 400 - 10 + 10,
                  }}
                  width="100"
                  height="100"
                  src={sheep.img}
                  className="draggable"
                  alt="sheep img"
                />
              </Draggable>
            ))}
          </div>
          <Droppable
            types={["animal"]} // <= allowed drop types
            onDrop={this.onDrop.bind(this)}
          >
            <div className="droppable"></div>
          </Droppable>
        </div>
      </div>
    );
  }
}

export default DragDropContainerApp;
