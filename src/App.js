import { useState, useRef, useLayoutEffect } from "react";
import Header from "./Components/Headers";
import Footer from "./Components/Footer";
import Canvas from "./Components/Canvas";
function App() {
  const [headerOpen, setHeaderOpen] = useState(true);
  const [propsOpen, setPropsOpen] = useState(true);
  const [props, setProps] = useState({
    name: "brush",
    id: "brush",
  });
  const [size, setSize] = useState(10);
  const [color, setColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#E8E8E8");
  const [haveUndo, setHaveUndo] = useState(false)
  const [haveRedo, setHaveRedo] = useState(false)
  const handelClick = (e) => {
    switch (e.target.id) {
      case "isHeaderBtn":
        if (headerOpen) {
          setHeaderOpen(false);
        } else {
          setHeaderOpen(true);
        }
        break;
      case "isPropsBtn":
        if (propsOpen) {
          setPropsOpen(false);
        } else {
          setPropsOpen(true);
        }
        break;
      default:
        new Error("error");
    }
  };
  const canvasRef = useRef();
  const handelSave = () =>{
    canvasRef.current.saveCanvas()
  }
  const handleClearAll = () => {
    canvasRef.current.clearCanvasAll();
  };
  const handelUndo = () =>{
    canvasRef.current.undoFunc();
  }
  const handelRedo = () =>{
    canvasRef.current.redoFunc();
  }
  useLayoutEffect(() => {
    if (props.id === "eraser") {
      setColor("#E8E8E8");
    } else {
      if (color === "#E8E8E8") setColor("#000000");
    }
  }, [props.id, color]);
  return (
    <>
      <Header
        headerOpen={headerOpen}
        save={handelSave}
        clearAll={handleClearAll}
        undo={handelUndo}
        redo={handelRedo}
        haveUndo={haveUndo}
        haveRedo={haveRedo}
        handelClick={handelClick}
      />
      <Canvas
        props={props}
        setBackgroundColor={setBackgroundColor}
        backgroundColor={backgroundColor}
        color={color}
        size={size}
        setHaveUndo={setHaveUndo}
        setHaveRedo={setHaveRedo}
        ref={canvasRef}
      />
      <Footer
        propsOpen={propsOpen}
        props={props}
        setProps={setProps}
        color={color}
        setColor={setColor}
        handelClick={handelClick}
        size={size}
        setSize={setSize}
      />
    </>
  );
}
export default App;
