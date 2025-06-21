import ChildA from "./ChildA";
import ChildB from "./ChildB";
import { useState, createContext } from "react";

export const MyContext = createContext(null);

function App() {
  const [color, setColor] = useState("red");

  let data = { fname: "Rajarshi", lname: "Samaddar" };
  return (
    <div>
      <MyContext.Provider value={{ color, setColor }}>
        <ChildA x={data} />
        {/* <h1>Parent {color}</h1> */}
        {/* <ChildB x={color} setx={setColor} /> */}
        <ChildB />
      </MyContext.Provider>
    </div>
  );
}

export default App;
