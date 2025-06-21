import DemoProps from "./DemoProps";

function App() {
  let studentData = {
    name: "Rajarshi Samaddar",
    roll: 1234,
    stream: "CSE",
    college: "Techno Engineering College",
  };
  let cb = () => {
    console.log(45);
  };
  return (
    <>
      <DemoProps dataProps={studentData} />
    </>
  );
}

export default App;
