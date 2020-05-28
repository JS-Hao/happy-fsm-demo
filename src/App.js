import React from "react";
import UglyRec from "./UglyRec_class";
// import UglyRec from "./UglyRec_hooks";
// import FSMRec from "./FSMRec";
import "./App.css";

function App() {
  console.log("渲染两次");

  return (
    <div className="App">
      <UglyRec />
      {/* <FSMRec /> */}
    </div>
  );
}

export default App;
