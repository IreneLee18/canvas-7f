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
  const handleClearAll = () => {
    canvasRef.current.clearCanvasAll();
  };
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
        clearAll={handleClearAll}
        handelClick={handelClick}
      />
      <Canvas
        props={props}
        setBackgroundColor={setBackgroundColor}
        backgroundColor={backgroundColor}
        color={color}
        size={size}
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
