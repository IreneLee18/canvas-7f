import { useOnDraw } from "../Hooks/CanvasHooks";
import { useRef, useState, useLayoutEffect, useImperativeHandle, forwardRef } from "react";

function Canvas( { props, backgroundColor, color, size, setHaveUndo, setHaveRedo }, ref ) {
  const currentSize = useRef(size);
  const currentColor = useRef(color);
  const currentDraw = useRef();
  const undoListData = useRef([]);
  const [undoList, setUndoList] = useState(null);
  const redoListData = useRef([]);
  const [redoList, setRedoList] = useState(null);
  const { setCanvasRef, startPainting, ctx, isPainting, canvasRef } = useOnDraw(onDraw);
  useLayoutEffect(() => {
    currentColor.current = color;
    currentSize.current = size;
    // console.log("un", undoList, "re", redoList);
    // console.log(undoListData.current, redoListData.current);
    if (redoListData.current.length === 0) {
      setHaveRedo(false);
    }
    if (undoListData.current.length === 0) {
      setHaveUndo(false);
    }
  }, [color, currentColor, size, undoList, redoList, setHaveRedo, setHaveUndo]);

  function onDraw(ctx, x, y) {
    ctx.lineWidth = Number(currentSize.current);
    ctx.lineCap = "round";
    ctx.strokeStyle = currentColor.current;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
  const stopPainting = () => {
    isPainting.current = false;
    ctx.current.beginPath();
    currentDraw.current = ctx.current.getImageData( 0, 0, window.outerWidth, window.outerHeight );
    undoListData.current.push(currentDraw.current);
    setHaveUndo(true);
    setUndoList(() => [...undoListData.current]);
  };
  const init = () => {
    setHaveUndo(false);
    setHaveRedo(false);
    setUndoList(null);
    setRedoList(null);
    undoListData.current = [];
    redoListData.current = [];
  };
  const fill = (color) => {
    ctx.current.fillStyle = color;
    ctx.current.rect(0, 0, window.outerWidth, window.outerHeight);
    ctx.current.fill();
  };
  useImperativeHandle(ref, () => ({
    saveCanvas: () => {
      document.getElementById("save").href = canvasRef.current.toDataURL();
    },
    clearCanvasAll: () => {
      fill("#E8E8E8");
      init();
    },
    undoFunc: () => {
      ctx.current.putImageData( undoListData.current[undoListData.current.length - 1], 0, 0);
      setHaveRedo(true);
      // 取得目前畫筆 ＝ 最後一個的畫筆
      currentDraw.current = undoListData.current.pop();
      // 下一個畫筆 ＝ 目前畫筆
      redoListData.current.unshift(currentDraw.current);
      // 刪除上一筆
      setUndoList(() => [...undoListData.current]);
      // 新增下一筆
      setRedoList(() => [...redoListData.current]);
    },
    redoFunc: () => {
      ctx.current.putImageData( redoListData.current[redoListData.current.length - 1], 0, 0);
      // 取得目前畫筆 ＝ 最後一個的畫筆
      currentDraw.current = redoListData.current.shift();
      // 下一個畫筆 ＝ 目前畫筆
      undoListData.current.push(currentDraw.current);
      // 刪除下一筆
      setRedoList(() => [...redoListData.current]);
      // 新增上一筆
      setUndoList(() => [...undoListData.current]);
    },
  }));
  const handleCanvasClick = () => {
    if (props.id !== "fill") return;
    fill(currentColor.current);
  };
  return (
    <>
      <canvas
        ref={setCanvasRef}
        width={window.outerWidth}
        height={window.outerHeight}
        style={{ background: backgroundColor }}
        onClick={handleCanvasClick}
        onMouseDown={startPainting}
        onMouseUp={stopPainting}
        // onMouseMove={painting}
      ></canvas>
    </>
  );
}
export default forwardRef(Canvas);
