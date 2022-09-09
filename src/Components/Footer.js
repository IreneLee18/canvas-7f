import { useState, useRef } from "react";
function Footer({ propsOpen, props, setProps, color, setColor, handelClick, size, setSize}) {
  const [colorData, setColorData] = useState([ "#FFFFFF", "#000000", "#9BFFCD", "#00CC99", "#01936F"]);
  const propsData = [
    {
      normal: "props-icons material-icons",
      active: "props-icons material-icons active",
      name: "brush",
      id: "brush",
    },
    {
      normal: "props-icons material-icons",
      active: "props-icons material-icons active",
      name: "format_color_fill",
      id: "fill",
    },
    {
      normal: "props-icons material-icons material-icons-outlined",
      active: "props-icons material-icons material-icons-outlined active",
      name: "crop_square",
      id: "eraser",
    },
  ];
  const newColor = useRef("#000000");
  const addNweColor = (e) => {
    newColor.current = e.target.value;
    if (colorData.includes(newColor.current)) return;
    setColorData((state) => [...state, newColor.current]);
    setColor(newColor.current)
  };
  return (
    <>
      <footer>
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
                <label htmlFor="newColor">
                  COLOR:
                  <input
                    id="newColor"
                    type="color"
                    value={newColor.current}
                    onChange={addNweColor}
                  />
                </label>
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
      </footer>
    </>
  );
}
export default Footer;
