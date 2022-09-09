function Header({ headerOpen, clearAll, handelClick }) {
  return (
    <>
      <header>
        <ul className={headerOpen ? "" : "closeHeader"}>
          <li>
            <span className="material material-symbols-outlined">save</span>
            <span>SAVE</span>
          </li>
          <li onClick={clearAll}>
            <span className="material material-symbols-outlined">
              crop_free
            </span>
            <span>CLEAR ALL</span>
          </li>
          <li data-function="undo">
            <span className="material material-icons material-icons-outlined">
              undo
            </span>
            <span>UNDO</span>
          </li>
          <li data-function="redo">
            <span
              className="material material-icons material-icons-outlined"
              data-function="redo"
            >
              redo
            </span>
            <span>REDO</span>
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
