import DragAndDropToDo from "./projects/DragAndDropToDo";
import { CSS } from "@dnd-kit/utilities";
import { DndContext } from "@dnd-kit/core";
import "./App.css";
import { useState } from "react";
import ToDoItem from "./projects/ToDoItem";
import CompletedTodos from "./projects/CompletedTodos";
import { Droppable } from "./projects/Droppable";

export default function App() {
  const containers = ["completed", "pending"];
  const [parent, setParent] = useState(null);
  const [isDropped, setIsDropped] = useState(false);
  const [todos, setTodos] = useState([]);
  //   const draggableMarkup = <Draggable>Drag me</Draggable>;
  //   function handleDragEnd(event) {
  //     if (event.over && event.over.id === "completed") {
  //       setIsDropped(true);
  //     }
  //   }
  function handleDragEnd(event) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? <ToDoItem id="draggable" /> : null}
      {containers.map((id) => {
        <Droppable key={id} id={id}>
          {parent === id ? `${id} todo's here` : "Drop here"}
        </Droppable>;
      })}
      {/* <CompletedTodos>
        {!isDropped ? "Drop Completed Todo's here" : <ToDoItem />}
      </CompletedTodos> */}
    </DndContext>
  );
}
