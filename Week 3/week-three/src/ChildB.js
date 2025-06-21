import React from "react";
import ChildC_B from "./ChildC_B";

function ChildB() {
  return (
    //Lifting the state up to the parent conponents
    // <div>
    //   <h1>Child {props.x}</h1>
    //   <button onClick={() => props.setx("blue")}>Change to blue</button>
    // </div>
    <>
      <ChildC_B />
    </>
  );
}

export default ChildB;
