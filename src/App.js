import { useState, useRef, useEffect } from "react";
import Header from "./Components/Headers";
import Footer from "./Components/Footer";
function App() {
  const [headerOpen, setHeaderOpen] = useState(true);
  const [propsOpen, setPropsOpen] = useState(true);
  const [props, setProps] = useState({
    name: "brush",
    id: "brush",
  });
  // const [size, setSize] = useState(10);
  const [color, setColor] = useState("#FFFFFF");
  const [backgroundColor, setBackgroundColor] = useState("#E8E8E8");
  const [isPainting, setIsPainting] = useState(false);
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
  const canvasRef = useRef(null);
  const context = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    context.current = canvas.getContext("2d");
  }, []);
  const ctx = context.current;
  const handleCanvasClick = () => {
    switch (props.id) {
      case "fill":
        setBackgroundColor(color);
        break;
      default:
        new Error("error");
    }
  };
  const handlePainting = (e) => {
    if (!isPainting) return;
    ctx.lineWidth = 10;
    ctx.linCap = "round";
    ctx.beginPath();
    ctx.lintTo(e.ClientX, e.ClientY);
    ctx.stroke();
    ctx.moveTo(e.ClientX, e.ClientY);
  };
  return (
    <>
      <Header
        headerOpen={headerOpen}
        setBackgroundColor={setBackgroundColor}
        handelClick={handelClick}
      />
      <canvas
        ref={canvasRef}
        style={{ background: backgroundColor }}
        onClick={handleCanvasClick}
        onMouseDown={() => setIsPainting(true)}
        onMouseUp={() => {
          setIsPainting(false);
          ctx.beginPath();
        }}
        onMouseMove={handlePainting}
      ></canvas>
      <Footer
        propsOpen={propsOpen}
        props={props}
        setProps={setProps}
        color={color}
        setColor={setColor}
        handelClick={handelClick}
      />
      {/* <footer>
        {propsOpen ? (
          <div className="props">
            <ul>
              <li>
                <ul className="props-icons-group">
                  {propsData.map((item) => (
                    <li key={item.id}>
                      <span
                        id={item.id}
                        className={
                          item.id === props.id ? item.active : item.normal
                        }
                        onClick={() =>
                          setProps({ name: item.name, id: item.id })
                        }
                      >
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <label>
                  <span>SIZE:</span>
                  <input
                    type="number"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                  <span>px</span>
                </label>
              </li>
              <li className="color-group">
                <span>COLOR:</span>
                <ul>
                  {colorData.map((item) => (
                    <li key={item} id={item} className="color-item">
                      <div
                        style={{ background: item }}
                        onClick={() => setColor(item)}
                      >
                        {item === color ? (
                          <span
                            className={
                              color === "#000000"
                                ? "color-white material-icons-outlined"
                                : "material-icons-outlined"
                            }
                          >
                            done
                          </span>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        ) : null}

        <div className="btn">
          <button className={propsOpen ? "arrow-down-btn" : ""}>
            <span
              className={
                propsOpen
                  ? `material-icons material-icons-outlined keyboard_arrow_down`
                  : `material-icons material-icons-outlined`
              }
              id="isPropsBtn"
              onClick={handelClick}
            >
              {propsOpen ? "keyboard_arrow_down" : props.name}
            </span>
          </button>
        </div>
      </footer> */}
    </>
  );
}
export default App;
