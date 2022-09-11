function Header({
  headerOpen,
  save,
  clearAll,
  undo,
  redo,
  handelClick,
  haveUndo,
  haveRedo,
}) {
  return (
    <>
      <header>
        <ul className={headerOpen ? "" : "closeHeader"}>
          <li onClick={save}>
            <a href="#" download="我的canvas" data-function="save" id="save">
              <span className="material material-symbols-outlined">save</span>
              <span>SAVE</span>
            </a>
          </li>
          <li onClick={clearAll}>
            <a href="#">
              <span className="material material-symbols-outlined">
                crop_free
              </span>
              <span>CLEAR ALL</span>
            </a>
          </li>
          <li
            data-function="undo"
            onClick={undo}
            className={haveUndo ? "" : `cursor-not-allowed disabled`}
          >
            <a
              href="#"
              disabled={!haveUndo}
              className={haveUndo ? "" : `cursor-not-allowed disabled`}
            >
              <span
                className={
                  haveUndo
                    ? `material-icons material material-icons-outlined`
                    : `cursor-not-allowed material material-icons-outlined`
                }
              >
                undo
              </span>
              <span>UNDO</span>
            </a>
          </li>
          <li
            data-function="redo"
            onClick={redo}
            className={haveRedo ? "" : `cursor-not-allowed disabled`}
          >
            <a
              href="#"
              disabled={!haveRedo}
              className={haveRedo ? "" : `cursor-not-allowed disabled`}
            >
              <span
                className={
                  haveRedo
                    ? `material-icons material material-icons-outlined`
                    : `cursor-not-allowed material material-icons-outlined`
                }
                data-function="redo"
              >
                redo
              </span>
              <span>REDO</span>
            </a>
          </li>
        </ul>
        <button className={headerOpen ? "" : "closeHeaderBtn"}>
          <span
            className="material-icons material-icons-outlined"
            id="isHeaderBtn"
            onClick={handelClick}
          >
            {headerOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          </span>
        </button>
      </header>
    </>
  );
}
export default Header;
