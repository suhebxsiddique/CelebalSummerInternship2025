import React from "react";

function DemoProps(props) {
  return (
    <div>
      <h1>{props.dataProps.name}</h1>
      <h1>{props.dataProps.college}</h1>
      <h1>{props.dataProps.stream}</h1>
      <h1>{props.dataProps.roll}</h1>
    </div>
  );
}

export default DemoProps;
