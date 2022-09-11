import { useOnDraw } from "../Hooks/CanvasHooks";
import { useRef, useState, useCallback, useLayoutEffect, useImperativeHandle, forwardRef } from "react";

function Canvas( { props, backgroundColor, color, size, setHaveUndo, setHaveRedo }, ref ) {
  const currentSize = useRef(size);
  const currentColor = useRef(color);
  const pic = useRef(new Image()); // 建立新的 Image
  const step = useRef(0);
  const canvasArray = useRef([]);
  const [canvasData, setCanvasData] = useState(null);
  const { setCanvasRef, startPainting, ctx, isPainting, canvasRef } =
    useOnDraw(onDraw);

  useLayoutEffect(() => {
    if (canvasArray.current.length === 0) {
      init();
    }
  }, []);

  useLayoutEffect(() => {
    currentColor.current = color;
    currentSize.current = size;
  }, [color, size]);

  function onDraw(ctx, x, y) {
    if (!isPainting) return;
    ctx.lineWidth = Number(currentSize.current);
    ctx.lineCap = "round";
    ctx.strokeStyle = currentColor.current;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  const stopPainting = () => {
    if (!isPainting.current) return;
    if (step.current !== canvasArray.current.length - 1) {
      canvasArray.current = canvasArray.current.splice(0, step.current + 1);
    }
    if(props.id !== 'fill'){
      step.current++;
      isPainting.current = false;
      ctx.current.beginPath();
      canvasArray.current.push(canvasRef.current.toDataURL());
      getImage();
      setHaveUndo(true);
      setHaveRedo(false);
    }
  };

  const init = () => {
    setHaveUndo(false);
    setHaveRedo(false);
    if (canvasArray.current.length > 1) {
      canvasArray.current = canvasArray.current.splice(0, 1);
      step.current = 0;
      getImage();
    } else if (canvasArray.current.length === 0) {
      canvasArray.current.push(canvasRef.current.toDataURL());
      setCanvasData(canvasArray.current[0]);
      pic.current.src = canvasData;
    }
  };

  const handleCanvasClick = () => {
    if (props.id !== "fill") return;
    step.current++
    // 先填滿顏色
    fill(currentColor.current);
    // 在將目前畫布取出來並放入canvasArray中
    canvasArray.current.push(canvasRef.current.toDataURL());
    // 把目前畫布顯示在畫面上
    getImage()
  };

  const fill = (color) => {
    ctx.current.fillStyle = color;
    ctx.current.rect(0, 0, window.outerWidth, window.outerHeight);
    ctx.current.fill();
  };

  const getImage = useCallback(() => {
    setCanvasData(() => canvasArray.current[step.current]);
    pic.current.src = canvasData; //載入影像
    pic.current.onload = function () {
      ctx.current.clearRect(0, 0, window.outerWidth, window.outerHeight);
      ctx.current.drawImage(pic.current, 0, 0);
    };
  }, [canvasData, ctx]);

  useLayoutEffect(() => {
    getImage();
    if (step.current === 0) setHaveUndo(false);
    if (step.current === canvasArray.current.length - 1) setHaveRedo(false);
  }, [getImage, setHaveRedo, setHaveUndo]);

  useImperativeHandle(ref, () => ({
    saveCanvas: () => {
      document.getElementById("save").href = canvasRef.current.toDataURL();
    },
    clearCanvasAll: () => {
      fill("#E8E8E8");
      init();
    },
    undoFunc: () => {
      if (step.current > 0) {
        step.current--;
        getImage();
        setHaveRedo(true);
      }
    },
    redoFunc: () => {
      if (step.current < canvasArray.current.length - 1) {
        step.current++;
        getImage();
        setHaveUndo(true);
      }
    },
  }));

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
      ></canvas>
    </>
  );
}
export default forwardRef(Canvas);
