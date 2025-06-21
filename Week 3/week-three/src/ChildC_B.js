import React from "react";
import { useContext } from "react";
import { MyContext } from "./App";

function ChildC_B() {
  let val = useContext(MyContext);
  return (
    <div>
      <h1>{val.color}</h1>
      <button
        onClick={() => {
          val.setColor("blue");
        }}
      >
        Blue
      </button>
    </div>
  );
}

export default ChildC_B;
